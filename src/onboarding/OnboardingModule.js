import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({
    dispatcher, settingsService, tasksService, toggleTasks,
  }) {
    this.dispatcher = dispatcher;
    this.settingsService = settingsService;
    this.tasksService = tasksService;
    this.toggleTasks = toggleTasks;
  }

  save = async (event) => {
    event.preventDefault();
    await this.settingsService.save(this.state);
    await this.tasksService.load();
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
