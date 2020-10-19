import React from 'react';

import { getTotals, isPayItemLineDirty } from './DraftPayRunSelectors';
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

  changeEmployeePayItem = ({ employeeId, payItemId, key, value }) => {
    this.dispatcher.setPayItemLineDirty(true);
    this.dispatcher.updateEmployeePayItem({
      employeeId,
      payItemId,
      key,
      value,
    });
  };

  updateEmployeePay = ({ employeeId, payItemId, key, value }) => {
    const state = this.store.getState();
    const payItemLineIsDirty = isPayItemLineDirty(state);

    if (payItemLineIsDirty) {
      this.dispatcher.formatEmployeePayItem({
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
      this.dispatcher.setPayItemLineDirty(false);
      this.dispatcher.updateEmployeeLineAfterRecalculation({
        employeeId,
        updatedEmployeePay,
      });
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayItemLineDirty(false);
    };

    this.integrator.updateEmployeePay({
      employeeId,
      onSuccess,
      onFailure,
    });
  };

  updateDaysPaid = ({ employeeId, daysPaid }) => {
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

  render() {
    return (
      <DraftPayRunView
        onSelectRow={this.updateIsEmployeeSelected}
        onSelectAllRows={this.updateAreAllEmployeesSelected}
        onEmployeePayItemChange={this.changeEmployeePayItem}
        onEmployeePayItemBlur={this.updateEmployeePay}
        onNextButtonClick={this.nextStep}
        onDaysPaidChange={this.updateDaysPaid}
      />
    );
  }

  getAmount = (payItem, id, index) => {
    if (index === 0) {
      return payItem.amount;
    }
    return formatAmount(0);
  };
}
