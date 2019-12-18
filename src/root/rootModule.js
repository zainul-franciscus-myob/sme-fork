/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';

import CreateRootDispatcher from './createRootDispatcher';
import DrawerModule from '../drawer/DrawerModule';
import NavigationModule from '../navigation/NavigationModule';
import OnboardingModule from '../onboarding/onboardingModule';
import RootReducer from './rootReducer';
import RootView from './components/RootView';
import SettingsService from './services/settingsService';
import Store from '../store/Store';

export default class RootModule {
  constructor({
    integration, router,
  }) {
    const { constructPath, replaceURLParamsAndReload } = router;

    this.store = new Store(RootReducer);
    this.dispatcher = new CreateRootDispatcher(this.store);

    this.settingsService = SettingsService(this.dispatcher, integration, this.store);

    this.drawer = new DrawerModule({ integration });

    this.nav = new NavigationModule({
      constructPath,
      integration,
      replaceURLParamsAndReload,
      toggleActivities: this.drawer.toggleActivities,
      toggleHelp: this.drawer.toggleHelp,
    });

    this.onboarding = new OnboardingModule({
      settingsService: this.settingsService,
    });
  }

  render = (component) => {
    const navView = this.nav.render();
    const onboardingView = this.onboarding.render();
    const drawerView = this.drawer.render();

    return (
      <Provider store={this.store}>
        <RootView
          nav={navView}
          onboarding={onboardingView}
          drawer={drawerView}
        >
          {component}
        </RootView>
      </Provider>
    );
  };

  run = (routeProps, handlePageTransition) => {
    const { routeParams } = routeProps;
    const { businessId } = routeParams;

    this.dispatcher.setInitialState(routeParams);

    if (businessId) {
      this.settingsService.load(routeParams);
      this.drawer.run(routeProps);
    }

    this.nav.run({
      ...routeProps,
      onPageTransition: handlePageTransition,
    });
  };
}
