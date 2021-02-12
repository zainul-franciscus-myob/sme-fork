import React from 'react';

import { getSelectedPayrollYear } from './EiSubmissionsSelector';
import EiSubmissionsView from './components/EiSubmissionsView';
import LoadingState from '../../../../../components/PageView/LoadingState';
import createEiSubmissionsDispatcher from './createEiSubmissionsDispatcher';
import createEiSubmissionsIntegrator from './createEiSubmissionsIntegrator';

export default class EiSubmissionsModule {
  constructor({ store, integration }) {
    this.store = store;
    this.dispatcher = createEiSubmissionsDispatcher(this.store);
    this.integrator = createEiSubmissionsIntegrator(this.store, integration);
  }

  loadFilteredEiSubmissions = () => {
    this.dispatcher.setTableLoadingState(true);
    this.dispatcher.clearEiSubmissionsList();

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setFilteredEiSubmissions(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadFilteredEiSubmissions({
      onSuccess,
      onFailure,
    });
  };

  loadInitialEiSubmissionsAndPayrollYearOptions = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setInitialEiSubmissionDetails(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialEiSubmissionsAndPayrollOptions({
      onSuccess,
      onFailure,
    });
  };

  updatePayrollYearAndLoadEiSubmissions = (selectedPayrollYear) => {
    this.dispatcher.setSelectedPayrollYear(selectedPayrollYear);
    this.loadFilteredEiSubmissions();
  };

  getView = () => (
    <EiSubmissionsView
      onPayrollYearChange={this.updatePayrollYearAndLoadEiSubmissions}
      onRefreshClick={this.loadFilteredEiSubmissions}
    />
  );

  run = () => {
    const isMissingSelectedPayrollYear = !getSelectedPayrollYear(
      this.store.getState()
    );
    if (isMissingSelectedPayrollYear) {
      this.loadInitialEiSubmissionsAndPayrollYearOptions();
    } else {
      this.loadFilteredEiSubmissions();
    }
  };
}
