import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL } from '../generalJournal/GeneralJournalMessageTypes';
import { SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY } from '../receiveMoney/receiveMoneyMessageTypes';
import { SUCCESSFULLY_DELETED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY } from '../spendMoney/spendMoneyMessageTypes';
import {
  getAppliedFilterOptions, getFilterOptions, getSortOrder, getURLParams,
} from './transactionListSelectors';
import Store from '../store/Store';
import SystemIntents from '../SystemIntents';
import TransactionListIntents from './TransactionListIntents';
import TransactionListView from './components/TransactionListView';
import transactionListReducer from './transactionListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
  SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY,
  SUCCESSFULLY_DELETED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY,
];

export default class TransactionListModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(transactionListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
  }

  render = () => {
    const transactionListView = (
      <TransactionListView
        businessId={this.businessId}
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.filterTransactionList}
        onSort={this.sortTransactionList}
        onDismissAlert={this.dismissAlert}
        onAddTransaction={this.redirectToAddTransaction}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {transactionListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  loadTransactionList = () => {
    const state = this.store.getState();

    const intent = TransactionListIntents.LOAD_TRANSACTION_LIST;
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({
      entries,
      sourceJournalFilters,
      sortOrder,
      sourceJournal,
    }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        sourceJournalFilters,
        sourceJournal,
        sortOrder,
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

    const intent = TransactionListIntents.SORT_AND_FILTER_TRANSACTION_LIST;

    const urlParams = {
      businessId: this.businessId,
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

  sortTransactionList = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);
    const intent = TransactionListIntents.SORT_AND_FILTER_TRANSACTION_LIST;

    const urlParams = {
      businessId: this.businessId,
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

    const newSortOrder = getSortOrder(state) === 'desc' ? 'asc' : 'desc';
    const filterOptions = getAppliedFilterOptions(state);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
      },
      onSuccess,
      onFailure,
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.setAlert({
        type: 'success',
        message,
      });
    }
  }

  setAlert = ({ message, type }) => {
    const intent = TransactionListIntents.SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  }

  redirectToAddTransaction = (transactionType) => {
    window.location.href = `/#/${this.businessId}/${transactionType}/new`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    const intent = TransactionListIntents.SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = TransactionListIntents.SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  updateFilterOptions = ({ filterName, value }) => {
    const intent = TransactionListIntents.UPDATE_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterName,
      value,
    });
  };

  dismissAlert = () => {
    const intent = TransactionListIntents.SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  setInitialState = (params) => {
    const intent = SystemIntents.SET_INITIAL_STATE;

    const {
      sourceJournal = '',
    } = params;

    this.store.dispatch({
      intent,
      sourceJournal,
    });
  }

  updateURLFromState = (state) => {
    const params = getURLParams(state);
    this.replaceURLParams(params);
  }

  run(context) {
    this.businessId = context.businessId;
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.loadTransactionList();
    this.store.subscribe(this.updateURLFromState);
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
