import React from 'react';

import LoadingState from '../../../../../components/PageView/LoadingState';
import StartPayRunView from './components/StartPayRunView';
import createStartPayRunDispatchers from './createStartPayRunDispatchers';
import createStartPayRunIntegrator from './createStartPayRunIntegrator';

export default class StartPayRunModule {
  constructor({
    integration,
    store,
  }) {
    this.integration = integration;
    this.store = store;
    this.dispatcher = createStartPayRunDispatchers(store);
    this.integrator = createStartPayRunIntegrator(store, integration);
  }

  loadEmployeePaysAndMoveToNextStep = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (employeePays) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadEmployeePays(employeePays);
      this.dispatcher.nextStep();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeePays({ onSuccess, onFailure });
  };

  changePayPeriod = ({ key, value }) => {
    this.dispatcher.setPayPeriodDetails({ key, value });
  }

  render() {
    return (
      <StartPayRunView
        onPayPeriodChange={this.changePayPeriod}
        onNextButtonClick={this.loadEmployeePaysAndMoveToNextStep}
      />
    );
  }
}
