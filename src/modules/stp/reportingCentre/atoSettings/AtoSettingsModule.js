import React from 'react';

import { getRegistrationUrl } from '../ReportingCentreSelectors';
import AtoSettingsView from './components/AtoSettingsView';
import LoadingState from '../../../../components/PageView/LoadingState';
import createAtoSettingsDispatcher from './createAtoSettingsDispatcher';
import createAtoSettingsIntegrator from './createAtoSettingsIntegrator';

export default class AtoSettingsModule {
  constructor({
    integration,
    store,
  }) {
    this.integration = integration;
    this.store = store;
    this.dispatcher = createAtoSettingsDispatcher(store);
    this.integrator = createAtoSettingsIntegrator(store, integration);
  }

  loadAtoSettings = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAtoSettings(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadAtoSettings({ onSuccess, onFailure });
  };

  redirectToRegistration = () => {
    window.location.href = getRegistrationUrl(this.store.getState());
  };

  updateBusinessContact = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'success', message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.updateBusinessContact({ onSuccess, onFailure });
  };

  run = () => {
    this.loadAtoSettings();
  };

  getView() {
    return (
      <AtoSettingsView
        onBusinessContactChange={this.dispatcher.setBusinessContact}
        onEditBusinessContactClick={this.updateBusinessContact}
        onEditBusinessConnectionClick={this.dispatcher.openConfirmationModal}
        onEditBusinessConnectionConfirm={this.redirectToRegistration}
        onEditBusinessConnectionCancel={this.dispatcher.closeConfirmationModal}
      />
    );
  }
}
