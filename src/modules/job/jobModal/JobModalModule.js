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
    this.onSaveSuccess = () => {};
    this.onLoadFailure = () => {};

    this.store = new Store(jobModalReducer);
    this.integrator = createJobModalIntegrator(this.store, this.integration);
    this.dispatcher = createJobModalDispatcher(this.store);
  }

  isOpened = () => getIsOpen(this.store.getState());

  isSubmitting = () => getIsSubmitting(this.store.getState());

  loadJobModal = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadJobModal(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.resetState();
      this.onLoadFailure(message);
    };

    this.integrator.loadJobModal({ onSuccess, onFailure });
  };

  save = () => {
    if (this.isSubmitting()) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.onSaveSuccess(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.createJobModal({ onSuccess, onFailure });
  };

  resetState = () => this.dispatcher.resetState();

  run = ({
    context,
    onLoadFailure = () => {},
    onSaveSuccess = () => {},
  }) => {
    this.dispatcher.setInitialState(context);
    this.onLoadFailure = onLoadFailure;
    this.onSaveSuccess = onSaveSuccess;
    this.loadJobModal();
  }

  render() {
    return (
      <Provider store={this.store}>
        <JobModalView
          onClose={this.resetState}
          onDismissAlert={this.dispatcher.dismissAlert}
          onDetailChange={this.dispatcher.setJobModalDetails}
          onSaveButtonClick={this.save}
          onCancelButtonClick={this.dispatcher.resetState}
        />
      </Provider>
    );
  }
}
