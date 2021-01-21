import { Provider } from 'react-redux';
import React from 'react';

import JobMakerView from './components/JobMakerView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createJobMakerDispatcher from './createJobMakerDispatcher';
import jobMakerReducer from './JobMakerReducer';

export default class JobMakerModule {
  constructor({ context, setAlert, pushMessage, featureToggles }) {
    this.store = new Store(jobMakerReducer);

    this.dispatcher = createJobMakerDispatcher(this.store);
    this.setAlert = setAlert;
    this.pushMessage = pushMessage;
    this.featureToggles = featureToggles;
    this.dispatcher.setInitialState(context);
  }

  run = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
  };

  getView() {
    return (
      <Provider store={this.store}>
        <JobMakerView featureToggles={this.featureToggles} />
      </Provider>
    );
  }
}
