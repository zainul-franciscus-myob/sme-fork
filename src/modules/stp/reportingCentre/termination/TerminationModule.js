import React from 'react';

import TerminationView from './components/TerminationView';

export default class TerminationModule {
  constructor({
    integration,
    store,
  }) {
    this.integration = integration;
    this.store = store;
  }

  run = () => {};

  getView = () => (<TerminationView />);
}
