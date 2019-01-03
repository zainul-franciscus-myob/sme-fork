import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import BusinessIntents from './BusinessIntents';
import BusinessListView from './components/BusinessListView';
import Store from '../store/Store';
import SystemIntents from '../SystemIntents';
import businessReducer from './businessReducer';

export default class BusinessModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(businessReducer);
    this.setRootView = setRootView;
  }

  loadBusinessList = () => {
    const intent = BusinessIntents.LOAD_BUSINESS_LIST;

    const onSuccess = (businesses) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        businesses,
        isLoading: false,
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

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: BusinessIntents.SET_LOADING_STATE,
      isLoading,
    });
  }

  render = ({ businesses, isLoading }) => {
    const businessListView = (
      <BusinessListView
        businesses={businesses}
      />
    );
    const view = isLoading ? <Spinner /> : businessListView;
    this.setRootView(view);
  };

  run = () => {
    this.store.subscribe(this.render);
    this.setLoadingState(true);
    this.loadBusinessList();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
