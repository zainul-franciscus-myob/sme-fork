/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import BusinessDetailsService from './services/businessDetails';
import CreateRootDispatcher from './createRootDispatcher';
import CreateRootIntegrator from './createRootIntegrator';
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
    this.integrator = CreateRootIntegrator(this.store, integration);

    this.tasksService = tasksService(this.dispatcher, integration, this.store);
    this.settingsService = SettingsService(this.dispatcher, integration, this.store);
    this.businessDetailsService = BusinessDetailsService(this.dispatcher, integration, this.store);
    this.last_business_id = null;

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
      businessDetailsService: this.businessDetailsService,
    });

    this.globalCallbacks = buildGlobalCallbacks({
      closeTasks: this.tasksService.closeTasks,
    });
  }

  render = (component) => {
    const root = document.getElementById('root');
    ReactDOM.unmountComponentAtNode(root);

    const view = (
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
    ReactDOM.render(view, root);
  };

  run = async (routeProps, module, context) => {
    const { routeParams: { businessId, region }, currentRouteName } = routeProps;

    this.dispatcher.setBusinessId(businessId);
    this.dispatcher.setRegion(region);

    if (businessId && businessId !== this.last_business_id) {
      this.last_business_id = businessId;
      await this.integrator.loadSubscriptions();
      this.tasksService.load();
      this.settingsService.load();
      this.businessDetailsService.load();
    }

    this.drawer.run(routeProps);
    this.nav.run({ ...routeProps, onPageTransition: module.handlePageTransition });

    module.resetState();
    module.run(context);
    this.globalCallbacks.pageLoaded(currentRouteName.replace('/', '_'));
  };
}
