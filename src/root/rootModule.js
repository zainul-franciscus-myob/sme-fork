/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  getBusinessId,
  getHasCheckedBrowserAlert,
  getIsPaidSubscription,
  getLeanEngageInfo,
} from './rootSelectors';
import BusinessDetailsService from './services/businessDetails';
import Config from '../Config';
import CreateRootDispatcher from './createRootDispatcher';
import CreateRootIntegrator from './createRootIntegrator';
import DrawerModule from '../drawer/DrawerModule';
import FeatureToggle from '../FeatureToggles';
import NavigationModule from '../navigation/NavigationModule';
import OnboardingModule from '../onboarding/OnboardingModule';
import RootReducer from './rootReducer';
import RootView from './components/RootView';
import SettingsService from './services/settings';
import Store from '../store/Store';
import buildGlobalCallbacks from './builders/buildGlobalCallbacks';
import getSplitToggle from '../splitToggle/index.js';
import isNotSupportedAndShowAlert from '../common/browser/isNotSupportedAndShowAlert';
import loadChangePlanUrl from '../modules/settings/subscription/loadChangePlanUrl';
import loadSubscriptionUrl from '../modules/settings/subscription/loadSubscriptionUrl';
import tasksService from './services/tasks';

export default class RootModule {
  init = ({
    integration, router, sendTelemetryEvent, startLeanEngage,
  }) => {
    const { constructPath, replaceURLParamsAndReload, navigateTo } = router;

    this.store = new Store(RootReducer);
    this.integration = integration;
    this.navigateTo = navigateTo;

    this.dispatcher = CreateRootDispatcher(this.store);
    this.integrator = CreateRootIntegrator(this.store, integration);

    this.tasksService = tasksService(this.dispatcher, integration, this.store);
    this.settingsService = SettingsService(this.dispatcher, integration, this.store);
    this.businessDetailsService = BusinessDetailsService(this.dispatcher, integration, this.store);
    this.last_business_id = null;
    this.startLeanEngage = startLeanEngage;
    this.featureToggles = getSplitToggle();

    this.drawer = new DrawerModule({
      integration,
      tasksService: this.tasksService,
    });

    this.nav = new NavigationModule({
      constructPath,
      integration,
      replaceURLParamsAndReload,
      config: Config,
      toggleTasks: this.drawer.toggleTasks,
      toggleHelp: this.drawer.toggleHelp,
      isToggleOn: this.isToggleOn,
      sendTelemetryEvent,
    });

    this.onboarding = new OnboardingModule({
      dispatcher: this.dispatcher,
      settingsService: this.settingsService,
      tasksService: this.tasksService,
      toggleTasks: this.drawer.toggleTasks,
      businessDetailsService: this.businessDetailsService,
      sendTelemetryEvent,
    });

    this.globalCallbacks = buildGlobalCallbacks({
      closeTasks: this.tasksService.closeTasks,
    });
  }

  getRegion = () => this.store.getState().region;

  loadSharedInfo = () => {
    const onSuccess = (sharedInfo) => {
      this.dispatcher.loadSharedInfo(sharedInfo);
      this.runLeanEngage();
    };

    this.integrator.loadSharedInfo({ onSuccess });
  };

  loadSubscription = async () => {
    const onSuccess = (subscription) => {
      this.dispatcher.loadSubscription(subscription);
    };

    await this.integrator.loadSubscription({ onSuccess });
  };

  isToggleOn = (toggleName) => {
    if (
      toggleName === FeatureToggle.EssentialsJobs
      || toggleName === FeatureToggle.EssentialsJobsPayrun) {
      return true;
    }

    return this.featureToggles.isToggleOn(toggleName);
  }

  runLeanEngage = () => {
    const state = this.store.getState();

    this.startLeanEngage(getLeanEngageInfo(state));
  };

  subscribeOrUpgrade = async () => {
    const state = this.store.getState();

    const isPaid = getIsPaidSubscription(state);
    const businessId = getBusinessId(state);
    const urlLoader = isPaid ? loadChangePlanUrl : loadSubscriptionUrl;

    const url = await urlLoader(
      this.integration,
      businessId,
      window.location.href,
    );

    if (!url) {
      // eslint-disable-next-line no-console
      console.warn('"Subscription details" url has no value');
      return;
    }

    this.navigateTo(url);
  };

  render = (component) => {
    const root = document.getElementById('root');
    ReactDOM.unmountComponentAtNode(root);

    const view = (
      <Provider store={this.store}>
        <RootView
          drawer={this.drawer}
          nav={this.nav}
          onboarding={this.onboarding}
          onDismissBrowserAlert={this.closeBrowserAlert}
        >
          {component}
        </RootView>
      </Provider>
    );
    ReactDOM.render(view, root);
  };

  openBrowserAlert = () => {
    this.dispatcher.setBrowserAlert({
      type: 'danger',
      message: 'Your browser version is not fully supported, some pages may not work as expected. Please upgrade to the latest version.',
    });
  }

  closeBrowserAlert = () => {
    this.dispatcher.setBrowserAlert();
  }

  run = async (routeProps, module, context) => {
    const { routeParams: { businessId, region }, currentRouteName } = routeProps;

    this.dispatcher.setBusinessId(businessId);
    this.dispatcher.setRegion(region);

    if (businessId) {
      if (businessId !== this.last_business_id) {
        await this.featureToggles.init({ businessId });
        await this.loadSubscription();
        this.loadSharedInfo();
        this.tasksService.load();
        this.settingsService.load();
        this.businessDetailsService.load();
      } else {
        this.runLeanEngage();
      }
    }
    this.last_business_id = businessId;

    if (!getHasCheckedBrowserAlert(this.store.getState())) {
      if (isNotSupportedAndShowAlert()) {
        this.openBrowserAlert();
      }
      this.dispatcher.setHasCheckedBrowserAlert(true);
    }

    this.drawer.run(routeProps);
    this.nav.run({ ...routeProps, onPageTransition: module.handlePageTransition });
    this.onboarding.run(routeProps);

    module.resetState();
    module.run(context);
    this.globalCallbacks.pageLoaded(currentRouteName.replace('/', '_'));
  };
}
