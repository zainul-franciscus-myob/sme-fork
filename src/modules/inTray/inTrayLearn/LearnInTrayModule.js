import React from 'react';

import LearnInTrayComponent from './LearnInTrayComponent';

class LearnInTrayModule {
  constructor({ setRootView, globalCallbacks }) {
    this.setRootView = setRootView;
    this.globalCallbacks = globalCallbacks;
  }

  onTryItOut = (region, businessId) => {
    this.globalCallbacks.learnInTrayCompleted();
    window.location.href = `/#/${region}/${businessId}/inTray?appcue=-LzEZZWU-_3DVxhwDx-I`;
  }

  render = (region, businessId) => this.setRootView(
    <LearnInTrayComponent onTryItOut={() => this.onTryItOut(region, businessId)} />,
  )

  run = (context) => {
    const { region, businessId } = context;
    this.render(region, businessId);
  }

  resetState = () => {};

  unsubscribeFromStore = () => {};
}

export default LearnInTrayModule;
