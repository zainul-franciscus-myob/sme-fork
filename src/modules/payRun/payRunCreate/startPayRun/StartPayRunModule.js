import React from 'react';

import { getPayRunListUrl } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import LoadingState from '../../../../components/PageView/LoadingState';
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
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.dismissAlert();
      this.dispatcher.deleteDraft();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.deleteDraft();
    };

    this.integrator.deleteDraft({ onSuccess, onFailure });
  };

  editExistingPayRun = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const state = this.store.getState();
    this.dispatcher.editExistingPayRun(state.startPayRun.draftPayRun);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setStpRegistrationStatus(response.stpRegistrationStatus);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.getStpRegistrationStatus({ onSuccess, onFailure });
    this.dispatcher.nextStep();
  };

  goToPayRunList = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  };

  loadEmployeePays = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (employeePays) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadEmployeePays(employeePays);
      this.dispatcher.setStpRegistrationStatus(employeePays.stpRegistrationStatus);
      this.dispatcher.dismissAlert();
      this.dispatcher.nextStep();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
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
