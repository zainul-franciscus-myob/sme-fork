import React from 'react';

import InlandRevenueSettingsView from './components/InlandRevenueSettingsView';

export default class InlandRevenueSettingsModule {
  getView = () => {
    return <InlandRevenueSettingsView />;
  };

  run = () => {
    // Executes before switching to this tab
  };
}
