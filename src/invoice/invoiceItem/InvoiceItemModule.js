import React from 'react';

export default class InvoiceItemModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  render = () => {
    this.setRootView(<div>Invoice Item Module</div>);
  };

  run() {
    this.render();
  }
}
