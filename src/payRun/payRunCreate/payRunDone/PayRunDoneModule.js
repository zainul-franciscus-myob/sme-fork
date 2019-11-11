import React from 'react';

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
    window.location.reload();
  }

  getView() {
    return (
      <PayRunDoneView
        onCloseButtonClick={this.closePayRun}
      />
    );
  }
}
