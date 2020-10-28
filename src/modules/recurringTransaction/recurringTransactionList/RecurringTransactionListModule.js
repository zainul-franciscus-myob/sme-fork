import { Provider } from 'react-redux';
import React from 'react';

import { getUrlParams } from './recurringTransactionListSelectors';
import CreateRecurringTransactionListDispatcher from './CreateRecurringTransactionListDispatcher';
import CreateRecurringTransactionListIntegrator from './CreateRecurringTransactionListIntegrator';
import FeatureToggles from '../../../FeatureToggles';
import RecurringTransactionListView from './components/RecurringTransactionListView';
import Store from '../../../store/Store';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import recurringTransactionListReducer from './recurringTransactionListReducer';

export default class RecurringTransactionModule {
  constructor({
    integration,
    setRootView,
    replaceURLParams,
    featureToggles,
    isToggleOn,
  }) {
    this.integration = integration;
    this.store = new Store(recurringTransactionListReducer);
    this.setRootView = setRootView;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = CreateRecurringTransactionListDispatcher(this.store);
    this.integrator = CreateRecurringTransactionListIntegrator(
      this.store,
      integration
    );
    this.isToggleOn = isToggleOn;
    this.featureToggles = featureToggles;
  }

  render = () => {
    const recurringTransactionListView = (
      <RecurringTransactionListView
        onUpdateFilter={this.updateFilterOptions}
        onResetFilter={this.resetFilterOptions}
        onSort={this.updateSort}
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

  run(context) {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: this.isToggleOn(FeatureToggles.RecurringTransactions),
    });

    this.dispatcher.setInitialState({
      isRecurringTransactionEnabled,
      ...context,
    });

    this.render();
    this.loadRecurringTransactionList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };
}
