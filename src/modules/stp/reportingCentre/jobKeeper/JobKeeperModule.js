import { Provider } from 'react-redux';
import React from 'react';

import JobKeeperView from './components/JobKeeperView';
import Store from '../../../../store/Store';
import jobKeeperReducer from './JobKeeperReducer';

export default class JobKeeperModule {
  constructor({
    integration,
    // context,
    // setAlert,
  }) {
    this.store = new Store(jobKeeperReducer);
    this.integration = integration;
  }

  run = () => {
  };

  getView() {
    return (
      <Provider store={this.store}>
        <JobKeeperView></JobKeeperView>
      </Provider>);
  }
}
