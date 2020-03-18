import React from 'react';

import { REPLACE_FILTER_OPTIONS } from './CreditsAndDebitsListIntents';
import {
  getFilterOptions,
  getIsActive,
  getIsLoaded,
  getNewSortOrder,
  getSettings,
  getURLParams,
} from './creditsAndDebitsListSelectors';
import { getIsSwitchingTab } from '../transactionListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import { tabItemIds } from '../tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import TransactionListView from './components/CreditsAndDebitsListView';
import createCreditsAndDebitsListDispatcher from './createCreditsAndDebitsListDispatcher';
import createCreditsAndDebitsListIntegrator from './createCreditsAndDebitsListIntegrator';

export default class CreditsAndDebitsModule {
  constructor({
    integration, store, setAlert, setLastLoadingTab, replaceURLParams,
  }) {
    this.store = store;
    this.setAlert = setAlert;
    this.setLastLoadingTab = setLastLoadingTab;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createCreditsAndDebitsListDispatcher(store);
    this.integrator = createCreditsAndDebitsListIntegrator(store, integration);
  }

  getView({ pageHead, alert, subHead }) {
    const state = this.store.getState();
    if (getIsSwitchingTab(state)) {
      if (!getIsLoaded(state)) {
        this.loadCreditsAndDebitsList();
      } else {
        this.filterCreditsAndDebitsList();
      }
    }

    return (
      <TransactionListView
        onSort={this.sortCreditsAndDebitsList}
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.filterCreditsAndDebitsList}
        onPeriodChange={this.updatePeriodDateRange}
        onLoadMoreButtonClick={this.loadNextPage}
        pageHead={pageHead}
        subHead={subHead}
        alert={alert}
      />
    );
  }

  getFilterOptions = () => {
    const state = this.store.getState();
    return getFilterOptions(state);
  }

  replaceFilterOptions = (filterOptions) => {
    const intent = REPLACE_FILTER_OPTIONS;
    this.store.dispatch({ intent, filterOptions });
  }

  updatePeriodDateRange = ({ period, dateFrom, dateTo }) => {
    this.dispatcher.updatePeriodDateRange({
      period, dateFrom, dateTo,
    });
  }

  loadCreditsAndDebitsList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadCreditsAndDebitsList(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.setLastLoadingTab();
    this.integrator.loadCreditsAndDebitsList({
      onSuccess,
      onFailure,
    });
  }

  loadNextPage = () => {
    this.dispatcher.setNextPageLoadingState(true);
    const onSuccess = (response) => {
      this.dispatcher.loadNextPage(response);
      this.dispatcher.setNextPageLoadingState(false);
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    this.integrator.loadNextPage({
      onSuccess,
      onFailure,
    });
  }

  filterCreditsAndDebitsList = () => {
    this.dispatcher.setTableLoadingState(true);
    const onSuccess = ({ entries, sortOrder, pagination }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterCreditsAndDebitsList(false, entries, sortOrder, pagination);
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    this.setLastLoadingTab();
    this.integrator.filterCreditsAndDebitsList({
      onSuccess,
      onFailure,
    });
  }

  sortCreditsAndDebitsList = (orderBy) => {
    const state = this.store.getState();
    this.dispatcher.setTableLoadingState(true);

    const newSortOrder = getNewSortOrder(state, orderBy);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);


    const onSuccess = ({ entries, sortOrder, pagination }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterCreditsAndDebitsList(true, entries, sortOrder, pagination);
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    this.integrator.sortCreditsAndDebitsList({
      onSuccess,
      onFailure,
      orderBy,
      newSortOrder,
    });
  }

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions(key, value);
  }

  updateURLFromState = (state) => {
    const isActive = getIsActive(state);
    if (isActive) {
      const params = getURLParams(state);
      this.replaceURLParams(params);
    }
  }

  setInitialState = (context, settings) => {
    this.dispatcher.setInitialState(context, settings);
  }

  run(context) {
    const settings = loadSettings(context.businessId, tabItemIds.debitsAndCredits);
    this.setInitialState(context, settings);
    this.store.subscribe((state) => {
      this.updateURLFromState(state);
      saveSettings(context.businessId, tabItemIds.debitsAndCredits, getSettings(state));
    });
  }
}
