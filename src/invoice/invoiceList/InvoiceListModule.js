import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_INVOICE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_INVOICE_SERVICE, SUCCESSFULLY_SAVED_INVOICE_SERVICE } from '../invoiceMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getNewInvoicelUrlParam,
  getOrderBy,
  getRegion,
  getSortOrder,
} from './invoiceListSelectors';
import InvoiceListView from './components/InvoiceListView';
import Store from '../../store/Store';
import invoiceListReducer from './invoiceListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_INVOICE_SERVICE,
  SUCCESSFULLY_DELETED_INVOICE_SERVICE,
];

export default class InvoiceListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(invoiceListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  loadInvoiceList = () => {
    const state = this.store.getState();
    const intent = LOAD_INVOICE_LIST;
    const filterOptions = getFilterOptions(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (
      response,
    ) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      console.error('Failed to load invoice list entries');
    };

    this.setLoadingState(true);
    this.integration.read({
      intent,
      params: {
        ...filterOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  sortInvoiceList = (orderBy) => {
    const state = this.store.getState();
    const intent = SORT_AND_FILTER_INVOICE_LIST;
    const filterOptions = getAppliedFilterOptions(state);
    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';

    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, total, totalDue }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        total,
        totalDue,
        filterOptions,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.setTableLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  };

  filterInvoiceList = () => {
    const intent = SORT_AND_FILTER_INVOICE_LIST;

    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries,
      total,
      totalDue,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        filterOptions,
        total,
        totalDue,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.setTableLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.setAlert({
        type: 'success',
        message,
      });
    }
  };

  redirectToCreateNewInvoice = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    const newInvoiceUrlParam = getNewInvoicelUrlParam(state);

    window.location.href = `/#/${region}/${businessId}/invoice/${newInvoiceUrlParam}`;
  };

  render = () => {
    const invoiceListView = (
      <InvoiceListView
        onApplyFilter={this.filterInvoiceList}
        onUpdateFilter={this.updateFilterOptions}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortInvoiceList}
        onCreateButtonClick={this.redirectToCreateNewInvoice}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {invoiceListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  updateFilterOptions = ({ filterName, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  };

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  };

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  setTableLoadingState = (isLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  };

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

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.loadInvoiceList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
