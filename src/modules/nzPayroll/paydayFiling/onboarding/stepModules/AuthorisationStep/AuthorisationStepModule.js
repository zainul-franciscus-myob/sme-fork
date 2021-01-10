import React from 'react';

import AuthorisationStepIntegrator from './AuthorisationStepIntegrator';
import AuthorisationStepView from './components/AuthorisationStepView';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import Steps from '../../OnboardingSteps';
import onboardingDispatchers from '../../OnboardingDispatchers';

export default class AuthorisationStepModule {
  constructor({ store, integration, navigateTo }) {
    this.integration = integration;
    this.store = store;
    this.navigateTo = navigateTo;
    this.dispatcher = onboardingDispatchers(store);
    this.integrator = AuthorisationStepIntegrator(store, integration);
  }

  authoriseUser = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.dismissAlert();

    const onSuccess = ({ onboardUrl }) => {
      this.navigateTo(onboardUrl);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.createOnboardUser({ onSuccess, onFailure });
  };

  previousStep = () => {
    this.dispatcher.dismissAlert();
    this.dispatcher.setStep(Steps.OVERVIEW);
  };

  getView() {
    return (
      <AuthorisationStepView
        onPreviousClick={this.previousStep}
        onAuthorisationClick={this.authoriseUser}
      />
    );
  }
}
