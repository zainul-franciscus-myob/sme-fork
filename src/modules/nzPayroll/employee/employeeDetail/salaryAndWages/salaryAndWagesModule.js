import React from 'react';

import SalaryAndWagesTabView from './components/SalaryAndWagesTabView';

export default class SalaryAndWagesModule {
  constructor() {
    this.view = <SalaryAndWagesTabView />;
  }

  getView() {
    return (this.view);
  }
}
