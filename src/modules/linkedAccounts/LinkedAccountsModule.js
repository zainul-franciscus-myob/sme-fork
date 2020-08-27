import { Provider } from 'react-redux';
import React from 'react';

import {
  getAccountModalContext,
  getIsActionDisabled,
} from './LinkedAccountsSelectors';
import AccountModalModule from '../account/accountModal/AccountModalModule';
import LinkedAccountsView from './components/LinkedAccountsView';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
import createLinkedAccountsDispatcher from './createLinkedAccountsDispatcher';
import createLinkedAccountsIntegrator from './createLinkedAccountsIntegrator';
import keyMap from '../../hotKeys/keyMap';
import linkedAccountsReducer from './linkedAccountsReducer';
import setupHotKeys from '../../hotKeys/setupHotKeys';

class LinkedAccountsModule {
  constructor({ integration, setRootView }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(linkedAccountsReducer);
    this.dispatcher = createLinkedAccountsDispatcher({ store: this.store });
    this.integrator = createLinkedAccountsIntegrator({
      store: this.store,
      integration,
    });
    this.accountModalModule = new AccountModalModule({ integration });
  }

  loadLinkedAccounts = () => {
    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadLinkedAccounts(response);
    };

    const onFailure = () => this.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.loadLinkedAccounts({ onSuccess, onFailure });
  };

  updateAccount = ({ key, value }) =>
    this.dispatcher.updateAccount({ key, value });

  updateHasAccountOption = ({ key, value }) =>
    this.dispatcher.updateHasAccountOption({
      key,
      value,
    });

  saveLinkedAccounts = () => {
    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
      return;
    }

    if (getIsActionDisabled(this.store.getState())) return;

    this.setIsSubmitting(true);

    const onSuccess = (response) => {
      this.setIsSubmitting(false);
      this.displaySuccessMessage(response.message);
    };

    const onFailure = (response) => {
      this.setIsSubmitting(false);
      this.displayFailureAlert(response.message);
    };

    this.integrator.saveLinkedAccounts({ onSuccess, onFailure });
  };

  displaySuccessMessage = (successMessage) =>
    this.dispatcher.displayAlert({
      message: successMessage,
      type: 'success',
    });

  displayFailureAlert = (errorMessage) =>
    this.dispatcher.displayAlert({
      message: errorMessage,
      type: 'danger',
    });

  dismissAlert = () => this.dispatcher.dismissAlert();

  openAccountModal = (onAccountChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);

    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate(payload, onAccountChange),
      onLoadFailure: (message) =>
        this.dispatcher.setAlert({ message, type: 'danger' }),
    });
  };

  loadAccountAfterCreate = ({ message, id }, onAccountChange) => {
    this.dispatcher.setAlert({ message, type: 'success' });
    this.dispatcher.setCreatedAccountLoadingState(true);
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.setCreatedAccountLoadingState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      onAccountChange(payload);
    };

    const onFailure = () =>
      this.dispatcher.setCreatedAccountLoadingState(false);

    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  setLoadingState = (loadingState) =>
    this.dispatcher.setLoadingState(loadingState);

  setIsSubmitting = (isSubmitting) =>
    this.dispatcher.setIsSubmitting(isSubmitting);

  setSelectedTab = (selectedTab) => this.dispatcher.setSelectedTab(selectedTab);

  handlers = { SAVE_ACTION: this.saveLinkedAccounts };

  resetState = () => {
    this.dispatcher.resetState();
    this.accountModalModule.resetState();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(LoadingState.LOADING);
    this.loadLinkedAccounts();
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <LinkedAccountsView
          accountModal={this.accountModalModule.render()}
          onAccountChange={this.updateAccount}
          onCreateAccountButtonClick={this.openAccountModal}
          onDismissAlert={this.dismissAlert}
          onHasAccountOptionChange={this.updateHasAccountOption}
          onSaveButtonClick={this.saveLinkedAccounts}
          onSelectTab={this.setSelectedTab}
        />
      </Provider>
    );

    this.setRootView(view);
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();
}

export default LinkedAccountsModule;
