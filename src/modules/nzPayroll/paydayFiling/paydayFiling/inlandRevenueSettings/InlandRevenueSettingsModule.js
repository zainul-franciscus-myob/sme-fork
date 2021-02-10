import React from 'react';

import InlandRevenueSettingsView from './components/InlandRevenueSettingsView';
import LoadingState from '../../../../../components/PageView/LoadingState';
import createPaydayFilingDispatcher from '../createPaydayFilingDispatcher';
import createPaydayFilingIntegrator from '../createPaydayFilingIntegrator';

export default class InlandRevenueSettingsModule {
  constructor({ store, integration, navigateTo }) {
    this.integration = integration;
    this.store = store;
    this.navigateTo = navigateTo;
    this.dispatcher = createPaydayFilingDispatcher(store);
    this.integrator = createPaydayFilingIntegrator(store, integration);
  }

  openRemoveAuthorisationModal = () => {
    this.dispatcher.openRemoveAuthorisationModal();
  };

  authoriseUser = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ onboardUrl }) => {
      this.navigateTo(onboardUrl);
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.createOnboardUser({ onSuccess, onFailure });
  };

  getView = () => {
    return (
      <InlandRevenueSettingsView
        onRemoveAuthorisationClick={this.openRemoveAuthorisationModal}
        onAuthoriseClick={this.authoriseUser}
      />
    );
  };

  run = () => {
    // Executes before switching to this tab
  };
}
