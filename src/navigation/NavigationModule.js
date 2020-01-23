import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_CONFIG, LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from './NavigationIntents';
import { featuresConfig } from './navConfig';
import { getBusinessId, getShowUrls } from './NavigationSelectors';
import Config from '../Config';
import NavigationBar from './components/NavigationBar';
import Store from '../store/Store';
import loadSubscriptionUrl from '../modules/settings/subscription/loadSubscriptionUrl';
import navReducer from './navReducer';

export default class NavigationModule {
  constructor({
    integration,
    setNavigationView,
    constructPath,
    replaceURLParamsAndReload,
    toggleHelp,
    toggleActivities,
  }) {
    this.integration = integration;
    this.setNavigationView = setNavigationView;
    this.constructPath = constructPath;
    this.store = new Store(navReducer);
    this.replaceURLParamsAndReload = replaceURLParamsAndReload;
    this.onPageTransition = undefined;
    this.toggleHelp = toggleHelp;
    this.toggleActivities = toggleActivities;
  }

  loadBusinessInfo = () => {
    const state = this.store.getState();
    if (!getShowUrls(state)) {
      return;
    }

    const businessId = getBusinessId(this.store.getState());
    const intent = LOAD_NAVIGATION_CONFIG;
    const urlParams = {
      businessId,
    };
    const onSuccess = ({
      businessName, serialNumber, region, userEmail, enabledFeatures, isReadOnly,
    }) => {
      this.store.dispatch({
        intent, businessName, serialNumber, userEmail, enabledFeatures, isReadOnly,
      });

      this.replaceURLParamsAndReload({ businessId, region: region.toLowerCase() });
      // TODO: To be removed in next patch version
      // This is a temporary fix for Feelix bug introduced in version 5.10.0
      window.dispatchEvent(new Event('resize'));
    };
    const onFailure = () => {
      console.log('Failed to load navigation config');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  buildUrls = (routeParams) => {
    const { region, businessId } = routeParams;
    if (region && businessId) {
      return Object.entries(featuresConfig)
        .map(([key, feature]) => {
          const url = `/#${this.constructPath(feature.routeName, { region, businessId, ...feature.params })}`;
          return { [key]: url };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {});
    }

    return {};
  }

  buildAndSetRoutingInfo = ({ currentRouteName, routeParams }) => {
    const urls = this.buildUrls(routeParams);
    this.store.dispatch({
      intent: SET_ROUTE_INFO,
      urls,
      currentRouteName,
      routeParams,
    });
  }

  loadConfig = () => {
    this.store.dispatch({
      intent: LOAD_CONFIG,
      selfServicePortalUrl: Config.SELF_SERVICE_PORTAL_URL,
      myReportsUrl: Config.MY_REPORTS_URL,
    });
  }

  redirectToPage = (url) => {
    window.location.href = url;
  }

  subscribeNow = async () => {
    const businessId = getBusinessId(this.store.getState());
    const url = await loadSubscriptionUrl(this.integration, businessId, window.location.href);
    if (!url) {
      console.warn('"Subscribe now" url is has no value');
      return;
    }
    this.redirectToPage(url);
  }

  render = (activities) => {
    const {
      constructPath,
      redirectToPage,
      onPageTransition,
      toggleHelp,
      toggleActivities,
      store,
      subscribeNow,
    } = this;

    return (
      <Provider store={store}>
        <NavigationBar
          constructPath={constructPath}
          onMenuSelect={redirectToPage}
          onMenuLinkClick={onPageTransition}
          onHelpLinkClick={toggleHelp}
          onSubscribeNowClick={subscribeNow}
          onActivitiesLinkClick={toggleActivities}
          hasActivities={activities && activities.length > 0}
        />
      </Provider>
    );
  }

  setOnPageTransition = (onPageTransition) => {
    this.onPageTransition = onPageTransition;
  }

  run = ({
    routeParams, currentRouteName, onPageTransition,
  }) => {
    const previousBusinessId = getBusinessId(this.store.getState());
    const currentBusinessId = routeParams.businessId;
    this.loadConfig();
    this.buildAndSetRoutingInfo({ currentRouteName, routeParams });
    if (previousBusinessId !== currentBusinessId) {
      this.loadBusinessInfo();
    }
    this.setOnPageTransition(onPageTransition);
  }
}
