import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_INVOICE_LIST,
  LOAD_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE,
} from '../invoiceDetail/invoiceMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getLoadNextPageParams,
  getOrderBy,
  getRegion,
  getSettings,
  getSortOrder,
} from './invoiceListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import InvoiceListView from './components/InvoiceListView';
import LoadingState from '../../../components/PageView/LoadingState';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import invoiceListReducer from './invoiceListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE,
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
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (
      response,
    ) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.setLoadingState(LoadingState.LOADING);
    this.integration.read({
      intent,
      params: {
        ...filterOptions,
        orderBy,
        sortOrder,
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

    const onSuccess = ({
      entries, total, totalDue, totalOverdue, pagination,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        total,
        totalDue,
        totalOverdue,
        filterOptions,
        pagination,
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
        offset: 0,
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
      totalOverdue,
      pagination,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        filterOptions,
        total,
        totalDue,
        totalOverdue,
        pagination,
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
        offset: 0,
      },
      onSuccess,
      onFailure,
    });
  };

  loadNextPage = () => {
    const state = this.store.getState();
    this.setNextPageLoadingState(true);

    const intent = LOAD_NEXT_PAGE;

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getLoadNextPageParams(state);

    const onSuccess = ({
      entries, pagination,
    }) => {
      this.setNextPageLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.setNextPageLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integration.read({
      intent,
      urlParams,
      params,
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

    window.location.href = `/#/${region}/${businessId}/invoice/new`;
  };

  render = () => {
    const invoiceListView = (
      <InvoiceListView
        onApplyFilter={this.filterInvoiceList}
        onUpdateFilter={this.updateFilterOptions}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortInvoiceList}
        onLoadMoreButtonClick={this.loadNextPage}
        onCreateInvoiceButtonClick={this.redirectToCreateNewInvoice}
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

  setLoadingState = (loadingState) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      loadingState,
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

  setInitialState = (context, settings) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
    });
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  setNextPageLoadingState = (isNextPageLoading) => {
    const intent = SET_NEXT_PAGE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isNextPageLoading,
    });
  };

  run(context) {
    const settings = loadSettings(context.businessId, RouteName.INVOICE_LIST);
    this.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.store.subscribe(state => (
      saveSettings(context.businessId, RouteName.INVOICE_LIST, getSettings(state))
    ));
    this.loadInvoiceList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
