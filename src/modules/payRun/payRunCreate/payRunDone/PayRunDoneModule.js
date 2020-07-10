import React from 'react';

import {
  getElectronicPaymentsCreateUrl,
  getPayRunListUrl,
  getStpReportingUrl,
} from '../PayRunSelectors';
import PayRunDoneView from './components/PayRunDoneView';

export default class PayRunDoneModule {
  constructor({ integration, store }) {
    this.integration = integration;
    this.store = store;
  }

  openLeanEngageSurvey = () => {
    window.leanengage('triggerSurvey', 'payrun-csat');
  };

  closePayRun = () => {
    this.openLeanEngageSurvey();
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  };

  goToElectronicPaymentsCreate = () => {
    const state = this.store.getState();
    window.location.href = getElectronicPaymentsCreateUrl(state);
  };

  goToStpReporting = () => {
    const state = this.store.getState();
    window.location.href = getStpReportingUrl(state);
  };

  getView() {
    return (
      <PayRunDoneView
        onCloseButtonClick={this.closePayRun}
        onPayViaBankFileButtonClick={this.goToElectronicPaymentsCreate}
        onStpReportingClick={this.goToStpReporting}
      />
    );
  }

  tryToNavigate = (navigateFunction) => {
    this.openLeanEngageSurvey();
    navigateFunction();
  };
}
