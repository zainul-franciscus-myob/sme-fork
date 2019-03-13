import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BANK_TRANSACTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UPDATE_FILTER_OPTIONS,
} from './BankingIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../SystemIntents';
import {
  getBusinessId, getFilterOptions, getSortOrder,
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
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {transactionListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  loadBankTransactions = () => {
    const state = this.store.getState();

    const intent = LOAD_BANK_TRANSACTIONS;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries,
      balances,
      bankAccount,
      transactionType,
      bankAccounts,
      transactionTypes,
    }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        balances,
        bankAccount,
        transactionType,
        bankAccounts,
        transactionTypes,
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

    const onSuccess = ({ entries, sortOrder, balances }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: false,
        sortOrder,
        balances,
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

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

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
