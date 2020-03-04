import React from 'react';

import EmployeeDetailPaymentDetails from './components/EmployeeDetailPaymentDetails';
import createPaymentDetailsTabDispatchers from './createPaymentDetailsTabDispatchers';

export default class PaymentDetailsTabModule {
  constructor({
    integration,
    store,
    pushMessage,
    globalCallbacks,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatchers = createPaymentDetailsTabDispatchers(store);
    this.globalCallbacks = globalCallbacks;
  }

  getView() {
    return (
      <EmployeeDetailPaymentDetails
        onPaymentDetailsChange={this.dispatchers.updatePaymentDetails}
        onBankAccountDetailsChange={this.dispatchers.updateBankAccountDetails}
      />
    );
  }
}
