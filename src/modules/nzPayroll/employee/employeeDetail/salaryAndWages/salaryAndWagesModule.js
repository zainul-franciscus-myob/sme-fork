import React from 'react';

import SalaryAndWagesTabView from './components/SalaryAndWagesTabView';
import salaryAndWageDispatcher from './salaryAndWageDispatcher';

export default class SalaryAndWagesModule {
  constructor({ store } = {}) {
    this.dispatcher = salaryAndWageDispatcher(store);

    this.view = <SalaryAndWagesTabView onWageDetailsChange={this.dispatcher.updateWageDetail} />;
  }

  getView() {
    return (this.view);
  }
}
