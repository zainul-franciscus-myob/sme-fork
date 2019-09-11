import React from 'react';

import PayRunListEmployees from './components/PayRunListEmployees';
import createEmployeePayListDispatcher from './createEmployeePayListDispatcher';

export default class EmployeePayListModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createEmployeePayListDispatcher(store);
  }

  openPreviousStepModal = () => this.dispatcher.openModal({
    type: 'previousStep',
  });

  getView() {
    return (
      <PayRunListEmployees
        onSelectRow={this.dispatcher.updateIsEmployeeSelected}
        onSelectAllRows={this.dispatcher.updateAreAllEmployeesSelected}
        onPreviousButtonClick={this.openPreviousStepModal}
        onNextButtonClick={this.dispatcher.nextStep}
      />
    );
  }
}
