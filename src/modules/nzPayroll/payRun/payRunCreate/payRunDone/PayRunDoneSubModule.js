import React from 'react';

import { getDashboardUrl } from '../PayRunSelectors';
import PayRunDoneView from './components/PayRunDoneView';

export default class PayRunDoneSubModule {
  constructor({ store }, restartPayRun) {
    this.store = store;
    this.restartPayRun = restartPayRun;
  }

  closePayRun = () => {
    const state = this.store.getState();
    window.location.href = getDashboardUrl(state);
  };

  render() {
    return <PayRunDoneView onCloseButtonClick={this.closePayRun} />;
  }
}
