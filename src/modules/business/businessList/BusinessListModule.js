import React from 'react';

import {
  LOAD_BUSINESS_LIST,
  SET_LOADING_STATE,
} from '../BusinessIntents';
import {
  RESET_STATE,
} from '../../../SystemIntents';
import BusinessListView from './components/BusinessListView';
import PageView from '../../../components/PageView/PageView';
import Store from '../../../store/Store';
import businessListReducer from './businessListReducer';

export default class BusinessModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(businessListReducer);
    this.setRootView = setRootView;
  }

  loadBusinessList = () => {
    const intent = LOAD_BUSINESS_LIST;

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
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  render = ({ businesses, isLoading }) => {
    const businessListView = (
      <BusinessListView
        businesses={businesses}
      />
    );
    const view = <PageView isLoading={isLoading} view={businessListView} />;
    this.setRootView(view);
  };

  run = () => {
    this.store.subscribe(this.render);
    this.setLoadingState(true);
    this.loadBusinessList();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
