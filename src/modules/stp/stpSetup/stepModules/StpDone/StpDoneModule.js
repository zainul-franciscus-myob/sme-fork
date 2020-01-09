import React from 'react';

import StpDoneView from './components/StpDoneView';

export default class StpDoneModule {
  constructor({ onFinish }) {
    this.onFinish = onFinish;
  }

  getView() {
    return <StpDoneView onDoneButtonClick={this.onFinish} />;
  }
}
