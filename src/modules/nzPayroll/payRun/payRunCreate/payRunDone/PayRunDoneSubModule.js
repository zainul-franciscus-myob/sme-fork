import React from 'react';

import { getDashboardUrl } from '../PayRunSelectors';
import PayRunDoneView from './components/PayRunDoneView';
import RouteName from '../../../../../router/RouteName';

export default class PayRunDoneSubModule {
  constructor({ store, navigateToName, featureToggles }, restartPayRun) {
    this.store = store;
    this.restartPayRun = restartPayRun;
    this.navigateToName = navigateToName;
    this.featureToggles = featureToggles;
  }

  closePayRun = () => {
    const state = this.store.getState();
    window.location.href = getDashboardUrl(state);
  };

  openPaydayFilingReport = () => {
    this.navigateToName(RouteName.PAYDAY_FILING);
  };

  render() {
    return (
      <PayRunDoneView
        onCloseButtonClick={this.closePayRun}
        onOpenPaydayFilingClick={this.openPaydayFilingReport}
        isPaydayFilingEnabled={this.featureToggles.isPaydayFilingEnabled}
      />
    );
  }
}
