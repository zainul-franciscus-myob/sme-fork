import React from 'react';

import InlandRevenueSettingsView from './components/InlandRevenueSettingsView';
import createPaydayFilingDispatcher from '../createPaydayFilingDispatcher';

export default class InlandRevenueSettingsModule {
  constructor({ store }) {
    this.store = store;
    this.dispatcher = createPaydayFilingDispatcher(store);
  }

  openRemoveAuthorisationModal = () => {
    this.dispatcher.openRemoveAuthorisationModal();
  };

  getView = () => {
    return (
      <InlandRevenueSettingsView
        onRemoveAuthorisationClick={
          this.dispatcher.openRemoveAuthorisationModal
        }
      />
    );
  };

  run = () => {
    // Executes before switching to this tab
  };
}
