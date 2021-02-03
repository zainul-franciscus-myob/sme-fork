import { Provider } from 'react-redux';
import React from 'react';

import JobMakerView from './components/JobMakerView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createJobMakerDispatcher from './createJobMakerDispatcher';
import createJobMakerIntegrator from './createJobMakerIntegrator';
import jobMakerReducer from './JobMakerReducer';

export default class JobMakerModule {
  constructor({ integration, context, setAlert, pushMessage, featureToggles }) {
    this.store = new Store(jobMakerReducer);

    this.dispatcher = createJobMakerDispatcher(this.store);
    this.integrator = createJobMakerIntegrator(this.store, integration);
    this.setAlert = setAlert;
    this.pushMessage = pushMessage;
    this.featureToggles = featureToggles;
    this.dispatcher.setInitialState(context);
  }

  loadInitialEmployeesAndHeaderDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setInitialJobMaker(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialEmployeesAndHeaderDetails({
      onSuccess,
      onFailure,
    });
  };

  run = () => {
    this.loadInitialEmployeesAndHeaderDetails();
  };

  getView() {
    return (
      <Provider store={this.store}>
        <JobMakerView featureToggles={this.featureToggles} />
      </Provider>
    );
  }
}
