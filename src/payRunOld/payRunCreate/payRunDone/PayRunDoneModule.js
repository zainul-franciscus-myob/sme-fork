import React from 'react';

import { getElectronicPaymentsCreateUrl, getPayRunListUrl } from '../PayRunSelectors';
import PayRunDoneView from './components/PayRunDoneView';

export default class PayRunDoneModule {
  constructor({
    integration,
    store,
  }) {
    this.integration = integration;
    this.store = store;
  }

  closePayRun = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  }

  goToElectronicPaymentsCreate = () => {
    const state = this.store.getState();
    window.location.href = getElectronicPaymentsCreateUrl(state);
  }

  getView() {
    return (
      <PayRunDoneView
        onCloseButtonClick={this.closePayRun}
        onPayViaBankFileButtonClick={this.goToElectronicPaymentsCreate}
      />
    );
  }
}