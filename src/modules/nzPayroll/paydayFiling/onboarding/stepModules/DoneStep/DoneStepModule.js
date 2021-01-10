import React from 'react';

import {
  getCreateNzEmployeeUrl,
  getCreateNzPayRunUrl,
  getPaydayFilingUrl,
} from '../../OnboardingSelectors';
import DoneStepView from './components/DoneStepView';

export default class DoneStepModule {
  constructor({ store, navigateTo }) {
    this.store = store;
    this.navigateTo = navigateTo;
  }

  redirectToCreateEmployee = () => {
    const state = this.store.getState();
    this.navigateTo(getCreateNzEmployeeUrl(state));
  };

  redirectToCreatePayrun = () => {
    const state = this.store.getState();
    this.navigateTo(getCreateNzPayRunUrl(state));
  };

  redirectToPaydayFiling = () => {
    const state = this.store.getState();
    this.navigateTo(getPaydayFilingUrl(state));
  };

  getView = () => {
    return (
      <DoneStepView
        onCreateEmployeeClick={this.redirectToCreateEmployee}
        onCreatePayrunClick={this.redirectToCreatePayrun}
        onGoToPaydayFilingClick={this.redirectToPaydayFiling}
      />
    );
  };
}
