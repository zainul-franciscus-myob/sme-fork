import React from 'react';

import OnboardingView from './components/OnboardingView';

class OnboardingModule {
  constructor({
    dispatcher,
    settingsService,
    tasksService,
    toggleTasks,
    businessDetailsService,
    recordPageVisit,
  }) {
    this.dispatcher = dispatcher;
    this.settingsService = settingsService;
    this.tasksService = tasksService;
    this.toggleTasks = toggleTasks;
    this.businessDetailsService = businessDetailsService;
    this.recordPageVisit = recordPageVisit;
  }

  save = async (event, { businessName, businessRole, industryId }) => {
    event.preventDefault();

    const onboardingData = {
      businessName,
      businessRole,
      industry: industryId,
      businessId: this.businessId,
      region: this.region,
      onboardingComplete: true,
    };

    await this.settingsService.save(onboardingData);
    await this.tasksService.load();
    await this.businessDetailsService.load();

    this.toggleTasks();
  };

  onboardingVisited = () => {
    const { recordPageVisit, routeProps } = this;

    recordPageVisit({
      ...routeProps,
      telemetryData: {
        businessId: routeProps.routeParams.businessId,
      },
    });
  };

  render = () => {
    const { dispatcher, save, onboardingVisited, businessId } = this;

    return (
      <OnboardingView
        businessId={businessId}
        onSave={save}
        dispatcher={dispatcher}
        onLoad={onboardingVisited}
      />
    );
  };

  resetState = () => null;

  run = (routeProps) => {
    const {
      routeParams: { businessId, region },
    } = routeProps;

    this.businessId = businessId;
    this.region = region;
    this.routeProps = { ...routeProps, currentRouteName: 'onboarding' };
  };

  unsubscribeFromStore = () => null;
}

export default OnboardingModule;
