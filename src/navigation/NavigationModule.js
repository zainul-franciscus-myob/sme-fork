import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from './NavigationIntents';
import { featuresConfig } from './navConfig';
import { getBusinessId, isLinkUserPage } from './NavigationSelectors';
import Config from '../Config';
import NavigationBar from './components/NavigationBar';
import Store from '../store/Store';
import navReducer from './navReducer';

export default class NavigationModule {
  constructor({
    integration,
    setNavigationView,
    constructPath,
    replaceURLParamsAndReload,
    mainContentElement,
    toggleHelp,
  }) {
    this.integration = integration;
    this.setNavigationView = setNavigationView;
    this.constructPath = constructPath;
    this.store = new Store(navReducer);
    this.replaceURLParamsAndReload = replaceURLParamsAndReload;
    this.mainContentElement = mainContentElement;
    this.onPageTransition = undefined;
    this.toggleHelp = toggleHelp;
    this.reportsBaseUrl = Config.MY_REPORTS_URL;
  }

  moveFocusToMainContent = () => {
    this.mainContentElement.setAttribute('tabindex', '-1');
    this.mainContentElement.focus();
    this.mainContentElement.blur();
    this.mainContentElement.removeAttribute('tabindex');
  }

  getBusinessInfo = ({ currentRouteName }) => {
    const businessId = getBusinessId(this.store.getState());
    if (!businessId || isLinkUserPage({ currentRouteName })) {
      return;
    }

    const intent = LOAD_NAVIGATION_CONFIG;
    const urlParams = {
      businessId,
    };
    const onSuccess = ({
      businessName, region, enabledFeatures, isReadOnly,
    }) => {
      this.store.dispatch({
        intent,
        businessName,
        enabledFeatures,
        isReadOnly,
      });
      this.replaceURLParamsAndReload({ businessId, region: region.toLowerCase() });
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

  buildReportsUrl = (routeParams) => {
    const { businessId } = routeParams;
    return `${this.reportsBaseUrl}/#/${businessId}/reports`;
  }

  buildUrls = (currentRouteName, routeParams) => {
    const hasPrimaryRoutes = Object.keys(routeParams).includes('businessId');
    if (!hasPrimaryRoutes || isLinkUserPage({ currentRouteName })) {
      return {};
    }

    return Object.entries(featuresConfig)
      .map(([key, feature]) => {
        if (key === 'reports') {
          return { [key]: this.buildReportsUrl(routeParams) };
        }

        const url = `/#${this.constructPath(feature.routeName, { ...routeParams, ...feature.params })}`;
        return { [key]: url };
      })
      .reduce((acc, obj) => ({ ...acc, ...obj }), {});
  }

  buildAndSetRoutingInfo = ({ currentRouteName, routeParams }) => {
    const urls = this.buildUrls(currentRouteName, routeParams);
    this.store.dispatch({
      intent: SET_ROUTE_INFO,
      urls,
      currentRouteName,
      routeParams,
    });
  }

  redirectToPage = (url) => {
    window.location.href = url;
  }

  render = () => {
    const view = (
      <NavigationBar
        constructPath={this.constructPath}
        onSkipToMainContentClick={this.moveFocusToMainContent}
        onMenuSelect={this.redirectToPage}
        onMenuLinkClick={this.onPageTransition}
        onHelpLinkClick={this.toggleHelp}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );

    this.setNavigationView(wrappedView);
  }

  setOnPageTransition = (onPageTransition) => {
    this.onPageTransition = onPageTransition;
  }

  run = ({
    routeParams, currentRouteName, onPageTransition,
  }) => {
    this.buildAndSetRoutingInfo({ currentRouteName, routeParams });
    this.getBusinessInfo({ currentRouteName });
    this.setOnPageTransition(onPageTransition);
    this.render();
  }
}
