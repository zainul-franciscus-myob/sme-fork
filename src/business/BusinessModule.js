import React from 'react';

import BusinessIntents from './BusinessIntents';
import BusinessListView from './components/BusinessListView';
import Store from '../store/Store';
import businessReducer from './businessReducer';

export default class BusinessModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(businessReducer);
    this.setRootView = setRootView;
  }

  loadBusinessList = () => {
    const intent = BusinessIntents.LOAD_BUSINESS_LIST;

    const onSuccess = (businesses) => {
      this.store.publish({
        intent,
        businesses,
      });
    };

    const onFailure = error => console.error(error);

    this.integration.read({
      intent,
      onSuccess,
      onFailure,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  render = ({ businesses }) => {
    this.setRootView(<BusinessListView
      businesses={businesses}
    />);
  };

  run = () => {
    this.store.subscribe(this.render);
    this.loadBusinessList();
  }
}
