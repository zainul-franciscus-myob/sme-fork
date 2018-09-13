import React from 'react';

import { LOAD_BUSINESS_LIST } from './businessIntents';
import BusinessListReducer from './businessListReducer';
import BusinessListView from './components/BusinessListView';
import Store from '../store/Store';

export default class BusinessModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(BusinessListReducer);
    this.setRootView = setRootView;
  }

  loadBusinessList = () => {
    const intent = LOAD_BUSINESS_LIST;

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
