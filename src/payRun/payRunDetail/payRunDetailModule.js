import { Provider } from 'react-redux';
import React from 'react';

import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  LOAD_PAY_RUN_DETAILS,
  PRINT_TAB_SELECT_ALL,
  PRINT_TAB_SELECT_ITEM,
  SET_LOADING_STATE,
  SET_TAB,
} from './payRunDetailIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getPayRunListUrl, getUrlParams } from './payRunDetailSelector';
import PayRunDetailView from './components/payRunDetailView';
import Store from '../../store/Store';
import payRunDetailReducer from './payRunDetailReducer';

export default class PayRunDetailModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.store = new Store(payRunDetailReducer);
    this.setRootView = setRootView;
  }

  render = () => {
    const payRunDetailView = (
      <PayRunDetailView
        setSelectedTab={this.setSelectedTab}
        emailTabListeners={{
          selectAll: this.emailTabSelectAll,
          selectItem: this.emailTabSelectItem,
        }}
        printTabListeners={{
          selectAll: this.printTabSelectAll,
          selectItem: this.printTabSelectItem,
        }}
        onBackButtonClick={this.redirectToPayRunList}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payRunDetailView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  setSelectedTab = (newTabId) => {
    this.store.dispatch({
      intent: SET_TAB,
      selectedTab: newTabId,
    });
  }

  emailTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ALL,
      isSelected,
    });
  }

  emailTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  }

  printTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: PRINT_TAB_SELECT_ALL,
      isSelected,
    });
  }

  printTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: PRINT_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  }

  redirectToPayRunList = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  loadPayRunDetails = () => {
    this.setIsLoading(true);
    const intent = LOAD_PAY_RUN_DETAILS;

    const state = this.store.getState();
    const urlParams = getUrlParams(state);

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
      this.setIsLoading(false);
    };
    const onFailure = () => {};

    this.integration.read({
      onSuccess,
      onFailure,
      urlParams,
      intent,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadPayRunDetails();
  }
}