import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_CREATED_REMITTANCE_ADVICE,
  SUCCESSFULLY_DELETED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
} from '../../../common/types/MessageTypes';
import {
  getApplyPaymentToBillId,
  getBusinessId,
  getContactComboboxContext,
  getDefaultAccountId,
  getIsActionsDisabled,
  getIsCreating,
  getIsPageEdited,
  getIsReferenceIdDirty,
  getModalType,
  getRedirectUrl,
  getRegion,
  getShouldLoadBillList,
  getShouldSendRemittanceAdvice,
  getShouldShowRemittanceAdviceModal,
  getSupplierId,
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
import remittanceAdviceTypes from './remittanceAdviceMethodTypes';
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

  loadBillPayment = () => {
    const state = this.store.getState();

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      if (getSupplierId(state)) {
        this.loadSupplierPaymentInfo();
      }
      this.dispatcher.loadBillPayment(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBillPayment({ onSuccess, onFailure });

    if (getSupplierId(state)) {
      this.loadBillList();
    }

    this.loadContactCombobox();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  loadBillList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.loadBillList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.loadBillList({ onSuccess, onFailure });
  };

  loadSupplierPaymentInfo = () => {
    this.dispatcher.setSupplierLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSupplierLoadingState(false);
      this.dispatcher.loadSupplierPaymentInfo(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSupplierLoadingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.loadSupplierPaymentInfo({ onSuccess, onFailure });
  };

  updateHeaderOption = ({ key, value }) => {
    const state = this.store.getState();

    this.dispatcher.updateHeaderOption({ key, value });

    if (getShouldLoadBillList(key, value, state)) {
      this.loadBillList();
    }

    if (key === 'supplierId' && value) this.loadSupplierPaymentInfo();
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
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.updateReferenceId({ onSuccess, onFailure });
  };

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    this.navigateTo(`/#/${region}/${businessId}/transactionList`);
  };

  redirectToBillList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    this.navigateTo(`/#/${region}/${businessId}/bill`);
  };

  redirectToBillDetail = (billId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    this.navigateTo(`/#/${region}/${businessId}/bill/${billId}`);
  };

  reloadSavedBillPayment = ({ id, message }) => {
    this.dispatcher.updateBillPaymentId(id);
    this.replaceURLParams({ billPaymentId: id });
    this.loadBillPayment();
    if (getShouldShowRemittanceAdviceModal(this.store.getState())) {
      this.dispatcher.openModal(billPaymentModalTypes.remittanceAdvice);
      this.dispatcher.setAlertMessage(message);
    }
  };

  dismissAlert = () => this.dispatcher.setAlertMessage('');

  saveBillPayment = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_PAYMENT,
        content: response.message,
      });

      if (getShouldSendRemittanceAdvice(state)) {
        this.reloadSavedBillPayment(response);
        return;
      }
      const url = getRedirectUrl(state);
      if (url) {
        this.navigateTo(url);
      } else {
        const isCreating = getIsCreating(state);
        if (isCreating) {
          this.redirectToBillList();
        } else {
          this.redirectToTransactionList();
        }
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(message);
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
    this.dispatcher.openModal(billPaymentModalTypes.remittanceAdvice);
  };

  closeRemittanceAdviceModal = () => {
    this.dismissAlert();
    this.dispatcher.closeModal();
  };

  confirmRemittanceAdviceModal = () => {
    const state = this.store.getState();

    this.dispatcher.setSubmittingState(true);
    this.closeRemittanceAdviceModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_REMITTANCE_ADVICE,
        content: response.message,
      });
      this.dispatcher.setAlertMessage(response.message);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    if (state.remittanceAdviceType === remittanceAdviceTypes.email) {
      this.integrator.sendRemittanceAdviceEmail({ onSuccess, onFailure });
    } else if (state.remittanceAdviceType === remittanceAdviceTypes.export) {
      this.integrator.exportRemittanceAdvicePdf({ onSuccess, onFailure });
    }
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
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.deleteBillPayment({ onSuccess, onFailure });
  };

  cancelBillPayment = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    if (isCreating) {
      const billId = getApplyPaymentToBillId(state);
      this.redirectToBillDetail(billId);
    } else {
      this.redirectToTransactionList();
    }
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
        onConfirmEmailRemittanceAdviceModal={this.confirmRemittanceAdviceModal}
        onRemittanceAdviceClick={this.openRemittanceAdviceModal}
        onRemittanceAdviceEmailDetailsChange={
          this.dispatcher.updateEmailRemittanceAdviceDetails
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
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadBillPayment();
  };

  resetState() {
    this.contactComboboxModule.resetState();
    this.dispatcher.resetState();
  }

  discardAndRedirect = () => {
    this.dispatcher.closeModal();
    const url = getRedirectUrl(this.store.getState());
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
