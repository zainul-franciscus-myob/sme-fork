import React from 'react';

import { recordPageVisit } from '../../telemetry';
import OnboardingView from './components/OnboardingView';
import isFeatureEnabled from '../../common/feature/isFeatureEnabled';

class OnboardingModule {
  constructor({
    dispatcher,
    settingsService,
    tasksService,
    toggleTasks,
    businessDetailsService,
    featureToggles,
  }) {
    this.dispatcher = dispatcher;
    this.settingsService = settingsService;
    this.tasksService = tasksService;
    this.toggleTasks = toggleTasks;
    this.businessDetailsService = businessDetailsService;
    this.isMoveToMyobEnabled = isFeatureEnabled({
      isFeatureCompleted: featureToggles?.isMoveToMyobEnabled,
    });
  }

  save = async (
    event,
    { businessName, businessRole, industryId, usingCompetitorProduct }
  ) => {
    event.preventDefault();

    const onboardingData = {
      businessName,
      businessRole,
      industry: industryId,
      businessId: this.businessId,
      region: this.region,
      onboardingComplete: true,
      usingCompetitorProduct,
    };

    await this.settingsService.save(onboardingData);
    await this.tasksService.load();
    await this.businessDetailsService.load();

    this.toggleTasks();
  };

  onboardingVisited = () => recordPageVisit(this.routeProps);

  render = (updateOnboardingSettingsFailure) => {
    const {
      dispatcher,
      save,
      onboardingVisited,
      businessId,
      isMoveToMyobEnabled,
    } = this;

    return (
      <OnboardingView
        businessId={businessId}
        onSave={save}
        dispatcher={dispatcher}
        onLoad={onboardingVisited}
        updateOnboardingSettingsFailure={updateOnboardingSettingsFailure}
        isMoveToMyobEnabled={isMoveToMyobEnabled}
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
