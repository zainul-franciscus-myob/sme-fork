import React from 'react';

import OverviewStepView from './components/OverviewStepView';
import Steps from '../../OnboardingSteps';
import onboardingDispatchers from '../../OnboardingDispatchers';

export default class OverviewStepModule {
  constructor({ store }) {
    this.store = store;
    this.dispatcher = onboardingDispatchers(store);
  }

  goToAuthoriseStep = () => {
    this.dispatcher.setStep(Steps.AUTHORISE_MYOB);
  };

  getView() {
    return <OverviewStepView onGetStartedClick={this.goToAuthoriseStep} />;
  }
}
