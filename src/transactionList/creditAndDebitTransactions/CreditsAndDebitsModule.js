import React from 'react';

import {
  getIsActive,
  getIsLoaded,
  getNewSortOrder,
  getSettings,
  getURLParams,
} from './creditsAndDebitsListSelectors';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import { tabItemIds } from '../tabItems';
import TransactionListView from './components/CreditsAndDebitsListView';
import createCreditsAndDebitsListDispatcher from './createCreditsAndDebitsListDispatcher';
import createCreditsAndDebitsListIntegrator from './createCreditsAndDebitsListIntegrator';

export default class CreditsAndDebitsModule {
  constructor({
    integration, store, setAlert, replaceURLParams,
  }) {
    this.store = store;
    this.setAlert = setAlert;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createCreditsAndDebitsListDispatcher(store);
    this.integrator = createCreditsAndDebitsListIntegrator(store, integration);
  }

  getView({ pageHead, alert, subHead }) {
    if (!getIsLoaded(this.store.getState())) {
      this.loadCreditsAndDebitsList();
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

  updatePeriodDateRange = ({ period, dateFrom, dateTo }) => {
    this.dispatcher.updatePeriodDateRange({
      period, dateFrom, dateTo,
    });
  }

  loadCreditsAndDebitsList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadCreditsAndDebitsList(response);
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
    };

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
