import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_LINKED_ACCOUNTS,
  SAVE_LINKED_ACCOUNTS,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_SELECTED_TAB,
  UPDATE_ACCOUNT,
  UPDATE_HAS_ACCOUNT_OPTION,
} from './LinkedAccountsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getBusinessId, getIsActionDisabled, getSaveLinkedAccountsPayload } from './LinkedAccountsSelectors';
import LinkedAccountsView from './components/LinkedAccountsView';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
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
  }

  loadLinkedAccounts = () => {
    const intent = LOAD_LINKED_ACCOUNTS;

    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams: { businessId: getBusinessId(this.store.getState()) },
      onSuccess,
      onFailure,
    });
  }

  updateAccount = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_ACCOUNT,
      key,
      value,
    });
  }

  updateHasAccountOption = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_HAS_ACCOUNT_OPTION,
      key,
      value,
    });
  }

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

    this.integration.write({
      intent: SAVE_LINKED_ACCOUNTS,
      urlParams: { businessId: getBusinessId(state) },
      content: getSaveLinkedAccountsPayload(state),
      onSuccess,
      onFailure,
    });
  };

  displaySuccessMessage = successMessage => this.displayAlert({
    message: successMessage,
    type: 'success',
  });

  displayFailureAlert = errorMessage => this.displayAlert({
    message: errorMessage,
    type: 'danger',
  });

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  }

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  setIsSubmitting = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_IS_SUBMITTING,
      isSubmitting,
    });
  }

  displayAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    const alert = {
      message,
      type,
    };
    this.store.dispatch({
      intent,
      alert,
    });
  }

  setSelectedTab = (selectedTab) => {
    this.store.dispatch({
      intent: SET_SELECTED_TAB,
      selectedTab,
    });
  }

  handlers = {
    SAVE_ACTION: this.saveLinkedAccounts,
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };

  run(context) {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(true);
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
