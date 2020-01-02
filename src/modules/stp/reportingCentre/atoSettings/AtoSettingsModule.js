import React from 'react';

import { getRegistrationUrl } from '../ReportingCentreSelectors';
import AtoSettingsView from './components/AtoSettingsView';
import createAtoSettingsDispatcher from './createAtoSettingsDispatcher';
import createAtoSettingsIntegrator from './createAtoSettingsIntegrator';

export default class AtoSettingsModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.store = store;
    this.pushMessage = pushMessage;
    this.dispatcher = createAtoSettingsDispatcher(store);
    this.integrator = createAtoSettingsIntegrator(store, integration);
  }

  loadAtoSettings = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAtoSettings(response);
    };

    const onFailure = ({ message }) => {
      console.log(`Failed to load ATO Settings. ${message}`);
    };

    this.integrator.loadAtoSettings({ onSuccess, onFailure });
  };

  redirectToRegistration = () => {
    window.location.href = getRegistrationUrl(this.store.getState());
  };

  run = () => {
    this.loadAtoSettings();
  };

  getView() {
    return (
      <AtoSettingsView
        onBusinessContactChange={this.dispatcher.setBusinessContact}
        onEditBusinessContactClick={() => {}}
        onEditBusinessConnectionClick={this.dispatcher.openConfirmationModal}
        onEditBusinessConnectionConfirm={this.redirectToRegistration}
        onEditBusinessConnectionCancel={this.dispatcher.closeConfirmationModal}
      />
    );
  }
}
