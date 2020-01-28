/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';

import CreateRootDispatcher from './createRootDispatcher';
import DrawerModule from '../drawer/DrawerModule';
import NavigationModule from '../navigation/NavigationModule';
import OnboardingModule from '../onboarding/OnboardingModule';
import RootReducer from './rootReducer';
import RootView from './components/RootView';
import SettingsService from './services/settings';
import Store from '../store/Store';
import buildGlobalCallbacks from './builders/buildGobalCallbacks';
import tasksService from './services/tasks';

export default class RootModule {
  constructor({
    integration, router,
  }) {
    const { constructPath, replaceURLParamsAndReload } = router;

    this.store = new Store(RootReducer);

    this.dispatcher = CreateRootDispatcher(this.store);
    this.tasksService = tasksService(this.dispatcher, integration, this.store);
    this.settingsService = SettingsService(this.dispatcher, integration, this.store);

    this.drawer = new DrawerModule({
      integration,
      tasksService: this.tasksService,
    });

    this.nav = new NavigationModule({
      constructPath,
      integration,
      replaceURLParamsAndReload,
      toggleTasks: this.drawer.toggleTasks,
      toggleHelp: this.drawer.toggleHelp,
    });

    this.onboarding = new OnboardingModule({
      dispatcher: this.dispatcher,
      settingsService: this.settingsService,
      tasksService: this.tasksService,
      toggleTasks: this.drawer.toggleTasks,
    });

    this.globalCallbacks = buildGlobalCallbacks({
      closeTasks: this.tasksService.closeTasks,
      store: this.store,
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
    const { routeParams: { businessId, region } } = routeProps;
    this.dispatcher.setBusinessId(businessId);
    this.dispatcher.setRegion(region);

    if (businessId) {
      this.tasksService.load();
      this.settingsService.load();
    }

    this.drawer.run(routeProps);

    this.nav.run({
      ...routeProps,
      onPageTransition: handlePageTransition,
    });
  };
}
