import React from 'react';

import {
  LOAD_BUSINESS_LIST,
  SET_LOADING_STATE,
} from '../BusinessIntents';
import {
  RESET_STATE,
} from '../../../SystemIntents';
import BusinessListView from './components/BusinessListView';
import LoadingState from '../../../components/PageView/LoadingState';
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
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        businesses,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      onSuccess,
      onFailure,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  render = ({ businesses, loadingState }) => {
    const businessListView = (
      <BusinessListView
        businesses={businesses}
      />
    );
    const view = <PageView loadingState={loadingState} view={businessListView} />;
    this.setRootView(view);
  };

  run = () => {
    this.store.subscribe(this.render);
    this.setLoadingState(LoadingState.LOADING);
    this.loadBusinessList();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
