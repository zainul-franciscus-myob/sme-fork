import React from 'react';

import AlertType from '../types/AlertType';
import StartPayRunView from './components/StartPayRunView';
import createStartPayRunDispatchers from './createStartPayRunDispatchers';
import createStartPayRunIntegrator from './createStartPayRunIntegrator';

export default class StartPayRunModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createStartPayRunDispatchers(store);
    this.integrator = createStartPayRunIntegrator(store, integration);
  }

  loadEmployeePays = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (employeePays) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadEmployeePays(employeePays);
      this.dispatcher.dismissAlert();
      this.dispatcher.nextStep();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({ type: AlertType.ERROR, message });
    };

    this.integrator.loadEmployeePays({ onSuccess, onFailure });
  };

  getView() {
    return (
      <StartPayRunView
        onPayPeriodChange={this.dispatcher.setPayPeriodDetails}
        onNextButtonClick={this.loadEmployeePays}
      />
    );
  }
}
