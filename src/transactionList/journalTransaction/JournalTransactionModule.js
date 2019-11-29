import React from 'react';

import {
  LOAD_TRANSACTION_LIST,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MULTI_FILTER_OPTIONS,
} from './JournalTransactionListIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFlipSortOrder,
  getIsActive,
  getOrderBy,
  getRegion,
  getRequestFilterOptions,
  getSettings,
  getSortOrder,
  getURLParams,
} from './journalTransactionListSelectors';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import { tabItemIds } from '../tabItems';
import TransactionListView from './components/JournalTransactionListView';

const SETTING_KEY = tabItemIds.journal;
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
        onUpdateMultiFilters={this.updateMultiFilterOptions}
        onApplyFilter={this.filterTransactionList}
        pageHead={pageHead}
        subHead={subHead}
        alert={alert}
      />
    );
  }

  loadTransactionList = () => {
    const state = this.store.getState();

    const filterOptions = getRequestFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    const intent = LOAD_TRANSACTION_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
        filterOptions,
        sortOrder,
        orderBy,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    this.integration.read({
      intent,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
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

    const filterOptions = getRequestFilterOptions(state);
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

  updateMultiFilterOptions = (filterUpdates) => {
    const intent = UPDATE_MULTI_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterUpdates,
    });
  };

  updateURLFromState = (state) => {
    const params = getURLParams(state);
    if (getIsActive(state)) {
      this.replaceURLParams(params);
    }
  }

  setInitialState = (context, settings) => {
    const intent = SET_INITIAL_STATE;

    const {
      sourceJournal = '',
      ...rest
    } = context;

    this.store.dispatch({
      intent,
      sourceJournal,
      context: rest,
      settings,
    });
  }

  run(context) {
    const settings = loadSettings(context.businessId, SETTING_KEY);
    this.setInitialState(context, settings);
    this.store.subscribe((state) => {
      this.updateURLFromState(state);
      saveSettings(context.businessId, SETTING_KEY, getSettings(state));
    });
    this.loadTransactionList();
  }
}