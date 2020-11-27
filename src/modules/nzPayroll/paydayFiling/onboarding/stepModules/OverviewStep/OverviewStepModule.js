import React from 'react';

import LoadingState from '../../../../../../components/PageView/LoadingState';
import OverviewStepIntegrator from './OverviewStepIntegrator';
import OverviewStepView from './components/OverviewStepView';
import Steps from '../../OnboardingSteps';
import onboardingDispatchers from '../../OnboardingDispatchers';

export default class OverviewStepModule {
  constructor({ store, integration }) {
    this.integration = integration;
    this.store = store;
    this.dispatcher = onboardingDispatchers(store);
    this.integrator = OverviewStepIntegrator(store, integration);
  }

  getIrdAndGoToNextStep = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ irdNumber }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setIrdNumber(irdNumber);
      this.dispatcher.setStep(Steps.AUTHORISE_MYOB);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.getIrdNumber({ onSuccess, onFailure });
  };

  getView() {
    return <OverviewStepView onGetStartedClick={this.getIrdAndGoToNextStep} />;
  }
}
