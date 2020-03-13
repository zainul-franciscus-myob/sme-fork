import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({
    dispatcher,
    settingsService,
    tasksService,
    toggleTasks,
    businessDetailsService,
    sendTelemetryEvent,
  }) {
    this.dispatcher = dispatcher;
    this.settingsService = settingsService;
    this.tasksService = tasksService;
    this.toggleTasks = toggleTasks;
    this.businessDetailsService = businessDetailsService;
    this.sendTelemetryEvent = sendTelemetryEvent;
  }

  save = async (event, data) => {
    event.preventDefault();

    await this.settingsService.save(data);
    await this.tasksService.load();
    await this.businessDetailsService.load();
    this.toggleTasks();
  }

  onboardingVisited = () => {
    const {
      sendTelemetryEvent, routeProps,
    } = this;

    sendTelemetryEvent(routeProps);
  }

  render = () => {
    const { dispatcher, save, onboardingVisited } = this;
    return (
      <OnboardingView
        onSave={save}
        dispatcher={dispatcher}
        onLoad={onboardingVisited}
      />
    );
  };

  resetState = () => null;

  run = routeProps => {
    this.routeProps = { ...routeProps, currentRouteName: 'onboarding' };
  }

  unsubscribeFromStore = () => null;
}

export default OnboardingModule;
