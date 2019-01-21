import React from 'react';

import {
  SUCCESSFULLY_CREATED_ENTRY,
  SUCCESSFULLY_DELETED_ENTRY,
} from '../spendMoney/spendMoneyMessageTypes';
import Alert from '../components/Alert/Alert';
import FeatureListIntents from './FeatureListIntents';
import FeatureListView from './components/FeatureListView';
import Store from '../store/Store';
import SystemIntents from '../SystemIntents';
import featureListReducer from './featureListReducer';

export default class FeaturesModule {
  constructor({ setRootView, popMessages }) {
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.businessId = '';
    this.messageTypes = [SUCCESSFULLY_CREATED_ENTRY, SUCCESSFULLY_DELETED_ENTRY];
    this.store = new Store(featureListReducer);
  }

  render = (state) => {
    const features = ['generalJournal', 'spendMoney', 'receiveMoney', 'transactionList'];
    const alertComponent = state.alertMessage && (
      <Alert type="success" onDismiss={this.dismissAlert}>
        { state.alertMessage }
      </Alert>);

    this.setRootView(
      <FeatureListView
        alertComponent={alertComponent}
        features={features}
        businessId={this.businessId}
      />,
    );
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: FeatureListIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const {
        content: alertMessage,
      } = successMessage;

      const intent = FeatureListIntents.SET_ALERT_MESSAGE;

      this.store.dispatch({
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

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
