import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_CREATED_REMITTANCE_ADVICE,
  SUCCESSFULLY_DELETED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
} from '../../../common/types/MessageTypes';
import {
  getContactComboboxContext,
  getDefaultAccountId,
  getIsActionsDisabled,
  getIsPageEdited,
  getIsReferenceIdDirty,
  getModalType,
  getRedirectUrl,
  getReferenceId,
  getShouldSendRemittanceAdvice,
} from './BillPaymentDetailSelectors';
import BillPaymentView from './components/BillPaymentDetailView';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import billPaymentModalTypes from './billPaymentModalTypes';
import billPaymentReducer from './billPaymentDetailReducer';
import createBillPaymentDetailDispatcher from './createBillPaymentDetailDispatcher';
import createBillPaymentDetailIntegrator from './createBillPaymentDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../common/blobOpener/openBlob';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BillPaymentModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    replaceURLParams,
    navigateTo,
    featureToggles,
  }) {
    this.store = new Store(billPaymentReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createBillPaymentDetailDispatcher(this.store);
    this.integrator = createBillPaymentDetailIntegrator(
      this.store,
      integration
    );
    this.navigateTo = navigateTo;
    this.contactComboboxModule = new ContactComboboxModule({ integration });
    this.isElectronicPaymentEnabled =
      featureToggles?.isElectronicPaymentEnabled;
    this.isRemittanceAdviceEnabled =
      featureToggles?.isPayBillRemittanceAdviceEnabled;
  }

  loadBillPayment = (onSuccessFn) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBillPayment(response);
      if (onSuccessFn) onSuccessFn(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBillPayment({ onSuccess, onFailure });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  loadSupplierDetails = () => {
    this.dispatcher.setIsSupplierLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsSupplierLoading(false);
      this.dispatcher.loadSupplierDetails(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsSupplierLoading(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.loadSupplierDetails({ onSuccess, onFailure });
  };

  loadBillList = () => {
    this.dispatcher.setIsTableLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.loadBillList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.loadBillList({ onSuccess, onFailure });
  };

  updateHeaderOption = ({ key, value }) => {
    const state = this.store.getState();

    this.dispatcher.updateHeaderOption({ key, value });

    if (key === 'supplierId' && value.length > 0) {
      this.loadSupplierDetails();
    }
    if (key === 'showPaidBills' && state.supplierId.length > 0) {
      this.loadBillList();
    }
    if (key === 'accountId') this.updateReferenceId();
  };

  updateIsElectronicPayment = ({ value }) => {
    const state = this.store.getState();

    const accountId = value
      ? state.electronicClearingAccountId
      : getDefaultAccountId(state);

    this.updateHeaderOption({ key: 'accountId', value: accountId });
  };

  updateBankStatementText = ({ value }) => {
    this.dispatcher.updateBankStatementText(value);
  };

  changeBankStatementText = ({ value }) => {
    this.dispatcher.changeBankStatementText(value);
  };

  updateReferenceId = () => {
    const state = this.store.getState();

    if (getIsReferenceIdDirty(state)) {
      return;
    }

    const onSuccess = ({ referenceId }) => {
      // No blocking behavior, so much perform an additional check
      // just in case a user has dirtied the reference
      if (!getIsReferenceIdDirty(state)) {
        this.dispatcher.updateReferenceId(referenceId);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.updateReferenceId({ onSuccess, onFailure });
  };

  reloadSavedBillPayment = ({ id, message }) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.updateBillPaymentId(id);
    this.replaceURLParams({ billPaymentId: id });

    this.loadBillPayment(() => {
      this.dispatcher.openModal(billPaymentModalTypes.remittanceAdvice);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
    });
  };

  dismissAlert = () =>
    this.dispatcher.setAlertMessage({ message: '', type: '' });

  saveBillPayment = () => {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      const state = this.store.getState();
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_PAYMENT,
        content: response.message,
      });

      const url = getRedirectUrl({ ...state, applyPaymentToBillId: '' });
      if (getShouldSendRemittanceAdvice(state)) {
        this.dispatcher.setRedirectUrl(url);
        const id = response.id || state.billPaymentId;
        this.reloadSavedBillPayment({ ...response, id });
        return;
      }

      this.navigateTo(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.saveBillPayment({ onSuccess, onFailure });
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.openModal(billPaymentModalTypes.cancel);
    } else {
      this.cancelBillPayment();
    }
  };

  openRemittanceAdviceModal = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;
    if (getIsPageEdited(state)) {
      this.dispatcher.updateShouldSendRemittanceAdvice({ value: true });
      this.saveBillPayment();
    } else {
      this.dispatcher.openModal(billPaymentModalTypes.remittanceAdvice);
    }
  };

  closeRemittanceAdviceModal = () => {
    this.dismissAlert();
    this.dispatcher.updateShouldSendRemittanceAdvice({ value: false });
    this.dispatcher.closeModal();
  };

  sendRemittanceAdviceEmail = () => {
    this.dispatcher.setSubmittingState(true);
    this.closeRemittanceAdviceModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_REMITTANCE_ADVICE,
        content: response.message,
      });
      this.dispatcher.setAlertMessage({
        message: response.message,
        type: 'success',
      });
      const state = this.store.getState();
      const url = getRedirectUrl(state);
      this.navigateTo(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.sendRemittanceAdviceEmail({ onSuccess, onFailure });
  };

  downloadRemittanceAdvicePdf = () => {
    const state = this.store.getState();

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.closeRemittanceAdviceModal();

    const onSuccess = (data) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_REMITTANCE_ADVICE,
      });

      this.dispatcher.setAlertMessage({
        message: 'Remittance advice has been downloaded',
        type: 'success',
      });

      const referenceId = getReferenceId(state);

      openBlob({
        blob: data,
        filename: `RemittanceAdvice-${referenceId}.pdf`,
        shouldDownload: true,
      });

      const url = getRedirectUrl(state);
      this.navigateTo(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.exportRemittanceAdvicePdf({ onSuccess, onFailure });
  };

  openDeleteModal = () => {
    this.dispatcher.openModal(billPaymentModalTypes.delete);
  };

  deleteBillPayment = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL_PAYMENT,
        content: response.message,
      });
      const state = this.store.getState();
      const url = getRedirectUrl(state);
      this.navigateTo(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.deleteBillPayment({ onSuccess, onFailure });
  };

  cancelBillPayment = () => {
    const state = this.store.getState();
    const url = getRedirectUrl(state);
    this.navigateTo(url);
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  render = () => {
    const billPaymentView = (
      <BillPaymentView
        renderContactCombobox={this.renderContactCombobox}
        onChangeReferenceId={this.dispatcher.changeReferenceId}
        onUpdateHeaderOption={this.updateHeaderOption}
        onUpdateIsElectronicPayment={this.updateIsElectronicPayment}
        onChangeBankStatementText={this.changeBankStatementText}
        onUpdateBankStatementText={this.updateBankStatementText}
        onUpdateTableInputField={this.dispatcher.updateTableInputField}
        onSaveButtonClick={this.saveBillPayment}
        onSendRemittanceAdviceEmail={this.sendRemittanceAdviceEmail}
        onDownloadRemittanceAdvicePdf={this.downloadRemittanceAdvicePdf}
        onRemittanceAdviceClick={this.openRemittanceAdviceModal}
        onRemittanceAdviceDetailsChange={
          this.dispatcher.updateRemittanceAdviceDetails
        }
        onCloseRemittanceAdviceModal={this.closeRemittanceAdviceModal}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.dispatcher.closeModal}
        onCancelModal={this.cancelBillPayment}
        onDeleteModal={this.deleteBillPayment}
        onDismissAlert={this.dismissAlert}
        onConfirmSaveAndRedirect={this.saveAndRedirect}
        onDiscardAndRedirect={this.discardAndRedirect}
        onCloseUnsaveModal={this.closeUnsaveModal}
        onShouldSendRemittanceAdviceChange={
          this.dispatcher.updateShouldSendRemittanceAdvice
        }
        onUpdateRemittanceAdviceType={
          this.dispatcher.updateRemittanceAdviceType
        }
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{billPaymentView}</Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.saveBillPayment();
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = (context) => {
    this.dispatcher.setInitialState({
      ...context,
      isElectronicPaymentEnabled: this.isElectronicPaymentEnabled,
      isRemittanceAdviceEnabled: this.isRemittanceAdviceEnabled,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadBillPayment((response) => {
      if (!response.supplierId) this.loadContactCombobox();
    });
  };

  resetState() {
    this.contactComboboxModule.resetState();
    this.dispatcher.resetState();
  }

  discardAndRedirect = () => {
    this.dispatcher.closeModal();
    const state = this.store.getState();
    const url = getRedirectUrl(state);
    this.navigateTo(url);
  };

  saveAndRedirect = () => {
    this.dispatcher.closeModal();
    this.saveBillPayment();
  };

  closeUnsaveModal = () => {
    this.dispatcher.setRedirectUrl('');
    this.dispatcher.closeModal();
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.setRedirectUrl(url);
      this.dispatcher.openModal(billPaymentModalTypes.unsaved);
    } else {
      this.navigateTo(url);
    }
  };
}
