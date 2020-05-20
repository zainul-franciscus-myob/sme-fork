import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import { getBusinessId, getRegion } from './BankFeedsConnectSelectors';
import BankFeedsConnectDispatcher from './BankFeedsConnectDispatcher';
import BankFeedsConnectIntegrator from './BankFeedsConnectIntegrator';
import BankFeedsConnectReducer from './BankFeedsConnectReducer';
import BankFeedsConnectView from './components/BankFeedsConnectView';
import Store from '../../../store/Store';

export default class BankFeedsConnectModule {
  constructor({
    setRootView,
    integration,
    navigateTo,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(BankFeedsConnectReducer);
    this.dispatcher = BankFeedsConnectDispatcher(this.store);
    this.integrator = BankFeedsConnectIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
  }

  onCopy = (item) => {
    copy(item);
    this.setCopyAlertState();
  }

  setCopyAlertState = () => this.dispatcher.setCopyAlertState();

  redirectToPath = (path) => {
    const state = this.store.getState();
    const region = getRegion(state);
    const businessId = getBusinessId(state);

    this.navigateTo(`/#/${region}/${businessId}${path}`);
  };

  redirectToBankFeeds = () => this.redirectToPath('/bankFeeds');

  render = () => {
    const view = (
      <Provider store={this.store}>
        <BankFeedsConnectView
          onCopy={this.onCopy}
          redirectToBankFeeds={this.redirectToBankFeeds}
          setCopyAlertState={this.setCopyAlertState}
          setCopyAlertText={(text) => this.dispatcher.setCopyAlertText(text)}
        />
      </Provider>
    );

    this.setRootView(view);
  }

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
  }

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => this.store.unsubscribeAll();
}
