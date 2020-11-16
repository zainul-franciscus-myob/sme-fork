import React from 'react';

import SalaryAndWagesTabView from './components/SalaryAndWagesTabView';
import salaryAndWageDispatcher from './salaryAndWageDispatcher';

export default class SalaryAndWagesModule {
  constructor({ store } = {}) {
    this.dispatcher = salaryAndWageDispatcher(store);

    this.view = (
      <SalaryAndWagesTabView
        onWageDetailsChange={this.dispatcher.updateWageDetail}
        onHourlyRateBlur={this.dispatcher.formatDecimalPlaces}
        onPayPeriodHoursBlur={this.dispatcher.formatDecimalPlaces}
      />
    );
  }

  getView() {
    return this.view;
  }
}
