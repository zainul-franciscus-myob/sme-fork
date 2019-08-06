import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_SERVICE_QUOTE_LINE,
  CLOSE_MODAL,
  CREATE_SERVICE_QUOTE,
  FORMAT_SERVICE_QUOTE_LINE,
  GET_SERVICE_QUOTE_CALCULATED_TOTALS,
  OPEN_MODAL,
  REMOVE_SERVICE_QUOTE_LINE,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
  UPDATE_SERVICE_QUOTE,
  UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
  UPDATE_SERVICE_QUOTE_LINE,
} from './ServiceQuoteIntents';
import {
  DELETE_QUOTE_DETAIL, LOAD_CUSTOMER_ADDRESS,
} from '../../QuoteIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_SERVICE_QUOTE, SUCCESSFULLY_SAVED_SERVICE_QUOTE } from '../quoteMessageTypes';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getCustomerId,
  getIsCreating,
  getIsTableEmpty,
  getQuoteId,
  getQuotePayload,
  getRegion,
  isPageEdited,
} from './ServiceQuoteSelectors';
import ModalType from '../ModalType';
import ServiceQuoteView from './components/ServiceQuoteView';
import Store from '../../../store/Store';
import serviceQuoteReducer from './serviceQuoteReducer';

export default class ServiceQuoteModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(serviceQuoteReducer);
  }

  resetTotals = () => this.store.dispatch({ intent: RESET_TOTALS });

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.resetTotals();
      return;
    }
    const intent = GET_SERVICE_QUOTE_CALCULATED_TOTALS;
    const onSuccess = ({ totals }) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };
    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
      onSuccess,
      onFailure,
    });
  }

  setCustomerAddress = address => this.store.dispatch({
    intent: LOAD_CUSTOMER_ADDRESS,
    address,
  })

  loadCustomerAddress = () => {
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      customerId: getCustomerId(state),
    };

    const onSuccess = ({ address }) => this.setCustomerAddress(address);

    const onFailure = (error) => {
      this.displayAlert(error.message);
      this.setCustomerAddress('');
    };

    this.integration.read({
      intent: LOAD_CUSTOMER_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
      key,
      value,
    });

    const taxKeys = ['taxInclusive'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }

    if (key === 'customerId') {
      this.loadCustomerAddress();
    }
  }

  updateTableLine = ({ index, key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SERVICE_QUOTE_LINE,
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
    intent: ADD_SERVICE_QUOTE_LINE,
    line,
  })

  removeTableLineAndCalculateTotals = (index) => {
    this.store.dispatch({
      intent: REMOVE_SERVICE_QUOTE_LINE,
      index,
    });

    this.getCalculatedTotals();
  }

  redirectToQuoteList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/quote`;
  }

  redirectToCreateInvoice = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    const quoteId = getQuoteId(state);

    window.location.href = `/#/${region}/${businessId}/invoice/newService?quoteId=${quoteId}`;
  }

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    if (isPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: ModalType.CANCEL,
      });
    } else {
      this.redirectToQuoteList();
    }
  };

  openDeleteModal = () => this.store.dispatch({
    intent: OPEN_MODAL,
    modalType: ModalType.DELETE,
  });

  openUnsavedModal = () => {
    const intent = OPEN_MODAL;
    if (isPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: ModalType.UNSAVED,
      });
    } else {
      this.redirectToCreateInvoice();
    }
  }

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

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  createOrUpdateQuote = ({ onSuccess }) => {
    this.setSubmittingState(true);

    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_SERVICE_QUOTE
      : UPDATE_SERVICE_QUOTE;

    const businessId = getBusinessId(state);
    const quoteId = isCreating ? undefined : getQuoteId(state);
    const urlParams = { businessId, quoteId };

    const content = getQuotePayload(state);

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

  saveQuote = () => {
    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SERVICE_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndRedirectToInvoice = () => {
    const onSuccess = () => {
      this.redirectToCreateInvoice();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  deleteServiceQuoteEntry = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SERVICE_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    const state = this.store.getState();
    const quoteId = getQuoteId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      quoteId,
    };

    this.integration.write({
      intent: DELETE_QUOTE_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  formatLine = index => this.store.dispatch({
    intent: FORMAT_SERVICE_QUOTE_LINE,
    index,
  });

  formatAndCalculateTotals = (index) => {
    this.formatLine(index);
    this.getCalculatedTotals();
  }

  render = () => {
    const serviceQuoteView = (
      <ServiceQuoteView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onUpdateRow={this.updateTableLine}
        onAddRow={this.addTableLine}
        onRemoveRow={this.removeTableLineAndCalculateTotals}
        onRowInputBlur={this.formatAndCalculateTotals}
        onSaveButtonClick={this.saveQuote}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToQuoteList}
        onConvertToInvoiceButtonClick={this.openUnsavedModal}
        onDeleteButtonClick={this.openDeleteModal}
        onDeleteModal={this.deleteServiceQuoteEntry}
        onConfirmSaveButtonClick={this.saveAndRedirectToInvoice}
        onConfirmUnsaveButtonClick={this.redirectToCreateInvoice}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {serviceQuoteView}
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
