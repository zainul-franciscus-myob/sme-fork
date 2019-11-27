import React from 'react';

import {
  LOAD_TRANSACTION_LIST,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
} from './JournalTransactionListIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getOrderBy,
  getRegion,
  getSortOrder,
  getURLParams,
} from './journalTransactionListSelectors';
import TransactionListView from './components/JournalTransactionListView';

export default class JournalTransactionModule {
  constructor({
    integration, store, setAlert, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = store;
    this.setAlert = setAlert;
    this.replaceURLParams = replaceURLParams;
  }

  getView({ pageHead, alert, subHead }) {
    return (
      <TransactionListView
        onSort={this.sortTransactionList}
        onAddTransaction={this.redirectToAddTransaction}
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.filterTransactionList}
        pageHead={pageHead}
        subHead={subHead}
        alert={alert}
      />
    );
  }

  loadTransactionList = () => {
    const state = this.store.getState();

    const intent = LOAD_TRANSACTION_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load transaction list entries');
    };

    const filterOptions = getFilterOptions(state);

    this.integration.read({
      intent,
      params: {
        ...filterOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  filterTransactionList = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_TRANSACTION_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, sortOrder }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: false,
        sortOrder,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
      },
      onSuccess,
      onFailure,
    });
  };

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  };

  sortTransactionList = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    const intent = SORT_AND_FILTER_TRANSACTION_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, sortOrder }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
        sortOrder,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getAppliedFilterOptions(state);
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

  redirectToAddTransaction = (transactionType) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/${transactionType}/new`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  updateFilterOptions = ({ filterName, value }) => {
    const intent = UPDATE_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterName,
      value,
    });
  };

  updateURLFromState = (state) => {
    const params = getURLParams(state);
    this.replaceURLParams(params);
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    const {
      sourceJournal = '',
      ...rest
    } = context;

    this.store.dispatch({
      intent,
      sourceJournal,
      context: rest,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.loadTransactionList();
    this.store.subscribe(this.updateURLFromState);
  }
}
