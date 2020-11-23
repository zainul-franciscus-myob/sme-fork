import React from 'react';

import AuthorisationStepView from './components/AuthorisationStepView';
import Steps from '../../OnboardingSteps';
import onboardingDispatchers from '../../OnboardingDispatchers';

export default class AuthorisationStepModule {
  constructor({ store }) {
    this.store = store;
    this.dispatcher = onboardingDispatchers(store);
  }

  authoriseUser = () => {
    // TODO: To be implemented in sub-task NZPR-1424
  };

  previousStep = () => {
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
