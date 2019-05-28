import React from 'react';

export default class BillItemModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
  }

  unsubscribeFromStore = () => {
  }

  run() {
    this.setRootView(<p>bill items module</p>);
  }

  resetState = () => {
  };
}
