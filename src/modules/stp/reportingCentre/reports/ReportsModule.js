import React from 'react';

import ReportsView from './components/ReportsView';

export default class ReportsModule {
  constructor({
    integration,
    store,
  }) {
    this.integration = integration;
    this.store = store;
  }

  run = () => {};

  getView = () => (<ReportsView />);
}
