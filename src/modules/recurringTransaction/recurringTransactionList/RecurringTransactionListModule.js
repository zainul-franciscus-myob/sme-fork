import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
  SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
} from '../../../common/types/MessageTypes';
import {
  getCreateRecurringTransactionUrl,
  getUrlParams,
} from './recurringTransactionListSelectors';
import { isToggleOn } from '../../../splitToggle';
import CreateRecurringTransactionListDispatcher from './CreateRecurringTransactionListDispatcher';
import CreateRecurringTransactionListIntegrator from './CreateRecurringTransactionListIntegrator';
import FeatureToggles from '../../../FeatureToggles';
import RecurringTransactionListView from './components/RecurringTransactionListView';
import Store from '../../../store/Store';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import recurringTransactionListReducer from './recurringTransactionListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
  SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
];

export default class RecurringTransactionModule {
  constructor({
    integration,
    setRootView,
    popMessages,
    replaceURLParams,
    navigateTo,
    featureToggles,
  }) {
    this.integration = integration;
    this.store = new Store(recurringTransactionListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = CreateRecurringTransactionListDispatcher(this.store);
    this.integrator = CreateRecurringTransactionListIntegrator(
      this.store,
      integration
    );
    this.navigateTo = navigateTo;
    this.featureToggles = featureToggles;
  }

  render = () => {
    const recurringTransactionListView = (
      <RecurringTransactionListView
        onUpdateFilter={this.updateFilterOptions}
        onResetFilter={this.resetFilterOptions}
        onSort={this.updateSort}
        onCreateButtonClick={this.redirectToCreateRecurringTransaction}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{recurringTransactionListView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  loadRecurringTransactionList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadRecurringTransactionList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.dispatcher.setLoadingState(true);
    this.integrator.loadRecurringTransactionList({ onSuccess, onFailure });
  };

  updateSort = (orderBy) => {
    this.dispatcher.setSortOrder(orderBy);
    this.sortAndFilterRecurringTransactionList();
  };

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions({ key, value });
    this.sortAndFilterRecurringTransactionList();

    if (key === 'type') {
      this.updateUrlWithType();
    }
  };

  updateUrlWithType = () => {
    const state = this.store.getState();
    this.replaceURLParams(getUrlParams(state));
  };

  resetFilterOptions = () => {
    this.dispatcher.resetFilterOptions();
    this.sortAndFilterRecurringTransactionList();
  };

  dismissAlert = () => {
    this.dispatcher.dismissAlert();
  };

  sortAndFilterRecurringTransactionList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.filterRecurringTransactionList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.dispatcher.setTableLoadingState(true);
    this.integrator.sortAndFilterRecurringTransactionList({
      onSuccess,
      onFailure,
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  redirectToCreateRecurringTransaction = (transactionType) => {
    const state = this.store.getState();
    const url = getCreateRecurringTransactionUrl(state, transactionType);

    this.navigateTo(url);
  };

  run(context) {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.RecurringTransactions),
    });

    this.dispatcher.setInitialState({
      isRecurringTransactionEnabled,
      ...context,
    });

    this.render();
    this.readMessages();

    this.loadRecurringTransactionList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };
}
