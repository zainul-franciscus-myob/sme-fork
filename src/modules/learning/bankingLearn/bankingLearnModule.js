import { Provider } from 'react-redux';
import React from 'react';

import {
  getCreateBankFeedsUrl,
  getNewBankFeedsAccess,
} from './BankingLearnSelectors';
import BankingLearnView from './components/bankingLearnView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import bankingLearnReducer from './bankingLearnReducer';
import createLearnBankFeedIntegrator from './createBankingLearnIntegrator';
import createLearnBankingDispatcher from './createBankingLearnDispatcher';

export default class BankingLearnModule {
  constructor({
    integration,
    setRootView,
    globalCallbacks: { learnBankingCompleted },
    navigateTo,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.learnBankingCompleted = learnBankingCompleted;
    this.navigateTo = navigateTo;
    this.store = new Store(bankingLearnReducer);
    this.dispatcher = createLearnBankingDispatcher(this.store);
    this.integrator = createLearnBankFeedIntegrator(
      this.store,
      this.integration
    );
  }

  getSerialNumber = () => {
    const { dispatcher, integrator } = this;
    const onSuccess = (response) => {
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      dispatcher.setSerialNumber(response.serialNumber);
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    integrator.getSerialNumber({ onSuccess, onFailure });
  };

  getBankFeedsAccess = () => {
    const { dispatcher, integrator } = this;

    const onSuccess = (response) => {
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      dispatcher.setNewBankFeedsAccess(response);
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    integrator.getBankFeedsAccess({ onSuccess, onFailure });
  };

  onClick = () => {
    this.learnBankingCompleted();
    const state = this.store.getState();

    if (getNewBankFeedsAccess(state)) {
      this.navigateTo(getCreateBankFeedsUrl(state));
    } else {
      this.navigateTo(getCreateBankFeedsUrl(state), true);
    }
  };

  render = () => {
    this.setRootView(
      <Provider store={this.store}>
        <BankingLearnView onClick={this.onClick} />
      </Provider>
    );
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    this.getSerialNumber();
    this.getBankFeedsAccess();
  };

  resetState = () => {};

  unsubscribeFromStore = () => {};
}
