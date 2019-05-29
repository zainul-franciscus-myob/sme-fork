import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_TRANSACTION_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
} from './TransactionListIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../SystemIntents';
import { SUCCESSFULLY_DELETED_BILL_PAYMENT, SUCCESSFULLY_SAVED_BILL_PAYMENT } from '../billPayment/BillPaymentMessageTypes';
import { SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL } from '../generalJournal/GeneralJournalMessageTypes';
import { SUCCESSFULLY_DELETED_INVOICE_PAYMENT, SUCCESSFULLY_SAVED_INVOICE_PAYMENT } from '../invoicePayment/InvoicePaymentMessageTypes';
import { SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY } from '../receiveMoney/receiveMoneyMessageTypes';
import { SUCCESSFULLY_DELETED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY } from '../spendMoney/spendMoneyMessageTypes';
import { SUCCESSFULLY_DELETED_TRANSFER_MONEY, SUCCESSFULLY_SAVED_TRANSFER_MONEY } from '../transferMoney/transferMoneyMessageTypes';
import {
  getAppliedFilterOptions, getBusinessId, getFilterOptions, getRegion, getSortOrder, getURLParams,
} from './transactionListSelectors';
import Store from '../store/Store';
import TransactionListView from './components/TransactionListView';
import transactionListReducer from './transactionListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
  SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY,
  SUCCESSFULLY_DELETED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_TRANSFER_MONEY, SUCCESSFULLY_DELETED_TRANSFER_MONEY,
  SUCCESSFULLY_DELETED_INVOICE_PAYMENT, SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_PAYMENT, SUCCESSFULLY_DELETED_BILL_PAYMENT,
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

    const intent = LOAD_TRANSACTION_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
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

  sortTransactionList = () => {
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
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  }

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

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

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

  updateURLFromState = (state) => {
    const params = getURLParams(state);
    this.replaceURLParams(params);
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.loadTransactionList();
    this.store.subscribe(this.updateURLFromState);
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
