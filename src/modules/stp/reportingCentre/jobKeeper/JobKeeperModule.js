import { Provider } from 'react-redux';
import React from 'react';

import JobKeeperView from './components/JobKeeperView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createJobKeeperDispatcher from './createJobKeeperDispatcher';
import createJobKeeperIntegrator from './createJobKeeperIntegrator';
import jobKeeperReducer from './JobKeeperReducer';

export default class JobKeeperModule {
  constructor({
    integration,
    // context,
    // setAlert,
  }) {
    this.store = new Store(jobKeeperReducer);
    this.integration = integration;
    this.dispatcher = createJobKeeperDispatcher(this.store);
    this.integrator = createJobKeeperIntegrator(this.store, integration);
  }

  loadInitialEmployeesAndHeaderDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setInitialJobKeeper(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialEmployeesAndHeaderDetails({ onSuccess, onFailure });
  };

  run = () => {
    this.loadInitialEmployeesAndHeaderDetails();
  };

  getView() {
    return (
      <Provider store={this.store}>
        <JobKeeperView />
      </Provider>);
  }
}
