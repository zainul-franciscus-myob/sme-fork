import React from 'react';

import { getPayRunListUrl } from '../PayRunSelectors';
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

  getView() {
    return (
      <PayRunDoneView
        onCloseButtonClick={this.closePayRun}
      />
    );
  }
}
