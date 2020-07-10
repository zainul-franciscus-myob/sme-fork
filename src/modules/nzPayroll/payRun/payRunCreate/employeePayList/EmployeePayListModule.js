import React from 'react';

import {
  getTotals,
  isPayItemLineDirty,
} from './EmployeePayListSelectors';
import EmployeePayListView from './components/EmployeePayListView';
import createEmployeePayListDispatcher from './createEmployeePayListDispatcher';
import createEmployeePayListIntegrator from './createEmployeePayListIntegrator';
import formatAmount from '../../../../../common/valueFormatters/formatAmount';

export default class EmployeePayListModule {
  constructor({
    integration, store, pushMessage, subscribeOrUpgrade,
  }) {
    this.store = store;
    this.pushMessage = pushMessage;
    this.dispatcher = createEmployeePayListDispatcher(store);
    this.integrator = createEmployeePayListIntegrator(store, integration);
    this.pendingNavigateFunction = null;
    this.subscribeOrUpgrade = subscribeOrUpgrade;
  }

  nextStep = () => {
    const state = this.store.getState();
    const { takeHomePay } = getTotals(state);
    this.dispatcher.setTotalTakeHomePay(takeHomePay);
    this.dispatcher.nextStep();
  };

  changeEmployeePayItem = ({
    employeeId, payItemId, key, value,
  }) => {
    this.dispatcher.setPayItemLineDirty(true);
    this.dispatcher.updateEmployeePayItem({
      employeeId, payItemId, key, value,
    });
  };

  updateEmployeePay = ({
    employeeId, payItemId, key, value,
  }) => {
    const state = this.store.getState();
    const payItemLineIsDirty = isPayItemLineDirty(state);

    if (payItemLineIsDirty) {
      this.dispatcher.formatEmployeePayItem({
        employeeId, payItemId, key, value,
      });
      this.recalculateEmployeePay({
        employeeId, payItemId, key,
      });
    }
  };

  recalculateEmployeePay = ({
    employeeId, payItemId, key,
  }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (recalculatedEmployeePay) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayItemLineDirty(false);
      this.dispatcher.updateEmployeeLineAfterRecalculation({ employeeId, recalculatedEmployeePay });
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayItemLineDirty(false);
    };

    this.integrator.recalculatePay({
      employeeId, payItemId, key, onSuccess, onFailure,
    });
  };

  updateDaysPaid = ({
    employeeId, daysPaid,
  }) => {
    this.dispatcher.updateEmployeeDaysPaid(employeeId, daysPaid);
  };

  render() {
    return (
      <EmployeePayListView
        onSelectRow={this.dispatcher.updateIsEmployeeSelected}
        onSelectAllRows={this.dispatcher.updateAreAllEmployeesSelected}
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
