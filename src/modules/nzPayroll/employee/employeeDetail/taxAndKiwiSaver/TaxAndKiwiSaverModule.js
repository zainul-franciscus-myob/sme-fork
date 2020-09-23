import React from 'react';

import TaxAndKiwiSaverTab from './components/TaxAndKiwiSaverTab';
import taxAndKiwiSaverDispatcher from './taxAndKiwiSaverDispatcher';

export default class TaxAndKiwiSaverModule {
  constructor({ store } = {}) {
    this.dispatcher = taxAndKiwiSaverDispatcher(store);
  }

  getView() {
    return (
      <TaxAndKiwiSaverTab
        onTaxChange={this.dispatcher.updateTaxDetails}
        onIrdNumberOnBlur={this.dispatcher.updateIrdNumberOnBlur}
        onTaxCodeChange={this.dispatcher.updateTaxCode}
        onKiwiSaverChange={this.dispatcher.updateKiwiSaverDetails}
      />
    );
  }
}
