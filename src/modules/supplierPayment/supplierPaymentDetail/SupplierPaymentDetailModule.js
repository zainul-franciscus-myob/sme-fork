import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_SAVED_SUPPLIER_PAYMENT } from '../../../common/types/MessageTypes';
import {
  getContactComboboxContext,
  getDefaultAccountId,
  getIsActionsDisabled,
  getIsPageEdited,
  getIsReferenceIdDirty,
  getModalType,
  getRedirectUrl,
  getShouldSendRemittanceAdvice,
} from './SupplierPaymentDetailSelectors';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import SupplierPaymentView from './components/SupplierPaymentDetailView';
import createSupplierPaymentDetailDispatcher from './createSupplierPaymentDetailDispatcher';
import createSupplierPaymentDetailIntegrator from './createSupplierPaymentDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import supplierPaymentModalTypes from './supplierPaymentModalTypes';
import supplierPaymentReducer from './supplierPaymentDetailReducer';

const messageTypes = [SUCCESSFULLY_SAVED_SUPPLIER_PAYMENT];

export default class SupplierPaymentModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    replaceURLParams,
    navigateTo,
    featureToggles,
    popMessages,
  }) {
    this.store = new Store(supplierPaymentReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createSupplierPaymentDetailDispatcher(this.store);
    this.integrator = createSupplierPaymentDetailIntegrator(
      this.store,
      integration
    );
    this.navigateTo = navigateTo;
    this.contactComboboxModule = new ContactComboboxModule({ integration });
    this.isRemittanceAdviceEnabled =
      featureToggles?.isPayBillRemittanceAdviceEnabled;
  }

  loadSupplierPayment = (onSuccessFn) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSupplierPayment(response);
      if (onSuccessFn) onSuccessFn(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSupplierPayment({ onSuccess, onFailure });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  loadSupplierPurchaseList = () => {
    this.dispatcher.setIsSupplierLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsSupplierLoading(false);
      this.dispatcher.loadSupplierPurchaseList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsSupplierLoading(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.loadSupplierPurchaseList({ onSuccess, onFailure });
  };

  loadPurchaseList = () => {
    this.dispatcher.setIsTableLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.loadPurchaseList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.loadPurchaseList({ onSuccess, onFailure });
  };

  updateHeaderOption = ({ key, value }) => {
    const state = this.store.getState();

    this.dispatcher.updateHeaderOption({ key, value });

    if (key === 'supplierId' && value.length > 0) {
      this.loadSupplierPurchaseList();
    }
    if (key === 'showPaidBills' && state.supplierId.length > 0) {
      this.loadPurchaseList();
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

  // Not use for now, wait until send remittance advice API is done
  reloadSavedSupplierPayment = ({ id, message }) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.updateSupplierPaymentId(id);
    this.replaceURLParams({ supplierPaymentId: id });

    this.loadSupplierPayment(() => {
      this.dispatcher.openModal(supplierPaymentModalTypes.remittanceAdvice);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
    });
  };

  dismissAlert = () =>
    this.dispatcher.setAlertMessage({ message: '', type: '' });

  saveSupplierPayment = () => {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      const state = this.store.getState();
      this.dispatcher.setSubmittingState(false);

      // Change applyPaymentToBillId to applyPaymentToPurchaseId
      const url = getRedirectUrl({ ...state, applyPaymentToPurchaseId: '' });
      if (getShouldSendRemittanceAdvice(state)) {
        this.dispatcher.setRedirectUrl(url);
        const id = response.id || state.supplierPaymentId;
        this.reloadSavedSupplierPayment({ ...response, id });
        return;
      }

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SUPPLIER_PAYMENT,
        content: response.message,
      });

      this.navigateTo(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({ message, type: 'danger' });
    };

    this.integrator.saveSupplierPayment({ onSuccess, onFailure });
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.openModal(supplierPaymentModalTypes.cancel);
    } else {
      this.cancelSupplierPayment();
    }
  };

  openRemittanceAdviceModal = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;
    if (getIsPageEdited(state)) {
      this.dispatcher.updateShouldSendRemittanceAdvice({ value: true });
      this.saveSupplierPayment();
    } else {
      this.dispatcher.openModal(supplierPaymentModalTypes.remittanceAdvice);
    }
  };

  closeRemittanceAdviceModal = () => {
    this.dismissAlert();
    this.dispatcher.updateShouldSendRemittanceAdvice({ value: false });
    this.dispatcher.closeModal();
  };

  cancelSupplierPayment = () => {
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

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlertMessage({ message, type: 'success' });
    }
  };

  render = () => {
    const supplierPaymentView = (
      <SupplierPaymentView
        renderContactCombobox={this.renderContactCombobox}
        onChangeReferenceId={this.dispatcher.changeReferenceId}
        onUpdateHeaderOption={this.updateHeaderOption}
        onUpdateIsElectronicPayment={this.updateIsElectronicPayment}
        onChangeBankStatementText={this.changeBankStatementText}
        onUpdateBankStatementText={this.updateBankStatementText}
        onUpdateTableInputField={this.dispatcher.updateTableInputField}
        onSaveButtonClick={this.saveSupplierPayment}
        onRemittanceAdviceClick={this.openRemittanceAdviceModal}
        onCloseRemittanceAdviceModal={this.closeRemittanceAdviceModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.dispatcher.closeModal}
        onCancelModal={this.cancelSupplierPayment}
        onDismissAlert={this.dismissAlert}
        onConfirmSaveAndRedirect={this.saveAndRedirect}
        onDiscardAndRedirect={this.discardAndRedirect}
        onCloseUnsaveModal={this.closeUnsaveModal}
        onShouldSendRemittanceAdviceChange={
          this.dispatcher.updateShouldSendRemittanceAdvice
        }
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{supplierPaymentView}</Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.saveSupplierPayment();
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = (context) => {
    this.dispatcher.setInitialState({
      ...context,
      isRemittanceAdviceEnabled: this.isRemittanceAdviceEnabled,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.loadSupplierPayment((response) => {
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
    this.saveSupplierPayment();
  };

  closeUnsaveModal = () => {
    this.dispatcher.setRedirectUrl('');
    this.dispatcher.closeModal();
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.setRedirectUrl(url);
      this.dispatcher.openModal(supplierPaymentModalTypes.unsaved);
    } else {
      this.navigateTo(url);
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal(supplierPaymentModalTypes.delete);
  };
}