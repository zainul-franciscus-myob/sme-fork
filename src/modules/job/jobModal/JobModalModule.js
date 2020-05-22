/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';

import { getIsOpen, getIsSubmitting } from './JobModalSelectors';
import JobModalView from './components/JobModalView';
import Store from '../../../store/Store';
import createJobModalDispatcher from './createJobModalDispatcher';
import createJobModalIntegrator from './createJobModalIntegrator';
import jobModalReducer from './jobModalReducer';

export default class JobModalModule {
  constructor({ integration }) {
    this.integration = integration;

    this.store = new Store(jobModalReducer);
    this.integrator = createJobModalIntegrator(
      this.store,
      this.integration,
    );
    this.dispatcher = createJobModalDispatcher(this.store);
  }

  isOpened = () => getIsOpen(this.store.getState());

  isSubmitting = () => getIsSubmitting(this.store.getState());

  close = () => {
    this.dispatcher.resetState();
  }

  save = () => {
    if (this.isSubmitting()) return;

    const onSuccess = (message) => {
      this.onSaveSuccess(message);
      this.dispatcher.setSubmittingState(false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.dispatcher.setSubmittingState(true);
    this.integrator.createJob(onSuccess, onFailure);
  };

  loadNewJob = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadNewJob(payload);
    };

    const onFailure = ({ message }) => {
      this.close();
      this.onLoadFailure(message);
    };

    this.dispatcher.setLoadingState(true);
    this.integrator.loadNewJob(onSuccess, onFailure);
  };

  render = () => (
    <Provider store={this.store}>
      <JobModalView
        onSaveButtonClick={this.save}
        onJobChange={this.dispatcher.updateJobDetails}
        onDismissAlert={this.dispatcher.dismissAlert}
        onCloseModal={this.close}
      />
    </Provider>
  );

  run = ({ context, onSaveSuccess, onLoadFailure }) => {
    this.onSaveSuccess = onSaveSuccess;
    this.onLoadFailure = onLoadFailure;
    this.dispatcher.setInitialState(context);
    this.loadNewJob();
  };

  resetState = () => this.dispatcher.resetState();
}
