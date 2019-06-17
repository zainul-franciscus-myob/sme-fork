import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_INVOICE_SERVICE_LINE,
  CREATE_INVOICE_SERVICE_DETAIL,
  FORMAT_INVOICE_SERVICE_LINE,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  REMOVE_INVOICE_SERVICE_LINE,
  RESET_TOTALS,
  UPDATE_INVOICE_SERVICE_DETAIL,
  UPDATE_INVOICE_SERVICE_HEADER_OPTIONS,
  UPDATE_INVOICE_SERVICE_LINE,
} from './InvoiceServiceIntents';
import {
  CLOSE_MODAL,
  DELETE_INVOICE_DETAIL,
  LOAD_CONTACT_ADDRESS,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
} from '../../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_INVOICE_SERVICE, SUCCESSFULLY_SAVED_INVOICE_SERVICE } from '../invoiceMessageTypes';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getContactId,
  getInvoiceId,
  getInvoicePayload,
  getIsCreating,
  getIsTableEmpty,
  getRegion,
  isPageEdited,
} from './invoiceServiceSelectors';
import InvoiceServiceView from './components/InvoiceServiceView';
import Store from '../../../store/Store';
import invoiceServiceReducer from './invoiceServiceReducer';

export default class InvoiceServiceModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(invoiceServiceReducer);
  }

  resetTotals = () => this.store.dispatch({ intent: RESET_TOTALS });

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.resetTotals();
      return;
    }
    const intent = GET_CALCULATED_INVOICE_DETAIL_TOTALS;
    const onSuccess = ({ totals }) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
      onSuccess,
      onFailure,
    });
  }

  setContactAddress = address => this.store.dispatch({
    intent: LOAD_CONTACT_ADDRESS,
    address,
  })

  loadContactAddress = () => {
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getContactId(state),
    };

    const onSuccess = ({ address }) => this.setContactAddress(address);

    const onFailure = ({ message }) => {
      this.displayAlert(message);
      this.setContactAddress('');
    };

    this.integration.read({
      intent: LOAD_CONTACT_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_INVOICE_SERVICE_HEADER_OPTIONS,
      key,
      value,
    });

    const taxKeys = ['taxInclusive'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }

    if (key === 'contactId') {
      this.loadContactAddress();
    }
  }

  updateTableLine = ({ index, key, value }) => {
    this.store.dispatch({
      intent: UPDATE_INVOICE_SERVICE_LINE,
      index,
      key,
      value,
    });

    const taxKeys = ['allocatedAccountId', 'taxCodeId'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }
  }

  addTableLine = line => this.store.dispatch({
    intent: ADD_INVOICE_SERVICE_LINE,
    line,
  })

  formatLine = index => this.store.dispatch({
    intent: FORMAT_INVOICE_SERVICE_LINE,
    index,
  });

  formatAndCalculateTotals = (index) => {
    this.formatLine(index);
    this.getCalculatedTotals();
  }

  removeTableLineAndCalculateTotals = (index) => {
    this.store.dispatch({
      intent: REMOVE_INVOICE_SERVICE_LINE,
      index,
    });

    this.getCalculatedTotals();
  }

  redirectToInvoiceList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/invoice`;
  }

  saveInvoiceServiceEntry = (intent, content, urlParams) => {
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_INVOICE_SERVICE,
        content: message,
      });
      this.redirectToInvoiceList();
    };

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
  }

  updateInvoiceServiceEntry = () => {
    const intent = UPDATE_INVOICE_SERVICE_DETAIL;
    const state = this.store.getState();
    const invoiceId = getInvoiceId(state);
    const content = getInvoicePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      invoiceId,
    };
    this.saveInvoiceServiceEntry(intent, content, urlParams);
  }

  createInvoiceServiceEntry = () => {
    const intent = CREATE_INVOICE_SERVICE_DETAIL;
    const state = this.store.getState();
    const content = getInvoicePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveInvoiceServiceEntry(intent, content, urlParams);
  }

  deleteInvoice = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_INVOICE_SERVICE,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    const state = this.store.getState();
    const invoiceId = getInvoiceId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      invoiceId,
    };

    this.integration.write({
      intent: DELETE_INVOICE_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  openCancelModal = () => {
    const intent = OPEN_MODAL;

    if (isPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToInvoiceList();
    }
  };

  openDeleteModal = () => this.store.dispatch({
    intent: OPEN_MODAL,
    modalType: 'delete',
  });

  closeModal = () => this.store.dispatch({
    intent: CLOSE_MODAL,
  });

  displayAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  render = () => {
    const isCreating = getIsCreating(this.store.getState());
    const invoiceServiceView = (
      <InvoiceServiceView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onUpdateRow={this.updateTableLine}
        onAddRow={this.addTableLine}
        onRemoveRow={this.removeTableLineAndCalculateTotals}
        onRowInputBlur={this.formatAndCalculateTotals}
        onCancelButtonClick={this.openCancelModal}
        onSaveButtonClick={isCreating
          ? this.createInvoiceServiceEntry
          : this.updateInvoiceServiceEntry
        }
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.closeModal}
        onDeleteModal={this.deleteInvoice}
        onCancelModal={this.redirectToInvoiceList}
        onDismissAlert={this.dismissAlert}
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

  setInitialState = (context, payload) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
      ...payload,
    });
  }

  run({ context, payload }) {
    this.setInitialState(context, payload);
    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
