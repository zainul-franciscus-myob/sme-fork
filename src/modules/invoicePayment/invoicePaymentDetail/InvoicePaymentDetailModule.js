import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
} from '../InvoicePaymentMessageTypes';
import {
  getBusinessId,
  getCustomerId,
  getIsActionsDisabled,
  getIsPageEdited,
  getModalUrl,
  getOpenedModalType,
  getRegion,
} from './invoicePaymentDetailSelectors';
import InvoicePaymentDetailView from './components/InvoicePaymentDetailView';
import InvoicePaymentModalTypes from '../InvoicePaymentModalTypes';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createInvoicePaymentDetailDispatcher from './createInvoicePaymentDetailDisptacher';
import createInvoicePaymentDetailIntegrator from './createInvoicePaymentDetailIntegrator';
import invoicePaymentDetailReducer from './invoicePaymentDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoicePaymentDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.store = new Store(invoicePaymentDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;

    this.dispatcher = createInvoicePaymentDetailDispatcher(this.store);
    this.integrator = createInvoicePaymentDetailIntegrator(this.store, integration);
  }

  render = () => {
    const invoicePaymentView = (
      <InvoicePaymentDetailView
        onUpdateInvoicePaymentDetails={this.dispatcher.updateInvoicePaymentDetails}
        onUpdateInvoicePaymentEntries={this.dispatcher.updateInvoicePaymentEntries}
        onUpdateShowPaidInvoices={this.updateShowPaidInvoices}
        onUpdateCustomer={this.updateCustomer}
        onSaveButtonClick={this.saveInvoicePayment}
        onDismissAlert={this.dispatcher.dismissAlert}
        onCloseModal={this.dispatcher.closeModal}
        onDeleteButtonClick={this.openDeleteModal}
        onConfirmDelete={this.deleteInvoicePayment}
        onCancelButtonClick={this.openCancelModal}
        onConfirmCancel={this.redirectToTransactionList}
        onConfirmSaveButtonClick={this.saveUnsavedChanges}
        onConfirmUnsaveButtonClick={this.redirectToModalUrl}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {invoicePaymentView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  loadInvoicePayment = () => {
    const state = this.store.getState();

    const onSuccess = (response) => {
      this.dispatcher.loadInvoicePayment(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInvoicePayment({ onSuccess, onFailure });

    const customerId = getCustomerId(state);
    if (customerId !== '') {
      this.updateCustomer(customerId);
    }
  };

  updateShowPaidInvoices = (value) => {
    const customerId = getCustomerId(this.store.getState());
    this.dispatcher.updateShowPaidInvoices(value);

    if (customerId) {
      this.loadInvoiceList();
    }
  };

  updateCustomer = (value) => {
    this.dispatcher.updateCustomer(value);
    this.loadInvoiceList();
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
    this.dispatcher.closeModal();

    this.redirectToUrl(url);
  };

  saveUnsavedChanges = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.dispatcher.closeModal();

    const onSuccess = () => {
      this.redirectToUrl(url);
    };

    this.createOrUpdateInvoicePayment({ onSuccess });
  };

  saveInvoicePayment = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
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

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.dispatcher.setSubmittingState(true);
    this.integrator.createOrUpdateInvoicePayment({ onSuccess, onFailure });
  };

  deleteInvoicePayment = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_INVOICE_PAYMENT,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.deleteInvoicePayment({ onSuccess, onFailure });
  };

  loadInvoiceList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.loadInvoiceList(entries);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.loadInvoiceList({ onSuccess, onFailure });
  };

  openDeleteModal = () => this.dispatcher.openModal({ type: InvoicePaymentModalTypes.DELETE });

  openCancelModal = () => {
    const state = this.store.getState();

    if (getIsPageEdited(state)) {
      this.dispatcher.openModal({ type: InvoicePaymentModalTypes.CANCEL });
    } else {
      this.redirectToTransactionList();
    }
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: InvoicePaymentModalTypes.UNSAVED, url });
  };

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
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadInvoicePayment();
  };

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => this.store.unsubscribeAll();
}
