/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';

import ActivitiesService from './services/activities';
import CreateRootDispatcher from './createRootDispatcher';
import DrawerModule from '../drawer/DrawerModule';
import NavigationModule from '../navigation/NavigationModule';
import OnboardingModule from '../onboarding/OnboardingModule';
import RootReducer from './rootReducer';
import RootView from './components/RootView';
import SettingsService from './services/settings';
import Store from '../store/Store';

export default class RootModule {
  constructor({
    integration, router,
  }) {
    const { constructPath, replaceURLParamsAndReload } = router;

    this.store = new Store(RootReducer);

    this.dispatcher = CreateRootDispatcher(this.store);
    this.activitiesService = ActivitiesService(this.dispatcher, integration, this.store);
    this.settingsService = SettingsService(this.dispatcher, integration, this.store);

    this.drawer = new DrawerModule({
      integration,
      activitiesService: this.activitiesService,
    });

    this.nav = new NavigationModule({
      constructPath,
      integration,
      replaceURLParamsAndReload,
      toggleActivities: this.drawer.toggleActivities,
      toggleHelp: this.drawer.toggleHelp,
    });

    this.onboarding = new OnboardingModule({
      dispatcher: this.dispatcher,
      settingsService: this.settingsService,
      activitiesService: this.activitiesService,
    });
  }

  render = component => (
    <Provider store={this.store}>
      <RootView
        drawer={this.drawer}
        nav={this.nav}
        onboarding={this.onboarding}
      >
        {component}
      </RootView>
    </Provider>
  );

  run = (routeProps, handlePageTransition) => {
    const { routeParams } = routeProps;
    const { businessId } = routeParams;
    this.dispatcher.setBusinessId(businessId);

    this.settingsService.load();

    if (businessId) {
      this.activitiesService.load();
      this.settingsService.load(routeParams);
    }

    this.drawer.run(routeProps);

    this.nav.run({
      ...routeProps,
      onPageTransition: handlePageTransition,
    });
  };
}
