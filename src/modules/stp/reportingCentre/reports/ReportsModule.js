import React from 'react';

import ReportsView from './components/ReportsView';

export default class ReportsModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.store = store;
    this.pushMessage = pushMessage;
  }

  getView = () => (<ReportsView />)
}
