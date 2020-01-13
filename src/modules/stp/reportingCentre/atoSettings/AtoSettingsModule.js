import { Provider } from 'react-redux';
import React from 'react';

import { getRegistrationUrl } from '../ReportingCentreSelectors';
import AtoSettingsView from './components/AtoSettingsView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import atoSettingsReducer from './AtoSettingsReducer';
import createAtoSettingsDispatcher from './createAtoSettingsDispatcher';
import createAtoSettingsIntegrator from './createAtoSettingsIntegrator';

export default class AtoSettingsModule {
  constructor({
    integration,
    context,
    setAlert,
  }) {
    this.store = new Store(atoSettingsReducer);
    this.dispatcher = createAtoSettingsDispatcher(this.store);
    this.integrator = createAtoSettingsIntegrator(this.store, integration);
    this.setAlert = setAlert;

    this.dispatcher.setInitialState(context);
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

  updateBusinessDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'success', message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.updateBusinessDetails({ onSuccess, onFailure });
  };

  updateBusinessContact = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'success', message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.updateBusinessContact({ onSuccess, onFailure });
  };

  updateAgentContact = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'success', message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.updateAgentContact({ onSuccess, onFailure });
  };

  run = (agentDetails) => {
    this.dispatcher.setAgentDetails(agentDetails);
    this.loadAtoSettings();
  };

  getView() {
    return (
      <Provider store={this.store}>
        <AtoSettingsView
          onBusinessDetailsChange={this.dispatcher.setBusinessDetails}
          onEditBusinessDetailsClick={this.updateBusinessDetails}
          onBusinessContactChange={this.dispatcher.setBusinessContact}
          onEditBusinessContactClick={this.updateBusinessContact}
          onAgentContactChange={this.dispatcher.setAgentContact}
          onEditAgentContactClick={this.updateAgentContact}
          onEditBusinessConnectionClick={this.dispatcher.openConfirmationModal}
          onEditBusinessConnectionConfirm={this.redirectToRegistration}
          onEditBusinessConnectionCancel={this.dispatcher.closeConfirmationModal}
        />
      </Provider>
    );
  }
}
