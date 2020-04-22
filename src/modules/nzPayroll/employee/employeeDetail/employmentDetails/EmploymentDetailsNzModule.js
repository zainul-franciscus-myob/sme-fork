import React from 'react';

import EmploymentDetailsNzTab from './components/EmploymentDetailsTab';

export default class EmploymentDetailsNzModule {
  constructor() {
    this.view = <EmploymentDetailsNzTab />;
  }

  getView() {
    return (this.view);
  }
}
