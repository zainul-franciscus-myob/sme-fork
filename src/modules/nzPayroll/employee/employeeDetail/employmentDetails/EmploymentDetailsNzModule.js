import React from 'react';

import EmploymentDetailsNzTab from './components/EmploymentDetailsTab';
import contactDetailsTabDispatchers from './employmentDetailsDispatcher';

export default class EmploymentDetailsNzModule {
  constructor({ store }) {
    this.dispatcher = contactDetailsTabDispatchers(store);
  }

  getView() {
    return (
      <EmploymentDetailsNzTab
        onEmploymentDetailsChange={this.dispatcher.updateEmploymentDetails}
      />
    );
  }
}
