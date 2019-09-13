import React from 'react';

import PayRunListEmployees from './components/PayRunListEmployees';
import createEmployeePayListDispatcher from './createEmployeePayListDispatcher';
import createEmployeePayListIntegrator from './createEmployeePayListIntegrator';

export default class EmployeePayListModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createEmployeePayListDispatcher(store);
    this.integrator = createEmployeePayListIntegrator(store, integration);
  }

  openPreviousStepModal = () => this.dispatcher.openModal({
    type: 'previousStep',
  });

  formatPayItemAndSendRecalculatePayRequest = ({
    employeeId, payItemId, key, value,
  }) => {
    this.dispatcher.formatEmployeePayItem({
      employeeId, payItemId, key, value,
    });

    this.dispatcher.setSubmittingState(true);
    const onSuccess = (recalculatedEmployeePay) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.updateEmployeeLineAfterRecalculation({ employeeId, recalculatedEmployeePay });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.recalculatePay({
      employeeId, payItemId, key, onSuccess, onFailure,
    });
  }

  getView() {
    return (
      <PayRunListEmployees
        onSelectRow={this.dispatcher.updateIsEmployeeSelected}
        onSelectAllRows={this.dispatcher.updateAreAllEmployeesSelected}
        onEmployeePayItemChange={this.dispatcher.updateEmployeePayItem}
        onEmployeePayItemBlur={this.formatPayItemAndSendRecalculatePayRequest}
        onPreviousButtonClick={this.openPreviousStepModal}
        onNextButtonClick={this.dispatcher.nextStep}
      />
    );
  }
}
