import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({
    dispatcher, settingsService, tasksService, toggleTasks, businessDetailsService,
  }) {
    this.dispatcher = dispatcher;
    this.settingsService = settingsService;
    this.tasksService = tasksService;
    this.toggleTasks = toggleTasks;
    this.businessDetailsService = businessDetailsService;
  }

  save = async (event, data) => {
    event.preventDefault();

    await this.settingsService.save(data);
    await this.tasksService.load();
    await this.businessDetailsService.load();
    this.toggleTasks();
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
