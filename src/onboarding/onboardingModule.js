import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({ settingsService }) {
    this.settingsService = settingsService;
  }

  render = () => {
    const { settingsService } = this;

    return (
      <OnboardingView settingsService={settingsService} />
    );
  }

  run = () => null;

  unsubscribeFromStore = () => null;

  resetState = () => null;
}

export default OnboardingModule;
