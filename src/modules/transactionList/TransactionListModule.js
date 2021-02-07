import { Provider } from 'react-redux';
import React from 'react';

import {
  DEBITS_AND_CREDITS,
  FIND_AND_RECODE,
  JOURNAL_TRANSACTIONS,
} from './getDefaultState';
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
  SUCCESSFULLY_DELETED_SUPPLIER_PAYMENT,
  SUCCESSFULLY_DELETED_TRANSFER_MONEY,
  SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
  SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
  SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_RECEIVE_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SUPPLIER_PAYMENT,
  SUCCESSFULLY_SAVED_TRANSFER_MONEY,
} from '../../common/types/MessageTypes';
import { SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT } from '../electronicPayments/electronicPaymentMesssageTypes';
import {
  getActiveTab,
  getFindAndRecodeContext,
  getIsSwitchingTab,
  getNewSortOrder,
  getRedirectUrl,
  getSettings,
  getSwitchToTab,
  getURLParams,
} from './selectors/transactionListSelectors';
import { getIsCreditsAndDebitsLoaded } from './selectors/creditsAndDebitsSelectors';
import { isToggleOn } from '../../splitToggle';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import { mapTab } from './tabItems';
import FeatureToggles from '../../FeatureToggles';
import FindAndRecodeModule from './findAndRecode/FindAndRecodeModule';
import LoadingState from '../../components/PageView/LoadingState';
import ModalType from './findAndRecode/types/ModalType';
import RouteName from '../../router/RouteName';
import Store from '../../store/Store';
import TransactionListView from './components/TransactionListView';
import createTransactionListDispatcher from './createTransactionListDispatcher';
import createTransactionListIntegrator from './createTransactionListIntegrator';
import debounce from '../../common/debounce/debounce';
import transactionListReducer from './transactionListReducer';

const messageTypes = [
  SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
  SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
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
  SUCCESSFULLY_SAVED_SUPPLIER_PAYMENT,
  SUCCESSFULLY_DELETED_BILL_PAYMENT,
  SUCCESSFULLY_DELETED_SUPPLIER_PAYMENT,
  SUCCESSFULLY_DELETED_RECEIVE_REFUND,
  SUCCESSFULLY_DELETED_PURCHASE_RETURN,
  SUCCESSFULLY_DELETED_PAY_REFUND,
  SUCCESSFULLY_DELETED_APPLY_TO_SALE,
  SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT,
  SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION,
];

export default class TransactionListModule {
  constructor({
    integration,
    setRootView,
    popMessages,
    replaceURLParams,
    navigateTo,
  }) {
    this.store = new Store(transactionListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createTransactionListDispatcher(this.store);
    this.integrator = createTransactionListIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
    this.findAndRecodeModule = new FindAndRecodeModule({
      integration,
      setAlert: this.setAlert,
    });
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

  /* Common */
  sort = (orderBy) => {
    const state = this.store.getState();
    const activeTab = getActiveTab(state);
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    mapTab(
      activeTab,
      this.sortAndFilterTransactionList,
      this.sortAndFilterCreditsAndDebitsList
    );
  };

  sortAndFilter = (key, func) => {
    if (key === 'keywords') {
      debounce(func)();
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

    mapTab(
      activeTab,
      () => this.sortAndFilter(key, this.sortAndFilterTransactionList),
      () => this.sortAndFilter(key, this.sortAndFilterCreditsAndDebitsList)
    );
  };

  resetFilterOptions = () => {
    const state = this.store.getState();
    const activeTab = getActiveTab(state);
    this.dispatcher.resetFilterOptions();

    if (activeTab === DEBITS_AND_CREDITS) {
      this.sortAndFilterCreditsAndDebitsList();
    } else {
      this.sortAndFilterTransactionList();
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

    mapTab(
      activeTab,
      this.loadTransactionListNextPage,
      this.loadCreditsAndDebitsNextPage
    );
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
    const isRecodeFinished = this.findAndRecodeModule.getIsRecodeFinished();

    if (isRecodeFinished) {
      this.dispatcher.setTab(tabId);
      this.setView(tabId);
    } else {
      this.dispatcher.setSwitchToTab(tabId);
      this.dispatcher.openModal({ modalType: ModalType.TerminateModal });
    }
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

  loadFindAndRecodeTab = () => {
    const state = this.store.getState();
    this.setLastLoadingTab(FIND_AND_RECODE);
    this.findAndRecodeModule.run(getFindAndRecodeContext(state));
  };

  discardAndRedirect = () => {
    this.findAndRecodeModule.stopRecode();
    this.dispatcher.closeModal();
    const url = getRedirectUrl(this.store.getState());

    if (url) {
      this.navigateTo(url);
    } else {
      const state = this.store.getState();
      const switchToTab = getSwitchToTab(state);
      this.dispatcher.setTab(switchToTab);
      this.setView(switchToTab);
    }
  };

  closeModal = () => {
    this.dispatcher.closeModal();
  };

  handlePageTransition = (url) => {
    if (this.findAndRecodeModule.getIsRecodeFinished()) {
      this.navigateTo(url);
    } else {
      this.dispatcher.setRedirectUrl(url);
      this.dispatcher.openModal({ modalType: ModalType.TerminateModal });
    }
  };

  setView = (tabId) => {
    mapTab(
      tabId,
      this.loadTransactionListTab,
      this.loadCreditsAndDebitsTab,
      this.loadFindAndRecodeTab
    );
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
          onResetFilters={this.resetFilterOptions}
          onPeriodChange={this.updatePeriodDateRange}
          onSort={this.sort}
          onLoadMoreButtonClick={this.loadNextPage}
          onRenderFindAndRecode={this.findAndRecodeModule.render}
          discardAndRedirect={this.discardAndRedirect}
          closeModal={this.closeModal}
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

    const isFindAndRecodeEnabled = isToggleOn(FeatureToggles.FindAndRecode);
    this.setInitialState(
      {
        ...context,
        isFindAndRecodeEnabled,
      },
      settings
    );
    this.store.subscribe((state) => {
      saveSettings(
        context.businessId,
        RouteName.TRANSACTION_LIST,
        getSettings(state)
      );
    });
    this.render();
    this.readMessages();

    if (settings && settings.activeTab) {
      this.setTab(settings.activeTab);
    } else {
      this.loadCreditsAndDebitsTab();
    }
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
