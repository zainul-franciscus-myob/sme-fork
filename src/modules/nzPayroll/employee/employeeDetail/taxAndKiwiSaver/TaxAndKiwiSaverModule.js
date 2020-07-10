import React from 'react';

import TaxAndKiwiSaverTab from './components/TaxAndKiwiSaverTab';
import taxAndKiwiSaverDispatcher from './taxAndKiwiSaverDispatcher';

export default class TaxAndKiwiSaverModule {
  constructor({ store } = {}) {
    this.dispatcher = taxAndKiwiSaverDispatcher(store);
  }

  getView() {
    return (
      <TaxAndKiwiSaverTab onTaxChange={this.dispatcher.updateTaxDetails} />
    );
  }
}
