import React from 'react';

import FinalisationView from './components/FinalisationView';

export default class FinalisationModule {
  constructor({
    integration,
    store,
  }) {
    this.integration = integration;
    this.store = store;
  }

  run = () => {};

  getView = () => (<FinalisationView />);
}
