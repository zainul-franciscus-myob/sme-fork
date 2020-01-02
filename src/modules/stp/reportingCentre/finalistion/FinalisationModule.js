import React from 'react';

import FinalisationView from './components/FinalisationView';

export default class FinalisationModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.store = store;
    this.pushMessage = pushMessage;
  }

  run = () => {};

  getView = () => (<FinalisationView />);
}
