import { Provider } from 'react-redux';
import React from 'react';

import { getJobCreateLink } from './jobListSelector';
import JobListView from './components/JobListView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createJobListDispatcher from './createJobListDispatcher';
import createJobListIntegrator from './createJobListIntegrator';
import jobListReducer from './jobListReducer';

export default class JobListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.store = new Store(jobListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.dispatcher = createJobListDispatcher(this.store);
    this.integrator = createJobListIntegrator(this.store, integration);
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <JobListView
          onDismissAlert={this.dispatcher.dismissAlert}
          onUpdateFilters={this.dispatcher.updateFilterOptions}
          onAddJobButtonClick={this.redirectToAddJob}
          onApplyFilter={this.filterJobList}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  loadJobList = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadJobList(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadJobList({ onSuccess, onFailure });
  }

  redirectToAddJob = () => {
    const state = this.store.getState();
    const url = getJobCreateLink(state);

    window.location.href = url;
  }

  filterJobList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.filterJobList({ entries });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.filterJobList({ onSuccess, onFailure });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.readMessages();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadJobList();
  }

  resetState() {
    this.dispatcher.resetState();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
