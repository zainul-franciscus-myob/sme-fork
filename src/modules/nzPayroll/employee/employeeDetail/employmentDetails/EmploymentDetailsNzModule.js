import React from 'react';

import EmploymentDetailsNzTab from './components/EmploymentDetailsTab';
import createEmploymentDetailsTabDispatchers from './createEmploymentDetailsDispatcher';

export default class EmploymentDetailsNzModule {
  constructor({
    store,
  }) {
    this.dispatcher = createEmploymentDetailsTabDispatchers(store);
  }

  getView() {
    return (
      <EmploymentDetailsNzTab
        onEmploymentDetailsChange={this.dispatcher.updateEmploymentDetails}
      />
    );
  }
}
