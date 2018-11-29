import React from 'react';

import FeatureListView from './components/FeatureListView';

export default class FeaturesModule {
  constructor({ setRootView }) {
    this.setRootView = setRootView;
  }

  render = ({ features }) => {
    this.setRootView(<FeatureListView features={features} />);
  };

  run = (context) => {
    const { businessId } = context;
    const features = {
      features: [{
        businessId,
        featureName: 'spendMoney/new',
      },
      {
        businessId,
        featureName: 'generalJournal',
      }],
    };

    this.render(features);
  }
}
