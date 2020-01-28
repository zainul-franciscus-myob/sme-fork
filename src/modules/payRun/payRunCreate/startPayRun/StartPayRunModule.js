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
    this.deleteDraft();
    this.loadTimesheets();
  };

  deleteDraft = () => {
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
  }

  loadTimesheets = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (response) => {
      this.dispatcher.loadTimesheets(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadTimesheets({ timesheets: [] });
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadTimesheets({ onSuccess, onFailure });
  }

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

  setUnprocessedTimesheetLines = () => {
    this.dispatcher.setUnprocessedTimesheetLines();
  }

  loadEmployeePays = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.setUnprocessedTimesheetLines();

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

  selectAllTimesheets = (isSelected) => {
    this.dispatcher.selectAllTimesheets(isSelected);
  }

  selectTimesheetsItem = (item, isSelected) => {
    this.dispatcher.selectTimesheetsItem(item, isSelected);
  }

  getView() {
    return (
      <StartPayRunView
        onPayPeriodChange={this.dispatcher.setPayPeriodDetails}
        onNextButtonClick={this.loadEmployeePays}
        onExistingPayRunModalCreateClick={this.createNewPayRun}
        onExistingPayRunModalEditClick={this.editExistingPayRun}
        onExistingPayRunModalGoBackClick={this.goToPayRunList}
        selectAll={this.selectAllTimesheets}
        selectItem={this.selectTimesheetsItem}
      />
    );
  }
}
