import React from 'react';

import SalaryAndWagesTabView from './components/SalaryAndWagesTabView';
import createSalaryAndWageDispatcher from './createSalaryAndWageDispatcher';

export default class SalaryAndWagesModule {
  constructor({ store } = {}) {
    this.dispatcher = createSalaryAndWageDispatcher(store);

    this.view = <SalaryAndWagesTabView onWageDetailsChange={this.dispatcher.updateWageDetail} />;
  }

  getView() {
    return (this.view);
  }
}
