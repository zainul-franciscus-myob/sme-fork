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
    const { constructPath, replaceURLParamsAndReload, routeParams } = router;

    this.drawer = new DrawerModule({
      integration,
    });

    this.nav = new NavigationModule({
      integration,
      constructPath,
      replaceURLParamsAndReload,
      toggleHelp: this.drawer.toggleDrawer,
    });

    this.store = new Store(RootReducer);
    this.dispatcher = new CreateRootDispatcher(this.store);

    this.settingsClient = SettingsService(this.dispatcher, integration, this.store);

    this.onboarding = new OnboardingModule({
      integration,
      routeParams,
      saveSettingsList: this.settingsClient.save,
      store: this.store,
    });
  }

  render = (component) => {
    const navView = this.nav.render();
    const drawerView = this.drawer.render();
    const onboardingView = this.onboarding.render();

    return (
      <Provider store={this.store}>
        <RootView
          drawer={drawerView}
          nav={navView}
          onboarding={onboardingView}
        >
          { component }
        </RootView>
      </Provider>
    );
  };

  run = (routeProps, handlePageTransition) => {
    const { routeParams } = routeProps;
    const { businessId } = routeParams;
    const currentBusinessId = this.store.getState().businessId;

    this.dispatcher.setInitialState(routeParams);
    if (businessId && businessId !== currentBusinessId) this.settingsClient.load(routeParams);

    this.drawer.run(routeProps);
    this.nav.run({
      ...routeProps,
      onPageTransition: handlePageTransition,
      toggleHelp: this.drawer.toggleDrawer,
    });
    this.onboarding.run();
  };
}