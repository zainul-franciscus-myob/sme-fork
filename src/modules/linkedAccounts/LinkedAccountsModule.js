import { Provider } from 'react-redux';
import React from 'react';

import { getIsActionDisabled } from './LinkedAccountsSelectors';
import LinkedAccountsView from './components/LinkedAccountsView';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
import createLinkedAccountsDispatcher from './createLinkedAccountsDispatcher';
import createLinkedAccountsIntegrator from './createLinkedAccountsIntegrator';
import keyMap from '../../hotKeys/keyMap';
import linkedAccountsReducer from './linkedAccountsReducer';
import setupHotKeys from '../../hotKeys/setupHotKeys';

class LinkedAccountsModule {
  constructor({
    integration, setRootView,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(linkedAccountsReducer);
    this.dispatcher = createLinkedAccountsDispatcher({ store: this.store });
    this.integrator = createLinkedAccountsIntegrator({ store: this.store, integration });
  }

  loadLinkedAccounts = () => {
    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadLinkedAccounts(response);
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadLinkedAccounts({ onSuccess, onFailure });
  }

  updateAccount = ({ key, value }) => this.dispatcher.updateAccount({ key, value });

  updateHasAccountOption = ({ key, value }) => this.dispatcher.updateHasAccountOption({
    key, value,
  });

  saveLinkedAccounts = () => {
    const state = this.store.getState();
    if (getIsActionDisabled(state)) return;

    this.setIsSubmitting(true);

    const onSuccess = (response) => {
      this.setIsSubmitting(false);
      this.displaySuccessMessage(response.message);
    };

    const onFailure = (response) => {
      this.setIsSubmitting(false);
      this.displayFailureAlert(response.message);
    };

    this.integrator.saveLinkedAccounts({
      onSuccess,
      onFailure,
    });
  };

  displaySuccessMessage = successMessage => this.dispatcher.displayAlert({
    message: successMessage,
    type: 'success',
  });

  displayFailureAlert = errorMessage => this.dispatcher.displayAlert({
    message: errorMessage,
    type: 'danger',
  });

  dismissAlert = () => this.dispatcher.dismissAlert();

  setLoadingState = loadingState => this.dispatcher.setLoadingState(loadingState);

  setIsSubmitting = isSubmitting => this.dispatcher.setIsSubmitting(isSubmitting);

  setSelectedTab = selectedTab => this.dispatcher.setSelectedTab(selectedTab);

  handlers = {
    SAVE_ACTION: this.saveLinkedAccounts,
  };

  resetState = () => this.dispatcher.resetState();

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
          onAccountChange={this.updateAccount}
          onHasAccountOptionChange={this.updateHasAccountOption}
          onSelectTab={this.setSelectedTab}
          onSaveButtonClick={this.saveLinkedAccounts}
          onDismissAlert={this.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(view);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}

export default LinkedAccountsModule;
