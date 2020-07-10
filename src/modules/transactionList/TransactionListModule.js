import { Provider } from 'react-redux';
import React from 'react';

import { DEBITS_AND_CREDITS, JOURNAL_TRANSACTIONS } from './getDefaultState';
import {
  SUCCESSFULLY_DELETED_APPLY_TO_SALE,
  SUCCESSFULLY_DELETED_BILL_PAYMENT,
  SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION,
  SUCCESSFULLY_DELETED_GENERAL_JOURNAL,
  SUCCESSFULLY_DELETED_INVOICE_PAYMENT,
  SUCCESSFULLY_DELETED_PAY_REFUND,
  SUCCESSFULLY_DELETED_PURCHASE_RETURN,
  SUCCESSFULLY_DELETED_RECEIVE_MONEY,
  SUCCESSFULLY_DELETED_RECEIVE_REFUND,
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_DELETED_TRANSFER_MONEY,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
  SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_RECEIVE_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_TRANSFER_MONEY,
} from '../../common/types/MessageTypes';
import { SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT } from '../electronicPayments/electronicPaymentMesssageTypes';
import {
  getActiveTab,
  getIsSwitchingTab,
  getNewSortOrder,
  getSettings,
  getURLParams,
} from './selectors/transactionListSelectors';
import { getIsCreditsAndDebitsLoaded } from './selectors/creditsAndDebitsSelectors';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import LoadingState from '../../components/PageView/LoadingState';
import RouteName from '../../router/RouteName';
import Store from '../../store/Store';
import TransactionListView from './components/TransactionListView';
import createTransactionListDispatcher from './createTransactionListDispatcher';
import createTransactionListIntegrator from './createTransactionListIntegrator';
import debounce from '../../common/debounce/debounce';
import transactionListReducer from './transactionListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_GENERAL_JOURNAL,
  SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
  SUCCESSFULLY_DELETED_RECEIVE_MONEY,
  SUCCESSFULLY_SAVED_RECEIVE_MONEY,
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_TRANSFER_MONEY,
  SUCCESSFULLY_DELETED_TRANSFER_MONEY,
  SUCCESSFULLY_DELETED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
  SUCCESSFULLY_DELETED_BILL_PAYMENT,
  SUCCESSFULLY_DELETED_RECEIVE_REFUND,
  SUCCESSFULLY_DELETED_PURCHASE_RETURN,
  SUCCESSFULLY_DELETED_PAY_REFUND,
  SUCCESSFULLY_DELETED_APPLY_TO_SALE,
  SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT,
  SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION,
];

