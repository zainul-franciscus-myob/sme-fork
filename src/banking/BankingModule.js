import { Provider } from 'react-redux';
import React from 'react';

import {
  ALLOCATE_TRANSACTION,
  LOAD_BANK_TRANSACTIONS,
  SET_ALERT,
  SET_ENTRY_FOCUS,
  SET_ENTRY_LOADING_STATE,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_TRANSACTION,
  UPDATE_FILTER_OPTIONS,
} from './BankingIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../SystemIntents';
import {
  getAllocationPayload,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder, getOrderBy,
  getSortOrder,
  getUnallocationPayload,
} from './bankingSelectors';
import BankingView from './components/BankingView';
import Store from '../store/Store';
import bankingReducer from './bankingReducer';

export default class BankingModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.store = new Store(bankingReducer);
    this.setRootView = setRootView;
  }

  render = () => {
    const transactionListView = (
      <BankingView
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.filterBankTransactions}
        onSort={this.sortBankTransactions}
        onDismissAlert={this.dismissAlert}
        onAllocate={this.allocateTransaction}
        onUnallocate={this.unallocateTransaction}
        onMatchedToBlur={this.blurEntry}
        onMatchedToFocus={this.focusEntry}
        onUnmatchedFocus={this.focusEntry}
        onUnmatchedBlur={this.blurEntry}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {transactionListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  focusEntry = (index) => {
    const intent = SET_ENTRY_FOCUS;

    this.store.dispatch({
      intent,
      index,
      isFocused: true,
    });
  }

  blurEntry = (index) => {
    const intent = SET_ENTRY_FOCUS;

    this.store.dispatch({
      intent,
      index,
      isFocused: false,
    });
  }

  setEntryLoadingState = (index, isLoading) => {
    const intent = SET_ENTRY_LOADING_STATE;

    this.store.dispatch({
      intent,
      index,
      isLoading,
    });
  }

  allocateTransaction = (index, selectedAccount) => {
    this.focusEntry(index + 1);
    this.blurEntry(index);
    this.setEntryLoadingState(index, true);

    const state = this.store.getState();
    const urlParams = { businessId: getBusinessId(state) };

    const intent = ALLOCATE_TRANSACTION;

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);
      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
    };

    const onFailure = ({ message }) => {
      this.setEntryLoadingState(index, false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    const allocationPayload = getAllocationPayload(index, selectedAccount, state);

    this.integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content: allocationPayload,
      onSuccess,
      onFailure,
    });
  }

  unallocateTransaction = (index) => {
    this.setEntryLoadingState(index, true);

    const state = this.store.getState();
    const urlParams = { businessId: getBusinessId(state) };

    const intent = UNALLOCATE_TRANSACTION;

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);

      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
    };

    const onFailure = ({ message }) => {
      this.setEntryLoadingState(index, false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    const unallocationPayload = getUnallocationPayload(index, state);

    this.integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content: unallocationPayload,
      onSuccess,
      onFailure,
    });
  }

  loadBankTransactions = () => {
    const state = this.store.getState();

    const intent = LOAD_BANK_TRANSACTIONS;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
      });
    };

    const onFailure = () => {
      console.log('Failed to load bank transactions');
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

  filterBankTransactions = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        isSort: false,
        ...payload,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  }

  sortBankTransactions = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        isSort: true,
        ...payload,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getFilterOptions(state);
    const sortOrder = getFlipSortOrder(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  }

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
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

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  }

  updateFilterOptions = ({ filterName, value }) => {
    const intent = UPDATE_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterName,
      value,
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
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
    this.loadBankTransactions();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
