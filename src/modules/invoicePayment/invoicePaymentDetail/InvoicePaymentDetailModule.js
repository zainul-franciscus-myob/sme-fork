import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_INVOICE_PAYMENT,
  DELETE_INVOICE_PAYMENT,
  FORMAT_AMOUNT_INPUT,
  LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL,
  LOAD_NEW_INVOICE_PAYMENT_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_CUSTOMER,
  UPDATE_INVOICE_PAYMENT,
  UPDATE_INVOICE_PAYMENT_DETAILS,
  UPDATE_INVOICE_PAYMENT_ENTRIES,
  UPDATE_SHOW_PAID_INVOICES,
} from '../InvoicePaymentIntent';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_INVOICE_PAYMENT, SUCCESSFULLY_SAVED_INVOICE_PAYMENT } from '../InvoicePaymentMessageTypes';
import {
  getBusinessId,
  getCustomerId,
  getInvoicePaymentId,
  getIsActionsDisabled,
  getIsCreating,
  getIsPageEdited,
  getModalUrl,
  getOpenedModalType,
  getRegion,
  getSaveContent,
  getShowPaidInvoices,
} from './invoicePaymentDetailSelectors';
import InvoicePaymentDetailView from './components/InvoicePaymentDetailView';
import InvoicePaymentModalTypes from '../InvoicePaymentModalTypes';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import invoicePaymentDetailReducer from './invoicePaymentDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoicePaymentDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(invoicePaymentDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  render = () => {
    const invoicePaymentView = (
      <InvoicePaymentDetailView
        onUpdateInvoicePaymentDetails={this.updateInvoicePaymentDetails}
        onUpdateInvoicePaymentEntries={this.updateInvoicePaymentEntries}
        onUpdateShowPaidInvoices={this.updateShowPaidInvoices}
        onUpdateCustomer={this.updateCustomer}
        onSaveButtonClick={this.saveInvoicePayment}
        onDismissAlert={this.dismissAlert}
        onCloseModal={this.closeModal}
        onDeleteButtonClick={this.openDeleteModal}
        onConfirmDelete={this.deleteInvoicePayment}
        onCancelButtonClick={this.openCancelModal}
        onConfirmCancel={this.redirectToTransactionList}
        onConfirmSaveButtonClick={this.saveUnsavedChanges}
        onConfirmUnsaveButtonClick={this.redirectToModalUrl}
        onAmountInputBlur={this.formatAmountInput}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {invoicePaymentView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  formatAmountInput = ({ name, value, index }) => {
    this.store.dispatch({
      intent: FORMAT_AMOUNT_INPUT,
      name,
      value,
      index,
    });
  };

  loadInvoicePayment = () => {
    const state = this.store.getState();
    const intent = getIsCreating(state)
      ? LOAD_NEW_INVOICE_PAYMENT_DETAIL : LOAD_INVOICE_PAYMENT_DETAIL;

    const urlParams = {
      businessId: getBusinessId(state),
      invoicePaymentId: getInvoicePaymentId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        ...response,
      });

      this.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });

    const customerId = getCustomerId(state);
    if (customerId !== '') {
      this.updateCustomer(customerId);
    }
  };

  updateInvoicePaymentDetails = ({ key, value }) => {
    const intent = UPDATE_INVOICE_PAYMENT_DETAILS;

    this.store.dispatch({
      intent,
      key,
      value,
    });
  };

  updateShowPaidInvoices = (value) => {
    const intent = UPDATE_SHOW_PAID_INVOICES;
    const customerId = getCustomerId(this.store.getState());

    this.store.dispatch({
      intent,
      value,
    });

    if (customerId) {
      this.loadInvoiceList();
    }
  };

  updateCustomer = (value) => {
    const intent = UPDATE_CUSTOMER;

    this.store.dispatch({
      intent,
      value,
    });
    this.loadInvoiceList();
  };

  updateInvoicePaymentEntries = ({ name, value, index }) => {
    const intent = UPDATE_INVOICE_PAYMENT_ENTRIES;

    this.store.dispatch({
      intent,
      name,
      value,
      index,
    });
  };

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  };

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  redirectToUrl = (url) => {
    window.location.href = url;
  };

  redirectToTransactionList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    this.redirectToUrl(`/#/${region}/${businessId}/transactionList`);
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.closeModal();

    this.redirectToUrl(url);
  };

  saveUnsavedChanges = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.closeModal();

    const onSuccess = () => {
      this.redirectToUrl(url);
    };

    this.createOrUpdateInvoicePayment({ onSuccess });
  };

  saveInvoicePayment = () => {
    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
        content: message,
      });
      this.redirectToTransactionList();
    };

    this.createOrUpdateInvoicePayment({ onSuccess });
  };

  createOrUpdateInvoicePayment = ({ onSuccess }) => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_INVOICE_PAYMENT : UPDATE_INVOICE_PAYMENT;

    const urlParams = {
      businessId: getBusinessId(state),
      invoicePaymentId: getInvoicePaymentId(state),
    };

    const content = getSaveContent(state);

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });

    this.setSubmittingState(true);
  };

  deleteInvoicePayment = () => {
    const state = this.store.getState();
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_INVOICE_PAYMENT,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent: DELETE_INVOICE_PAYMENT,
      urlParams: {
        businessId: getBusinessId(state),
        invoicePaymentId: getInvoicePaymentId(state),
      },
      onSuccess,
      onFailure,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  };

  loadInvoiceList = () => {
    this.setTableLoadingState(true);
    const intent = LOAD_INVOICE_LIST;

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      customerId: getCustomerId(state),
    };
    const params = {
      showPaidInvoices: getShowPaidInvoices(state),
    };

    const onSuccess = ({ entries }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
      });
    };

    const onFailure = (e) => {
      console.log(`Failed to load invoice list: ${e.message}`);
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  openDeleteModal = () => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modal: {
        type: InvoicePaymentModalTypes.DELETE,
      },
    });
  };

  openCancelModal = () => {
    const state = this.store.getState();

    if (getIsPageEdited(state)) {
      const intent = OPEN_MODAL;

      this.store.dispatch({
        intent,
        modal: {
          type: InvoicePaymentModalTypes.CANCEL,
        },
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openUnsavedModal = (url) => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modal: {
        type: InvoicePaymentModalTypes.UNSAVED,
        url,
      },
    });
  };

  closeModal = () => {
    const intent = CLOSE_MODAL;

    this.store.dispatch({ intent });
  };

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case InvoicePaymentModalTypes.CANCEL:
      case InvoicePaymentModalTypes.DELETE:
        // DO NOTHING
        break;
      case InvoicePaymentModalTypes.UNSAVED:
        this.saveUnsavedChanges();
        break;
      default:
        this.saveInvoicePayment();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = (context) => {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(LoadingState.LOADING);
    this.loadInvoicePayment();
  };
}
