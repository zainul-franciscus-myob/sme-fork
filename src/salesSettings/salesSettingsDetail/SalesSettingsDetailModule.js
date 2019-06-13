import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS, SAVE_TAB_DATA, SET_ALERT,
  SET_LOADING_STATE, SET_PENDING_TAB,
  SET_SUBMITTING_STATE,
  SET_TAB,
  UPDATE_EMAIL_SETTINGS,
  UPDATE_SALES_SETTINGS,
  UPDATE_SALES_SETTINGS_ITEM,
} from '../SalesSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getBusinessId, getIsPageEdited,
  getTabData,
} from './SalesSettingsDetailSelectors';
import SalesSettingsView from './components/SalesSettingsDetailView';
import Store from '../../store/Store';
import salesSettingsReducer from './salesSettingsDetailReducer';

export default class SalesSettingsModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(salesSettingsReducer);
    this.setRootView = setRootView;
  }

  loadSalesSettings = () => {
    const state = this.store.getState();
    const intent = LOAD_SALES_SETTINGS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load sale setting');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  saveDataTab = () => {
    this.store.dispatch({
      intent: SAVE_TAB_DATA,
    });
  };

  updateSalesSettings = () => {
    const intent = UPDATE_SALES_SETTINGS;
    const state = this.store.getState();
    const content = getTabData(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert('success', message);
      this.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert('danger', message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  switchTab = (selectedTab) => {
    if (getIsPageEdited(this.store.getState())) {
      this.setPendingTab(selectedTab);
    } else {
      this.setTab(selectedTab);
    }
  };

  setTab = (selectedTab) => {
    this.store.dispatch({
      intent: SET_TAB,
      selectedTab,
    });
  };

  confirmPendingTab = () => {
    const state = this.store.getState();
    this.setTab(state.pendingTab);
  }

  setPendingTab = (pendingTab) => {
    this.store.dispatch({
      intent: SET_PENDING_TAB,
      pendingTab,
    });
  };

  clearPendingTab = () => this.setPendingTab('');

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  };

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  };

  setSubmittingState = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  };

  displayAlert = (type, message) => this.store.dispatch({
    intent: SET_ALERT,
    alert: {
      type,
      message,
    },
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT,
    alert: {},
  });

  updateSalesSettingsItem = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SALES_SETTINGS_ITEM,
      key,
      value,
    });
  };

  updateEmailSettings = ({ key, value }) => {
    const intent = UPDATE_EMAIL_SETTINGS;
    this.store.dispatch({
      intent,
      key,
      value,
    });
  };

  saveEmailSettings = () => {
    const intent = SAVE_EMAIL_SETTINGS;
    const state = this.store.getState();
    const content = getTabData(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert('success', message);
      this.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert('danger', message);
    };

    this.setSubmittingState(true);
    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  render = () => {
    const salesSettingsView = (
      <SalesSettingsView
        onDismissAlert={this.dismissAlert}
        onUpdateSalesSettingsItem={this.updateSalesSettingsItem}
        onSalesSettingsSave={this.updateSalesSettings}
        onTabSelect={this.switchTab}
        onModalConfirm={this.confirmPendingTab}
        onModalCancel={this.clearPendingTab}
        onUpdateEmailSettings={this.updateEmailSettings}
        onSaveEmailSettings={this.saveEmailSettings}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {salesSettingsView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.setLoadingState(true);
    this.loadSalesSettings();
  };

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
