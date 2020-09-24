import { Provider } from 'react-redux';
import React from 'react';

import { getJobModalContext } from './JobComboboxSelectors';
import AlertType from '../../../common/types/AlertType';
import JobComboboxView from './components/JobComboboxView';
import JobModalModule from '../jobModal/JobModalModule';
import Store from '../../../store/Store';
import createJobComboboxDispatcher from './createJobComboboxDispatcher';
import createJobComboboxIntegrator from './createJobComboboxIntegrator';
import jobComboboxReducer from './jobComboboxReducer';

export default class JobComboboxModule {
  constructor({ integration, onAlert = () => {} }) {
    this.onChange = () => {};
    this.onAlert = onAlert;

    this.store = new Store(jobComboboxReducer);
    this.integrator = createJobComboboxIntegrator({
      store: this.store,
      integration,
    });
    this.dispatcher = createJobComboboxDispatcher({ store: this.store });

    this.jobModalModule = new JobModalModule({ integration });
  }

  resetState = () => {
    this.jobModalModule.resetState();
    this.dispatcher.resetState();
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.loadJobOptions();
  };

  load = (jobIds) => {
    this.loadJobOptionsByIds(jobIds);
  };

  loadJobOptions = () => {
    this.dispatcher.setJobOptionsLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setJobOptionsLoadingState(false);
      this.dispatcher.loadJobOptions(payload);
    };

    const onFailure = () => {
      this.dispatcher.setJobOptionsLoadingState(false);
    };

    this.integrator.loadJobOptions({ onSuccess, onFailure });
  };

  loadJobOptionsByIds = (ids) => {
    this.dispatcher.setJobLoadingState(true);

    const onSuccess = (jobOptions) => {
      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.loadJobOptionsByIds(jobOptions);
    };

    const onFailure = () => {
      this.dispatcher.setJobLoadingState(false);
    };

    this.integrator.loadJobOptionsByIds({ ids, onSuccess, onFailure });
  };

  searchJob = ({
    keywords,
    onSuccess: onSearchJobSuccess,
    onFailure: onSearchJobFailure,
  }) => {
    const onSuccess = ({ jobOptions }) => {
      onSearchJobSuccess(jobOptions);
    };

    const onFailure = () => {
      onSearchJobFailure();
    };

    this.integrator.searchJob({ keywords, onSuccess, onFailure });
  };

  loadJobOptionById = ({ jobId, onSuccess: next = () => {} }) => {
    this.dispatcher.setJobLoadingState(true);

    const onSuccess = (payload) => {
      const newJobOption = payload[0];

      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.loadJobOptionById(newJobOption);

      next(newJobOption);
    };

    const onFailure = () => {
      this.dispatcher.setJobLoadingState(false);
    };

    this.integrator.loadJobOptionById({ jobId, onSuccess, onFailure });
  };

  loadJobAfterCreate = ({ id, message }, onChange) => {
    this.jobModalModule.resetState();
    this.onAlert({ type: AlertType.SUCCESS, message });

    this.loadJobOptionById({ jobId: id, onSuccess: onChange });
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const context = getJobModalContext(state);

    this.jobModalModule.run({
      context,
      onLoadFailure: (message) =>
        this.onAlert({ type: AlertType.DANGER, message }),
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
    });
  };

  isCreateJobModalOpened = () => {
    this.jobModalModule.isOpened();
  };

  createJob = () => {
    this.jobModalModule.save();
  };

  handleOnChange = (job, onChange) => {
    if (job) {
      this.dispatcher.updateJobOptions(job);
    }
    onChange(job);
  };

  render({ onChange = () => {}, ...otherProps }) {
    this.onChange = onChange;

    this.jobModal = this.jobModalModule.render();

    return (
      <Provider store={this.store}>
        <JobComboboxView
          jobModal={this.jobModal}
          onLoadMore={this.loadJobOptions}
          onSearch={this.searchJob}
          onAddNew={() => this.openJobModal(onChange)}
          onChange={(job) => this.handleOnChange(job, onChange)}
          {...otherProps}
        />
      </Provider>
    );
  }
}
