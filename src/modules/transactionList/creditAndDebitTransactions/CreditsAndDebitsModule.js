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
import debounce from '../../../common/debounce/debounce';

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
        this.sortAndFilterCreditsAndDebitsList();
      }
    }

    return (
      <TransactionListView
        onSort={this.sortCreditsAndDebitsList}
        onUpdateFilters={this.updateFilterOptions}
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
    this.sortAndFilterCreditsAndDebitsList();
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

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadNextPage({
      onSuccess,
      onFailure,
    });
  }

  sortCreditsAndDebitsList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterCreditsAndDebitsList();
  }

  sortAndFilterCreditsAndDebitsList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterCreditsAndDebitsList({ entries, pagination });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterCreditsAndDebitsList({ onSuccess, onFailure });
  };

  debouncedSortAndFilterList = debounce(this.sortAndFilterCreditsAndDebitsList);

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions(key, value);

    if (key === 'keywords') {
      this.debouncedSortAndFilterList();
    } else {
      this.sortAndFilterCreditsAndDebitsList();
    }
  };

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
