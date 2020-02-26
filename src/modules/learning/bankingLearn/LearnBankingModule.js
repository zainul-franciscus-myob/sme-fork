import { Provider } from 'react-redux';
import React from 'react';

import BankingLearnView from './components/BankingLearnView';
import Config from '../../../Config';
import Store from '../../../store/Store';
import bankingLearnReducer from './bankingLearnReducer';
import createLearnBankFeedIntegrator from './services/banking';
import createLearnBankingDispatcher from './createLearnBankingDispatcher';
import getQueryFromParams from '../../../common/getQueryFromParams/getQueryFromParams';

export default class LearnBankingModule {
  constructor({
    setRootView, learnBankingCompleted, integration,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.learnBankingCompleted = learnBankingCompleted;
    this.store = new Store(bankingLearnReducer);
    this.dispatcher = createLearnBankingDispatcher(this.store);
    this.integrator = createLearnBankFeedIntegrator({
      store: this.store,
      integration: this.integration,
    });
  }

  getSerialNumber = () => {
    const onSuccess = (
      serialNumber,
    ) => {
      this.dispatcher.setLoading(false);
      this.dispatcher.setSerialNumber(serialNumber);
    };

    const onFailure = () => {
      this.dispatcher.setLoading(false);
    };
    this.dispatcher.setLoading(true);
    this.integrator.getSerialNumber({ onSuccess, onFailure });
  }

  connectBankFeedUrl = (serialNumber, businessId) => {
    const baseUrl = Config.MANAGE_BANK_FEEDS_BASE_URL;
    const queryParams = getQueryFromParams({
      SerialNumer: serialNumber,
      CdfId: businessId,
      Action: 'app',
    });
    return `${baseUrl}${queryParams}`;
  }

  onClick = (serialNumber, businessId) => {
    this.learnBankingCompleted();
    const url = this.connectBankFeedUrl(serialNumber, businessId);
    window.open(url, '_blank');
  };

  resetState = () => {};

  unsubscribeFromStore = () => {};

  redirectToUrl = (url) => {
    if (url) window.location.href = url;
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.getSerialNumber();
    this.render();
  };

  render = () => {
    const bankingLearnView = (
      <Provider store={this.store}>
        <BankingLearnView onClick={this.onClick} />
      </Provider>
    );
    this.setRootView(bankingLearnView);
  }
}
