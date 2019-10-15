import { Provider } from 'react-redux';
import React from 'react';

import { ACCOUNT_LIST_ROUTE } from '../getAccountRoutes';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getAppliedFilterOptions, getLinkedAccountUrl } from './AccountListSelectors';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import AccountListView from './components/AccountListView';
import Store from '../../store/Store';
import accountListReducer from './accountListReducer';
import createAccountListDispatcher from './createAccountListDispatcher';
import createAccountListIntegrator from './createAccountListIntegrator';

export default class AccountListModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(accountListReducer);
    this.setRootView = setRootView;
    this.dispatcher = createAccountListDispatcher(this.store);
    this.integrator = createAccountListIntegrator(this.store, integration);
  }

  loadAccountList = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.filterAccountList(payload);
    };

    const onFailure = () => {
      console.log('Failed to load account list');
    };

    this.integrator.filterAccountList({ onSuccess, onFailure });
  }

  filterAccountList = () => {
    this.dispatcher.setAccountListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.filterAccountList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterAccountList({ onSuccess, onFailure });
  }

  setTab = (tabId) => {
    this.dispatcher.setAccountListTab(tabId);
    this.filterAccountList();
  }

  redirectToLinkedAccounts = () => {
    window.location.href = getLinkedAccountUrl(this.store.getState());
  }

  render = () => {
    const accountView = (
      <AccountListView
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateFilterOptions={this.dispatcher.setAccountListFilterOptions}
        onApplyFilter={this.filterAccountList}
        onTabSelect={this.setTab}
        onEditLinkedAccountButtonClick={this.redirectToLinkedAccounts}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {accountView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context, settings) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
    });
  }

  run = (context) => {
    const settings = loadSettings(context.businessId, ACCOUNT_LIST_ROUTE);
    this.setInitialState(context, settings);
    this.render();
    this.store.subscribe(state => (
      saveSettings(context.businessId, ACCOUNT_LIST_ROUTE, getAppliedFilterOptions(state))
    ));
    this.loadAccountList();
  }
}
