import React from 'react';

import FeatureListView from './components/FeatureListView';

export default class FeaturesModule {
  constructor({ setRootView }) {
    this.setRootView = setRootView;
  }

  render = ({ features }) => {
    this.setRootView(<FeatureListView features={features} />);
  };

  run = () => {
    const features = {
      features: [{
        businessId: '1',
        featureName: 'spendMoney/new',
      },
      {
        businessId: '2',
        featureName: 'generalJournal',
      }],
    };

    this.render(features);
  }
}
