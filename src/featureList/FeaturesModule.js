import React from 'react';

import { SUCCESSFULLY_CREATED_ENTRY } from '../spendMoney/spendMoneyMessageTypes';
import FeatureListIntents from './FeatureListIntents';
import FeatureListView from './components/FeatureListView';

export default class FeaturesModule {
  constructor({ setRootView, popMessages }) {
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = [SUCCESSFULLY_CREATED_ENTRY];
  }

  render = ({ features }) => {
    this.setRootView(<FeatureListView features={features} />);
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: alertMessage,
      } = successMessage;

      const intent = FeatureListIntents.DISPLAY_SUCCESS_MESSAGE;

      this.store.publish({
        intent,
        alertMessage,
      });
    }
  }

  run = (context) => {
    const { businessId } = context;
    const features = {
      features: [{
        businessId,
        featureName: 'generalJournal',
      },
      {
        businessId,
        featureName: 'spendMoney/new',
      }],
    };
    this.readMessages();
    this.render(features);
  }
}
