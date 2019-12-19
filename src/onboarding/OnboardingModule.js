import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({ dispatcher, settingsService }) {
    this.dispatcher = dispatcher;
    this.settingsService = settingsService;
  }

  save = () => this.settingsService.save(this.state);

  render = () => {
    const { dispatcher, save } = this;
    return (<OnboardingView onSave={save} dispatcher={dispatcher} />);
  };

  resetState = () => null;

  run = () => null;

  unsubscribeFromStore = () => null;
}

export default OnboardingModule;
