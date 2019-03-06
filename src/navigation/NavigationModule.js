import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from './NavigationIntents';
import { featuresConfig } from './navConfig';
import { getBusinessId } from './NavigationSelectors';
import NavigationBar from './components/NavigationBar';
import Store from '../store/Store';
import navReducer from './navReducer';

export default class NavigationModule {
  constructor({
    integration, setNavigationView, constructPath,
  }) {
    this.integration = integration;
    this.setNavigationView = setNavigationView;
    this.constructPath = constructPath;
    this.store = new Store(navReducer);
  }

  getBusinessInfo = () => {
    const businessId = getBusinessId(this.store.getState());
    if (!businessId) {
      return;
    }

    const intent = LOAD_NAVIGATION_CONFIG;
    const urlParams = {
      businessId,
    };
    const onSuccess = ({ businessName, region, enabledFeatures }) => {
      this.store.dispatch({
        intent,
        businessName,
        enabledFeatures,
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

  buildUrls = (routeParams) => {
    const hasPrimaryRoutes = Object.keys(routeParams).includes('businessId');
    if (!hasPrimaryRoutes) {
      return {};
    }

    return Object.entries(featuresConfig)
      .map(([key, feature]) => {
        const url = `/#${this.constructPath(feature.routeName, { ...routeParams, ...feature.params })}`;

        return { [key]: url };
      })
      .reduce((acc, obj) => ({ ...acc, ...obj }), {});
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

  redirectToPage = (url) => {
    window.location.href = url;
  }

  render = () => {
    const view = (
      <NavigationBar
        constructPath={this.constructPath}
        onMenuSelect={this.redirectToPage}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );

    this.setNavigationView(wrappedView);
  }

  run = ({ routeParams, currentRouteName, replaceURLParamsAndReload }) => {
    this.replaceURLParamsAndReload = replaceURLParamsAndReload;
    this.buildAndSetRoutingInfo({ currentRouteName, routeParams });
    this.getBusinessInfo();
    this.render();
  }
}
