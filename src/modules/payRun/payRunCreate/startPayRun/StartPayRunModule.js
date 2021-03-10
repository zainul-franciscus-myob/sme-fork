import React from 'react';

import {
  getIsTimesheetUsed,
  getTimesheetRequiredFieldsFilled,
} from './StartPayRunSelectors';
import { getPayRunListUrl, getStpErrorUrl } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import LoadingState from '../../../../components/PageView/LoadingState';
import StartPayRunView from './components/StartPayRunView';
import createStartPayRunDispatchers from './createStartPayRunDispatchers';
import createStartPayRunIntegrator from './createStartPayRunIntegrator';

export default class StartPayRunModule {
  constructor({ integration, store, pushMessage, featureToggles }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.store = store;
    this.dispatcher = createStartPayRunDispatchers(store);
    this.integrator = createStartPayRunIntegrator(store, integration);
    this.isAllowNegativesInPayRuns = featureToggles?.isAllowNegativesInPayRuns;
  }

  createNewPayRun = () => {
    this.deleteDraft();
    this.attemptLoadTimesheets();
  };

  deleteDraft = () => {
    this.dispatcher.deleteDraft();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.dismissAlert();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    this.integrator.deleteDraft({ onSuccess, onFailure });
  };

  attemptLoadTimesheets = () => {
    const state = this.store.getState();

    if (!getIsTimesheetUsed(state)) return;
    if (!getTimesheetRequiredFieldsFilled(state)) return;

    this.loadTimesheets();
  };

  loadTimesheets = () => {
    this.dispatcher.setIsTableLoading(true);
    const onSuccess = (response) => {
      this.dispatcher.loadTimesheets(response);
      this.dispatcher.setIsTableLoading(false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.loadTimesheets({ timesheets: [] });
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadTimesheets({ onSuccess, onFailure });
  };

  editExistingPayRun = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const state = this.store.getState();
    this.dispatcher.editExistingPayRun(
      state.startPayRun.draftPayRun,
      this.isAllowNegativesInPayRuns
    );

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
  };

  validateStp = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      const { hasRegistrationErrors } = response;

      if (hasRegistrationErrors) {
        this.dispatcher.setShowStpValidationErrorModal(hasRegistrationErrors);
      } else {
        this.loadEmployeePays();
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: AlertType.ERROR, message });
    };

    this.integrator.loadStpValidation({
      onSuccess,
      onFailure,
    });
  };

  loadEmployeePays = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.setUnprocessedTimesheetLines();

    const onSuccess = (employeePays) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadEmployeePays(
        employeePays,
        this.isAllowNegativesInPayRuns
      );
      this.dispatcher.setStpRegistrationStatus(
        employeePays.stpRegistrationStatus
      );
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
  };

  selectTimesheetsItem = (item, isSelected) => {
    this.dispatcher.selectTimesheetsItem(item, isSelected);
  };

  changePayPeriod = ({ key, value }) => {
    this.dispatcher.setPayPeriodDetails({ key, value });

    this.attemptLoadTimesheets();
  };

  closeStopValidationErrorModal = () => {
    this.dispatcher.setShowStpValidationErrorModal(false);
  };

  openStpValidationPage = () => {
    const state = this.store.getState();

    this.dispatcher.setShowStpValidationErrorModal(false);
    const stpErrorUrl = getStpErrorUrl(state);

    window.open(stpErrorUrl, '_blank');
  };

  closeValidationModalAndLoadEmployeePays = () => {
    this.dispatcher.setShowStpValidationErrorModal(false);
    this.loadEmployeePays();
  };

  getView() {
    return (
      <StartPayRunView
        onPayPeriodChange={this.changePayPeriod}
        onNextButtonClick={this.validateStp}
        onExistingPayRunModalCreateClick={this.createNewPayRun}
        onExistingPayRunModalEditClick={this.editExistingPayRun}
        onExistingPayRunModalGoBackClick={this.goToPayRunList}
        selectAll={this.selectAllTimesheets}
        selectItem={this.selectTimesheetsItem}
        onStpValidationErrorModalCancel={this.closeStopValidationErrorModal}
        onStpValidationErrorModalContinue={
          this.closeValidationModalAndLoadEmployeePays
        }
        onStpValidationErrorModalUpdateDetails={this.openStpValidationPage}
      />
    );
  }
}
