import React from 'react';

import AtoSettingsView from './components/AtoSettingsView';

export default class AtoSettingsModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.store = store;
    this.pushMessage = pushMessage;
  }

  getView = () => (<AtoSettingsView />)
}
