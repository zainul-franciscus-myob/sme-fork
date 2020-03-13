import React from 'react';

import {
  LOAD_TRANSACTION_LIST,
  LOAD_TRANSACTION_LIST_NEXT_PAGE,
  REPLACE_FILTER_OPTIONS,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MULTI_FILTER_OPTIONS,
} from './JournalTransactionListIntents';
import {
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getIsActive,
  getIsLoaded,
  getLoadTransactionListNextPageParams,
  getOrderBy,
  getRequestFilterOptions,
  getSettings,
  getSortOrder,
  getURLParams,
} from './journalTransactionListSelectors';
import { getIsSwitchingTab } from '../transactionListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import { tabItemIds } from '../tabItems';
import TransactionListView from './components/JournalTransactionListView';
import debounce from '../../../common/debounce/debounce';

const SETTING_KEY = tabItemIds.journal;
export default class JournalTransactionModule {
  constructor({
    integration, store, setAlert, setLastLoadingTab, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = store;
    this.setAlert = setAlert;
    this.setLastLoadingTab = setLastLoadingTab;
    this.replaceURLParams = replaceURLParams;
  }

  getView({ pageHead, alert, subHead }) {
    const state = this.store.getState();
    if (getIsSwitchingTab(state)) {
      if (!getIsLoaded(state)) {
        this.loadTransactionList();
      } else {
        this.filterTransactionList();
      }
    }

    return (
      <TransactionListView
        onSort={this.sortTransactionList}
        onUpdateFilters={this.updateFilterOptions}
        onUpdateMultiFilters={this.updateMultiFilterOptions}
        onLoadMoreButtonClick={this.loadTransactionListNextPage}
        pageHead={pageHead}
        subHead={subHead}
        alert={alert}
      />
    );
  }

  getFilterOptions = () => {
    const state = this.store.getState();
    return getFilterOptions(state);
  };

  replaceFilterOptions = (filterOptions) => {
    const intent = REPLACE_FILTER_OPTIONS;
    this.store.dispatch({ intent, filterOptions });
  };

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

    const onFailure = ({ message }) => {
      this.setLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.setLastLoadingTab();
    this.integration.read({
      intent,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
        offset: 0,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  setNextPageLoadingState = (isNextPageLoading) => {
    const intent = SET_NEXT_PAGE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isNextPageLoading,
    });
  };

  filterTransactionList = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_TRANSACTION_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, sortOrder, pagination }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: false,
        sortOrder,
        pagination,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getRequestFilterOptions(state);
    const sortOrder = getSortOrder(state);

    this.setLastLoadingTab();
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

  debouncedFilterTransactionList = debounce(this.filterTransactionList);

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

    const onSuccess = ({ entries, sortOrder, pagination }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
        sortOrder,
        pagination,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getFilterOptions(state);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
        offset: 0,
      },
      onSuccess,
      onFailure,
    });
  };

  loadTransactionListNextPage = () => {
    const state = this.store.getState();
    this.setNextPageLoadingState(true);

    const intent = LOAD_TRANSACTION_LIST_NEXT_PAGE;

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getLoadTransactionListNextPageParams(state);

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

    if (filterName === 'keywords') {
      this.debouncedFilterTransactionList();
    } else {
      this.filterTransactionList();
    }
  };

  updateMultiFilterOptions = (filterUpdates) => {
    const intent = UPDATE_MULTI_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterUpdates,
    });
    this.filterTransactionList();
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
  }
}
