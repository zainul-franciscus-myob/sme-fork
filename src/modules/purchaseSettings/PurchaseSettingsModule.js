import { Provider } from 'react-redux';
import React from 'react';

import PurchaseSettingsView from './components/PurchaseSettingsView';
import Store from '../../store/Store';
import createPurchaseSettingsDispatcher from './createPurchaseSettingsDispatcher';
import createPurchaseSettingsIntegrator from './createPurchaseSettingsIntegrator';
import purchaseSettingsReducer from './purchaseSettingsReducer';

export default class PurchaseSettingsModule {
  constructor({ integration, setRootView, replaceURLParams }) {
    this.setRootView = setRootView;
    this.store = new Store(purchaseSettingsReducer);
    this.dispatcher = createPurchaseSettingsDispatcher(this.store);
    this.replaceURLParams = replaceURLParams;
    this.integrator = createPurchaseSettingsIntegrator(this.store, integration);
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    this.render();
  }

  render = () => {
    const view = <PurchaseSettingsView />;

    const wrappedView = <Provider store={this.store}>{view}</Provider>;
    this.setRootView(wrappedView);
  };
}
