import React from 'react';

import { getTotals, isPayLineDirty } from './DraftPayRunSelectors';
import AlertType from '../types/AlertType';
import DraftPayRunView from './components/DraftPayRunView';
import createDraftPayRunDispatcher from './createDraftPayRunDispatcher';
import createDraftPayRunIntegrator from './createDraftPayRunIntegrator';
import formatAmount from '../../../../../common/valueFormatters/formatAmount';

export default class DraftPayRunSubModule {
  constructor({ integration, store, pushMessage, subscribeOrUpgrade }) {
    this.store = store;
    this.pushMessage = pushMessage;
    this.dispatcher = createDraftPayRunDispatcher(store);
    this.integrator = createDraftPayRunIntegrator(store, integration);
    this.subscribeOrUpgrade = subscribeOrUpgrade;
  }

  nextStep = () => {
    const state = this.store.getState();
    const { takeHomePay } = getTotals(state);
    this.dispatcher.setTotalTakeHomePay(takeHomePay);
    this.dispatcher.nextStep();
  };

  changeEmployeePayLine = ({ employeeId, payItemId, key, value }) => {
    this.dispatcher.setPayLineDirty(true);
    this.dispatcher.updateEmployeePayLine({
      employeeId,
      payItemId,
      key,
      value,
    });
  };

  openPreviousStepModal = () => {
    this.dispatcher.openPreviousStepModal();
  };

  updateEmployeePay = ({ employeeId, payItemId, key, value }) => {
    const state = this.store.getState();
    const payLineDirty = isPayLineDirty(state);

    if (payLineDirty) {
      this.dispatcher.formatEmployeePayLine({
        employeeId,
        payItemId,
        key,
        value,
      });
      this.requestUpdateEmployeePay({
        employeeId,
      });
    }
  };

  requestUpdateEmployeePay = ({ employeeId }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (updatedEmployeePay) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayLineDirty(false);
      this.dispatcher.updateEmployeeLineAfterRecalculation({
        employeeId,
        updatedEmployeePay,
      });
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayLineDirty(false);
    };

    this.integrator.updateEmployeePay({
      employeeId,
      onSuccess,
      onFailure,
    });
  };

  updateDaysPaid = ({ employeeId }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = () => {
      this.dispatcher.setSubmittingState(false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.updateDaysPaidFailed(employeeId);
      this.dispatcher.setAlert({
        type: AlertType.INFO,
        message,
      });
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.updateEmployeePay({
      employeeId,
      onSuccess,
      onFailure,
    });
  };

  changeDaysPaid = ({ employeeId, daysPaid }) => {
    this.dispatcher.updateEmployeeDaysPaid(employeeId, daysPaid);
  };

  updateDraftPayRun = () => {
    this.dispatcher.setSubmittingState(true);
    const handleResponse = () => {
      this.dispatcher.setSubmittingState(false);
    };
    this.integrator.updateDraftPayRun({
      onSuccess: handleResponse,
      onFailure: handleResponse,
    });
  };

  updateIsEmployeeSelected = (id) => {
    this.dispatcher.updateIsEmployeeSelected(id);

    this.updateDraftPayRun();
  };

  updateAreAllEmployeesSelected = (value) => {
    this.dispatcher.updateAreAllEmployeesSelected(value);

    this.updateDraftPayRun();
  };

  tryToNavigate() {
    this.dispatcher.openDiscardAndRedirectModal();
  }

  render() {
    return (
      <DraftPayRunView
        onSelectRow={this.updateIsEmployeeSelected}
        onSelectAllRows={this.updateAreAllEmployeesSelected}
        onEmployeePayLineChange={this.changeEmployeePayLine}
        onEmployeePayLineBlur={this.updateEmployeePay}
        onNextButtonClick={this.nextStep}
        onDaysPaidChange={this.changeDaysPaid}
        onDaysPaidBlur={this.updateDaysPaid}
        onPreviousButtonClick={this.openPreviousStepModal}
      />
    );
  }

  getAmount = (payLine, id, index) => {
    if (index === 0) {
      return payLine.amount;
    }
    return formatAmount(0);
  };
}
