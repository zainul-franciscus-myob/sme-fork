import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({
    dispatcher, settingsService, activitiesService, toggleActivities,
  }) {
    this.dispatcher = dispatcher;
    this.settingsService = settingsService;
    this.activitiesService = activitiesService;
    this.toggleActivities = toggleActivities;
  }

  save = (event) => {
    event.preventDefault();
    this.settingsService.save(this.state).then(() => {
      this.activitiesService.load();
      this.toggleActivities();
    });
  }

  render = () => {
    const { dispatcher, save } = this;
    return (<OnboardingView onSave={save} dispatcher={dispatcher} />);
  };

  resetState = () => null;

  run = () => null;

  unsubscribeFromStore = () => null;
}

export default OnboardingModule;
