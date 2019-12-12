import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({
    saveSettingsList,
  }) {
    this.saveSettingsList = saveSettingsList;
  }

  render = () => {
    const { saveSettingsList } = this;

    return (
      <OnboardingView saveSettingsList={saveSettingsList} />
    );
  }

  run = () => {}

  unsubscribeFromStore = () => {}

  resetState = () => {};
}

export default OnboardingModule;
