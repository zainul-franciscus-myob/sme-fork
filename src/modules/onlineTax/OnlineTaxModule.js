import { Provider } from 'react-redux';
import React from 'react';

import { getRegion } from './onlineTaxSelectors';
import LoadingState from '../../components/PageView/LoadingState';
import RegionToOnlineTaxViewMapping from './RegionToOnlineTaxViewMapping';
import Store from '../../store/Store';
import createOnlineTaxDispatcher from './createOnlineTaxDispatcher';
import createOnlineTaxIntegrator from './createOnlineTaxIntegrator';
import onlineTaxReducer from './onlineTaxReducer';

export default class OnlineTaxModule {
  constructor({ integration, setRootView, featureToggles }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(onlineTaxReducer);
    this.integrator = createOnlineTaxIntegrator(this.store, integration);
    this.dispatcher = createOnlineTaxDispatcher(this.store);
    this.isCustomizedForNonGstEnabled =
      featureToggles?.isCustomizedForNonGstEnabled;
  }

  render = () => {
    const state = this.store.getState();
    const region = getRegion(state);

    const OnlineTaxView = RegionToOnlineTaxViewMapping[region];

    const wrappedView = (
      <Provider store={this.store}>
        <OnlineTaxView />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState({
      isCustomizedForNonGstEnabled: this.isCustomizedForNonGstEnabled,
      ...context,
    });
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  loadOnlineTaxConfig = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (config) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setOnlineTaxState(config);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadOnlineTaxConfig({ onSuccess, onFailure });
  };

  run(context) {
    this.setInitialState(context);
    if (this.isCustomizedForNonGstEnabled) {
      this.loadOnlineTaxConfig();
    }
    this.render();
  }
}
