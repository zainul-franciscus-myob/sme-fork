import React from 'react';

import { SUCCESSFULLY_CREATED_ENTRY } from '../spendMoney/spendMoneyMessageTypes';
import Alert from '../components/Alert/Alert';
import FeatureListIntents from './FeatureListIntents';
import FeatureListView from './components/FeatureListView';
import Store from '../store/Store';
import featureListReducer from './featureListReducer';

export default class FeaturesModule {
  constructor({ setRootView, popMessages }) {
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.businessId = '';
    this.messageTypes = [SUCCESSFULLY_CREATED_ENTRY];
    this.store = new Store(featureListReducer);
  }

  render = (state) => {
    const features = [{
      businessId: this.businessId,
      featureName: 'generalJournal',
    },
    {
      businessId: this.businessId,
      featureName: 'spendMoney/new',
    }];
    const alertComponent = state.alertMessage && (
      <Alert type="success" onDismiss={this.dismissAlert}>
        { state.alertMessage }
      </Alert>);

    this.setRootView(
      <FeatureListView
        alertComponent={alertComponent}
        features={features}
      />,
    );
  };

  dismissAlert = () => {
    this.store.publish({
      intent: FeatureListIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const {
        content: alertMessage,
      } = successMessage;

      const intent = FeatureListIntents.SET_ALERT_MESSAGE;

      this.store.publish({
        intent,
        alertMessage,
      });
    }
  }

  run = (context) => {
    this.businessId = context.businessId;
    this.store.subscribe(this.render);
    this.readMessages();
    this.render(this.store.state);
  }
}
