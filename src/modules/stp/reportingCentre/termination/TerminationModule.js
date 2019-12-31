import React from 'react';

import TerminationView from './components/TerminationView';

export default class TerminationModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.store = store;
    this.pushMessage = pushMessage;
  }

  getView = () => (<TerminationView />)
}
