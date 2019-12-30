import React from 'react';

import StpOverviewView from './components/StpOverviewView';

export default class StpOverviewModule {
  constructor({ onFinish }) {
    this.onFinish = onFinish;
  }

  getView() {
    return <StpOverviewView onGetStartedClick={this.onFinish} />;
  }
}