export default class TransactionListModule {
  constructor({ integration, setRootView, popMessages, replaceURLParams }) {
    this.integration = integration;
    this.store = new Store(transactionListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createTransactionListDispatcher(this.store);
    this.integrator = createTransactionListIntegrator(
      this.store,
      this.integration
    );
  }

  /* Credits and debits */
  loadCreditsAndDebitsList = () => {
    this.setLastLoadingTab(DEBITS_AND_CREDITS);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(
        DEBITS_AND_CREDITS,
        LoadingState.LOADING_SUCCESS
      );
      this.dispatcher.loadCreditsAndDebitsList(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(
        DEBITS_AND_CREDITS,
        LoadingState.LOADING_FAIL
      );
    };

    this.integrator.loadCreditsAndDebitsList({
      onSuccess,
      onFailure,
    });
  };

  loadCreditsAndDebitsNextPage = () => {
    this.dispatcher.setNextPageLoadingState(DEBITS_AND_CREDITS, true);

    const onSuccess = (response) => {
      this.dispatcher.loadCreditsAndDebitsNextPage(response);
      this.dispatcher.setNextPageLoadingState(DEBITS_AND_CREDITS, false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(DEBITS_AND_CREDITS, false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadCreditsAndDebitsNextPage({
      onSuccess,
      onFailure,
    });
  };

  sortAndFilterCreditsAndDebitsList = () => {
    this.dispatcher.setTableLoadingState(DEBITS_AND_CREDITS, true);
    this.setLastLoadingTab(DEBITS_AND_CREDITS);

    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.setTableLoadingState(DEBITS_AND_CREDITS, false);
      this.dispatcher.sortAndFilterCreditsAndDebitsList({
        entries,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(DEBITS_AND_CREDITS, false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterCreditsAndDebitsList({ onSuccess, onFailure });
  };

  debouncedSortAndFilterCreditsAndDebitsList = debounce(
    this.sortAndFilterCreditsAndDebitsList
  );

  /* Journal transactions */
  sortAndFilterTransactionList = () => {
    this.dispatcher.setTableLoadingState(JOURNAL_TRANSACTIONS, true);
    this.setLastLoadingTab(JOURNAL_TRANSACTIONS);

    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.setTableLoadingState(JOURNAL_TRANSACTIONS, false);
      this.dispatcher.sortAndFilterJournalTransactions({
        entries,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(JOURNAL_TRANSACTIONS, false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterTransactionList({ onSuccess, onFailure });
  };

  loadTransactionListNextPage = () => {
    this.dispatcher.setNextPageLoadingState(JOURNAL_TRANSACTIONS, true);

    const onSuccess = (response) => {
      this.dispatcher.setNextPageLoadingState(JOURNAL_TRANSACTIONS, false);
      this.dispatcher.loadTransactionListNextPage(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(JOURNAL_TRANSACTIONS, false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadTransactionListNextPage({ onSuccess, onFailure });
  };

  debouncedSortAndFilterTransactionList = debounce(
    this.sortAndFilterTransactionList
  );

  /* Common */
  sort = (orderBy) => {
    const state = this.store.getState();
    const activeTab = getActiveTab(state);
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    if (activeTab === DEBITS_AND_CREDITS) {
      this.sortAndFilterCreditsAndDebitsList();
    } else {
      this.sortAndFilterTransactionList();
    }
  };

  sortAndFilter = (key, debouncedFunc, func) => {
    if (key === 'keywords') {
      debouncedFunc();
    } else {
      func();
    }
  };

  updateFilterOptions = ({ key, value }) => {
    const state = this.store.getState();
    const activeTab = getActiveTab(state);
    this.dispatcher.updateFilterOptions(key, value);

    if (key === 'sourceJournal') {
      this.updateURLFromState();
    }

    if (activeTab === DEBITS_AND_CREDITS) {
      this.sortAndFilter(
        key,
        this.debouncedSortAndFilterCreditsAndDebitsList,
        this.sortAndFilterCreditsAndDebitsList
      );
    } else {
      this.sortAndFilter(
        key,
        this.debouncedSortAndFilterTransactionList,
        this.sortAndFilterTransactionList
      );
    }
  };

  updatePeriodDateRange = ({ period, dateFrom, dateTo }) => {
    const state = this.store.getState();
    const activeTab = getActiveTab(state);
    this.dispatcher.updatePeriodDateRange({
      period,
      dateFrom,
      dateTo,
    });
    if (activeTab === DEBITS_AND_CREDITS) {
      this.sortAndFilterCreditsAndDebitsList();
    } else {
      this.sortAndFilterTransactionList();
    }
  };

  loadNextPage = () => {
    const state = this.store.getState();
    const activeTab = getActiveTab(state);

    if (activeTab === DEBITS_AND_CREDITS) {
      this.loadCreditsAndDebitsNextPage();
    } else {
      this.loadTransactionListNextPage();
    }
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

  setAlert = ({ message, type }) => this.dispatcher.setAlert({ message, type });

  dismissAlert = () => this.dispatcher.dismissAlert();

  setTab = (tabId) => {
    this.dispatcher.setTab(tabId);
    this.setView(tabId);
  };

  loadCreditsAndDebitsTab = () => {
    const state = this.store.getState();
    const isSwitchingTab = getIsSwitchingTab(state);

    if (isSwitchingTab) {
      if (!getIsCreditsAndDebitsLoaded(state)) {
        this.loadCreditsAndDebitsList();
      } else {
        this.sortAndFilterCreditsAndDebitsList();
      }
    }
  };

  loadTransactionListTab = () => {
    const state = this.store.getState();
    const isSwitchingTab = getIsSwitchingTab(state);

    if (isSwitchingTab) {
      this.sortAndFilterTransactionList();
    }
  };

  setView = (tabId) => {
    if (tabId === DEBITS_AND_CREDITS) {
      this.loadCreditsAndDebitsTab();
    } else {
      this.loadTransactionListTab();
    }
  };

  setLastLoadingTab = (tabId) => this.dispatcher.setLastLoadingTab(tabId);

  setInitialState = (context, settings) =>
    this.dispatcher.setInitialState(context, settings);

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <TransactionListView
          onTabSelected={this.setTab}
          onDismissAlert={this.dismissAlert}
          pageHeadTitle="Find transactions"
          onUpdateFilters={this.updateFilterOptions}
          onPeriodChange={this.updatePeriodDateRange}
          onSort={this.sort}
          onLoadMoreButtonClick={this.loadNextPage}
        />
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  run(context) {
    const settings = loadSettings(
      context.businessId,
      RouteName.TRANSACTION_LIST
    );
    this.setInitialState(context, settings);
    this.store.subscribe((state) => {
      saveSettings(
        context.businessId,
        RouteName.TRANSACTION_LIST,
        getSettings(state)
      );
    });
    this.render();
    this.readMessages();
    this.loadCreditsAndDebitsTab();
  }

  resetState() {
    this.dispatcher.resetState();
  }

  updateURLFromState = () => {
    const state = this.store.getState();
    const params = getURLParams(state);
    this.replaceURLParams(params);
  };
}
