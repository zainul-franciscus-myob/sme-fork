import { Provider } from 'react-redux';
import React from 'react';

import PayRunView from './components/PayRunView';
import Store from '../store/Store';
import createPayRunDispatcher from './createPayRunDispatcher';
import createPayRunIntegrator from './createPayRunIntegrator';
import payRunReducer from './reducer/payRunReducer';

export default class PayRunModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(payRunReducer);
    this.pushMessage = pushMessage;
    this.dispatcher = createPayRunDispatcher(this.store);
    this.integrator = createPayRunIntegrator(this.store, integration);
  }

  startNewPayRun = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.startNewPayRun(response);
    };

    const onFailure = () => {
      console.log('Failed to start new pay run');
    };

    this.integrator.startNewPayRun({ onSuccess, onFailure });
  };

  loadEmployeePays = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.nextStep();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadEmployeePays({ onSuccess, onFailure });
  };

  render = () => {
    const payRunView = (
      <PayRunView
        onPayPeriodChange={this.dispatcher.setPayPeriodDetails}
        onNextButtonClick={this.loadEmployeePays}
        onDismissAlert={this.dispatcher.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payRunView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.startNewPayRun();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };
}
