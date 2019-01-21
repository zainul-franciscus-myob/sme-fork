import React from 'react';

import FeatureListView from './components/FeatureListView';

export default class FeaturesModule {
  constructor({ setRootView }) {
    this.setRootView = setRootView;
    this.businessId = '';
  }

  render = () => {
    const features = ['transactionList'];

    this.setRootView(
      <FeatureListView
        features={features}
        businessId={this.businessId}
      />,
    );
  };

  unsubscribeFromStore = () => {};

  run = (context) => {
    this.businessId = context.businessId;
    this.render();
  }

  resetState = () => {}
}
