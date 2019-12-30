import React from 'react';

import { getPayRunListUrl } from '../../../payRunOld/payRunCreate/PayRunSelectors';
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
    this.store = store;
    this.dispatcher = createStartPayRunDispatchers(store);
    this.integrator = createStartPayRunIntegrator(store, integration);
  }

  createNewPayRun = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.dismissAlert();
      this.dispatcher.deleteDraft();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.deleteDraft();
    };

    this.integrator.deleteDraft({ onSuccess, onFailure });
  };

  editExistingPayRun = () => {
    const state = this.store.getState();
    this.dispatcher.editExistingPayRun(state.startPayRun.draftPayRun);
    this.dispatcher.nextStep();
  };

  goToPayRunList = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  };

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
        onExistingPayRunModalCreateClick={this.createNewPayRun}
        onExistingPayRunModalEditClick={this.editExistingPayRun}
        onExistingPayRunModalGoBackClick={this.goToPayRunList}
      />
    );
  }
}
