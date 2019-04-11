import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_SERVICE_QUOTE_LINE,
  CLOSE_MODAL,
  CREATE_SERVICE_QUOTE,
  DELETE_SERVICE_QUOTE,
  FORMAT_SERVICE_QUOTE_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_NEW_SERVICE_QUOTE,
  LOAD_SERVICE_QUOTE_DETAIL,
  OPEN_MODAL,
  REMOVE_SERVICE_QUOTE_LINE,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SERVICE_QUOTE,
  UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
  UPDATE_SERVICE_QUOTE_LINE,
} from '../QuoteIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
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
import ServiceQuoteView from './components/ServiceQuoteView';
import Store from '../../store/Store';
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

  loadServiceQuoteDetail = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    const intent = isCreating ? LOAD_NEW_SERVICE_QUOTE : LOAD_SERVICE_QUOTE_DETAIL;
    const quoteId = isCreating ? undefined : getQuoteId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      quoteId,
    };
    const onSuccess = (response) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
      });
    };
    const onFailure = () => {
      console.log('Failed to load service quote');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  resetTotals = () => this.store.dispatch({ intent: RESET_TOTALS });

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.resetTotals();
      return;
    }
    const intent = GET_CALCULATED_TOTALS;
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

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    if (isPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToQuoteList();
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

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  saveServiceQuoteEntry = (intent, content, urlParams) => {
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SERVICE_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
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

  updateServiceQuoteEntry = () => {
    const intent = UPDATE_SERVICE_QUOTE;
    const state = this.store.getState();
    const quoteId = getQuoteId(state);
    const content = getQuotePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      quoteId,
    };
    this.saveServiceQuoteEntry(intent, content, urlParams);
  }

  createServiceQuoteEntry = () => {
    const intent = CREATE_SERVICE_QUOTE;
    const state = this.store.getState();
    const content = getQuotePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveServiceQuoteEntry(intent, content, urlParams);
  }

  deleteServiceQuoteEntry = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
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
      intent: DELETE_SERVICE_QUOTE,
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
    const isCreating = getIsCreating(this.store.getState());
    const serviceQuoteView = (
      <ServiceQuoteView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onUpdateRow={this.updateTableLine}
        onAddRow={this.addTableLine}
        onRemoveRow={this.removeTableLineAndCalculateTotals}
        onRowInputBlur={this.formatAndCalculateTotals}
        onSaveButtonClick={isCreating ? this.createServiceQuoteEntry : this.updateServiceQuoteEntry}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToQuoteList}
        onDeleteButtonClick={this.openDeleteModal}
        onDeleteModal={this.deleteServiceQuoteEntry}
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

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.setLoadingState(true);
    this.loadServiceQuoteDetail();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
