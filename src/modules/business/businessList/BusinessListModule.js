import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_BUSINESS_LIST } from '../BusinessIntents';
import { getBusinessUrl, getShouldRedirect } from './BusinessListSelector';
import BusinessListView from './components/BusinessListView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import businessListReducer from './businessListReducer';
import createBusinessListDispatcher from './createBusinessListDispatcher';

export default class BusinessModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(businessListReducer);
    this.setRootView = setRootView;
    this.dispatcher = createBusinessListDispatcher(this.store);
  }

  loadBusinessList = () => {
    const onSuccess = (businesses) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBusinessList(businesses);
      const shouldRedirect = getShouldRedirect(this.store.getState());
      if (shouldRedirect) {
        this.redirectToDashboard();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent: LOAD_BUSINESS_LIST,
      onSuccess,
      onFailure,
    });
  };

  redirectToDashboard = () => {
    const state = this.store.getState();
    const url = getBusinessUrl(state);
    window.location.href = url;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  onUpdateKeyword = ({ value }) => {
    this.dispatcher.updateKeyword(value);
  };

  onResetKeyword = () => {
    this.dispatcher.resetKeyword();
  };

  render = () => {
    const view = (
      <Provider store={this.store}>
        <BusinessListView
          onUpdateKeyword={this.onUpdateKeyword}
          onResetKeyword={this.onResetKeyword}
          onSort={this.dispatcher.updateSortOrder}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  run = () => {
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadBusinessList();
  };

  resetState() {
    this.dispatcher.resetState();
  }
}
