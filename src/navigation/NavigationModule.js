import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from './NavigationIntents';
import { featuresConfig, noPrimaryRoutes } from './navConfig';
import { getBusinessId } from './NavigationSelectors';
import { logout } from '../Auth';
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
    const intent = LOAD_NAVIGATION_CONFIG;
    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };
    const onSuccess = ({ businessName, enabledFeatures }) => {
      this.store.dispatch({
        intent,
        businessName,
        enabledFeatures,
      });
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

  buildUrls = (currentRouteName, routeParams) => {
    const hasPrimaryRoutes = !noPrimaryRoutes.includes(currentRouteName);

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
    const urls = this.buildUrls(currentRouteName, routeParams);
    this.store.dispatch({
      intent: SET_ROUTE_INFO,
      urls,
      currentRouteName,
      routeParams,
    });
  }

  render = () => {
    const view = (
      <NavigationBar
        logout={logout}
        constructPath={this.constructPath}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );

    this.setNavigationView(wrappedView);
  }

  run = ({ routeParams, currentRouteName }) => {
    this.buildAndSetRoutingInfo({ currentRouteName, routeParams });
    this.getBusinessInfo();
    this.render();
  }
}
