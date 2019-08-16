import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_INVOICE_SERVICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE_SERVICE,
} from '../invoiceMessageTypes';
import {
  getBusinessId,
  getInvoiceId,
  getIsCreating,
  getIsTableEmpty,
  getRegion,
  getRouteURLParams,
  getShouldShowEmailModalAfterSave,
  isPageEdited,
} from './invoiceServiceSelectors';
import InvoiceDetailModalType from '../InvoiceDetailModalType';
import InvoiceServiceView from './components/InvoiceServiceView';
import Store from '../../../store/Store';
import createInvoiceServiceDispatcher from './createInvoiceServiceDispatcher';
import createInvoiceServiceIntegrator from './createInvoiceServiceIntegrator';
import invoiceServiceReducer from './invoiceServiceReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoiceServiceModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(invoiceServiceReducer);
    this.dispatcher = createInvoiceServiceDispatcher(this.store);
    this.integrator = createInvoiceServiceIntegrator(this.store, integration);
  }

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.dispatcher.resetTotals();
      return;
    }

    const onSuccess = ({ totals }) => {
      this.dispatcher.getCalculatedTotals(totals);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.getCalculatedTotals({
      onSuccess,
      onFailure,
    });
  }

  loadContactAddress = () => {
    const onSuccess = ({ address }) => this.dispatcher.setContactAddress(address);

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.setContactAddress('');
    };

    this.integrator.loadContactAddress({
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.dispatcher.updateHeaderOptions(key, value);

    const taxKeys = ['taxInclusive'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }

    if (key === 'contactId') {
      this.loadContactAddress();
    }
  }

  updateTableLine = ({ index, key, value }) => {
    this.dispatcher.updateTableLine(index, key, value);

    const taxKeys = ['allocatedAccountId', 'taxCodeId'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }
  }

  addTableLine = (line) => {
    this.dispatcher.addTableLine(line);
  }

  formatAndCalculateTotals = (index) => {
    this.dispatcher.formatLine(index);
    this.getCalculatedTotals();
  }

  removeTableLineAndCalculateTotals = (index) => {
    this.dispatcher.removeTableLineAndCalculateTotals(index);
    this.getCalculatedTotals();
  }

  transitionAfterSave = () => {
    const state = this.store.getState();
    if (getShouldShowEmailModalAfterSave(state)) {
      this.redirectToInvoiceReadUpdateView();
    } else {
      this.redirectToInvoiceList();
    }
  }

  redirectToInvoiceReadUpdateView = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    const invoiceId = getInvoiceId(state);

    window.location.href = `/#/${region}/${businessId}/invoice/${invoiceId}?openSendEmail=true`;
  }

  redirectToInvoiceList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/invoice`;
  }

  openInvoiceAndQuoteSettingsTab = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    const invoiceAndQuoteSettingsUrl = `/#/${region}/${businessId}/salesSettings`;
    window.open(invoiceAndQuoteSettingsUrl);
  }

  openSalesSettingsTabAndCloseModal = () => {
    this.openInvoiceAndQuoteSettingsTab();
    this.closeEmailSettingsModal();
  }

  saveInvoice = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_INVOICE_SERVICE,
        content: response.message,
      });

      if (isCreating) {
        this.dispatcher.saveInvoiceIdForCreate(response.id);
      }
      this.transitionAfterSave();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.dispatcher.setSubmittingState(true);

    this.integrator.saveInvoiceServiceDetail({
      isCreating,
      onSuccess,
      onFailure,
    });
  }

  deleteInvoice = () => {
    this.dispatcher.setSubmittingState(true);
    this.closeConfirmModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_INVOICE_SERVICE,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.deleteInvoice({
      onSuccess,
      onFailure,
    });
  }

  updateEmailInvoiceDetail = ({ key, value }) => {
    this.dispatcher.updateEmailInvoiceDetail(key, value);
  }

  saveAndEmailInvoice = () => {
    this.dispatcher.setShowEmailModalAfterSave(true);
    this.saveInvoice();
  }

  sendEmail = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_EMAILED_INVOICE,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.closeEmailInvoiceDetailModal();
      this.displayFailureAlert(message);
    };

    this.integrator.sendEmail({
      onSuccess,
      onFailure,
    });
  }

  openCancelModal = () => {
    if (isPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.CANCEL);
    } else {
      this.redirectToInvoiceList();
    }
  };

  openDeleteModal = () => this.dispatcher.setModalType(InvoiceDetailModalType.DELETE);

  closeConfirmModal = () => {
    this.setCloseModalType();
  }

  closeEmailSettingsModal = () => {
    this.setCloseModalType();
    this.dispatcher.setShowEmailModalAfterSave(false);
    this.dispatcher.resetOpenSendEmailParam();
  }

  closeEmailInvoiceDetailModal = () => {
    this.setCloseModalType();
    this.dispatcher.setShowEmailModalAfterSave(false);
    this.dispatcher.resetOpenSendEmailParam();
    this.dispatcher.resetEmailInvoiceDetail();
  }

  dismissModalAlert = () => {
    this.dispatcher.dismissModalAlert();
  }

  setCloseModalType = () => this.dispatcher.setModalType(InvoiceDetailModalType.NONE);

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  dismissAlert = () => this.dispatcher.dismissAlert();

  render = () => {
    const invoiceServiceView = (
      <InvoiceServiceView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onUpdateRow={this.updateTableLine}
        onAddRow={this.addTableLine}
        onRemoveRow={this.removeTableLineAndCalculateTotals}
        onRowInputBlur={this.formatAndCalculateTotals}
        onSaveAndEmailButtonClick={this.saveAndEmailInvoice}
        onSaveButtonClick={this.saveInvoice}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissAlert={this.dismissAlert}
        confirmModalListeners={{
          onCancelModalConfirm: this.redirectToInvoiceList,
          onDeleteModalConfirm: this.deleteInvoice,
          onCloseConfirmModal: this.closeConfirmModal,
        }}
        emailSettingsModalListeners={{
          onConfirm: this.openSalesSettingsTabAndCloseModal,
          onCloseModal: this.closeEmailSettingsModal,
          onDismissAlert: this.dismissModalAlert,
        }}
        emailInvoiceDetailModalListeners={{
          onConfirm: this.sendEmail,
          onCloseModal: this.closeEmailInvoiceDetailModal,
          onEmailInvoiceDetailChange: this.updateEmailInvoiceDetail,
          onDismissAlert: this.dismissModalAlert,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {invoiceServiceView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context, payload, message) => {
    this.dispatcher.setInitialState(context, payload, message);
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  handlers = {
    SAVE_ACTION: this.saveInvoice,
  };

  updateURLFromState = (state) => {
    const params = getRouteURLParams(state);
    this.replaceURLParams(params);
  }

  run({ context, payload, message }) {
    this.setInitialState(context, payload, message);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.store.subscribe(this.updateURLFromState);
  }
}
