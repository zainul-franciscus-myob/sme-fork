import React from 'react';

import SubscriptionView from './components/SubscriptionView';

export default class SubscriptionModule {
  constructor({
    setRootView,
  }) {
    this.setRootView = setRootView;
  }

  render = () => {
    const view = (
      <SubscriptionView />
    );

    this.setRootView(view);
  };

  run = () => this.render();

  unsubscribeFromStore = () => {}

  resetState = () => {}
}
