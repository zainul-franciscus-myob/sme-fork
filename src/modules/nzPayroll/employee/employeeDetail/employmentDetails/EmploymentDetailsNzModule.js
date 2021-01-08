import React from 'react';

import EmploymentDetailsNzTab from './components/EmploymentDetailsTab';
import employmentDetailsDispatcher from './employmentDetailsDispatcher';

export default class EmploymentDetailsNzModule {
  constructor({ store }) {
    this.dispatcher = employmentDetailsDispatcher(store);
  }

  getView() {
    return (
      <EmploymentDetailsNzTab
        onEmploymentDetailsChange={this.dispatcher.updateEmploymentDetails}
        onTaxDetailsChange={this.dispatcher.updateTaxDetails}
        onKiwiSaverDetailsChange={this.dispatcher.updateKiwiSaverDetails}
      />
    );
  }
}
