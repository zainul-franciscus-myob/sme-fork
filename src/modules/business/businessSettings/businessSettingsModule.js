import { Provider } from 'react-redux';
import React from 'react';

import {
  getDashboardUrl,
  getIsPageEdited,
  getIsSubmitting,
  getModal,
  getModalUrl,
  getPendingTab,
  getSelectedTab,
} from './businessSettingsSelectors';
import { mainTabIds } from './tabItems';
import BusinessSettingsView from './components/BusinessSettingsView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import businessDetailReducer from './businessSettingsReducer';
import createBusinessSettingsDispatcher from './createBusinessSettingsDispatcher';
import createBusinessSettingsIntegrator from './createBusinessSettingsIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import modalTypes from './modalTypes';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BusinessSettingsModule {
  constructor({
    integration,
    setRootView,
    globalCallbacks: { businessDetailsConfirmed },
    navigateTo,
    loadGlobalBusinessDetails,
    replaceURLParams,
    featureToggles,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(businessDetailReducer);
    this.businessDetailsConfirmed = businessDetailsConfirmed;
    this.dispatcher = createBusinessSettingsDispatcher(this.store);
    this.integrator = createBusinessSettingsIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
    this.loadGlobalBusinessDetails = loadGlobalBusinessDetails;
    this.replaceURLParams = replaceURLParams;
    this.shouldDisplayAccountBillingMenuText =
      featureToggles?.shouldDisplayAccountBillingMenuText;
  }

  loadBusinessSettings = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBusinessSettings(response);
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.loadBusinessSettings({ onSuccess, onFailure });
  };

  switchTab = (selectedTab) => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setPendingTab(selectedTab);
      this.dispatcher.openModal(selectedTab, modalTypes.switchTab);
    } else {
      this.dispatcher.setTab(selectedTab);
      this.replaceURLParams({ selectedTab });
    }
  };

  onConfirmSwitchTab = () => {
    const pendingTab = getPendingTab(this.store.getState());

    this.dispatcher.discardTabData();
    this.dispatcher.setTab(pendingTab);
    this.dispatcher.closeModal();
    this.replaceURLParams({ selectedTab: pendingTab });
  };

  updateBusinessDetailField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateBusinessDetails({ key, value });
  };

  updateGstSettingsField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateGstSettings({ key, value });
  };

  updatePreferencesField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updatePreferences({ key, value });
  };

  updateFinancialYearSettingsField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateFinancialYearSettings({ key, value });
  };

  updateLockDateDetail = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateLockDateDetail({ key, value });
  };

  updateGstSettings = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPageEditedState(false);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
      this.loadBusinessSettings();
    };

    this.saveGstSettings(onSuccess);
  };

  saveGstSettings = (onSuccess) => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({
        message: error.message,
        type: 'danger',
      });
    };

    this.integrator.saveGstSettings({ onSuccess, onFailure });
  };

  updatePreferences = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPageEditedState(false);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
      this.loadBusinessSettings();
    };

    this.savePreferences(onSuccess);
  };

  savePreferences = (onSuccess) => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({
        message: error.message,
        type: 'danger',
      });
    };

    this.integrator.savePreferences({ onSuccess, onFailure });
  };

  updateBusinessDetails = () => {
    const onSuccess = ({ message }) => {
      this.businessDetailsConfirmed();
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPageEditedState(false);
      this.dispatcher.setIsLockDateAutoPopulated(false);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
      this.dispatcher.setIsFinancialYearSettingsChangedState(false);
      this.loadGlobalBusinessDetails();
      this.loadBusinessSettings();
    };

    this.saveBusinessDetails(onSuccess);
  };

  saveBusinessDetails = (onSuccess) => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({
        message: error.message,
        type: 'danger',
      });
    };

    this.integrator.saveBusinessDetails({ onSuccess, onFailure });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    const dashboardUrl = getDashboardUrl(state);

    if (getIsPageEdited(state)) {
      this.dispatcher.openModal(dashboardUrl, modalTypes.cancel);
    } else {
      this.redirectToUrl(dashboardUrl);
    }
  };

  dismissAlert = () => this.dispatcher.setAlertMessage();

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();

  startNewFinancialYear = () => {
    const onFailure = ({ message }) => {
      this.dispatcher.stopLoadingFinancialYearModal();
      this.dispatcher.closeFinancialYearModal();
      this.dispatcher.setAlertMessage({
        message,
        type: 'danger',
      });
    };

    const onSuccess = (response) => {
      this.dispatcher.stopLoadingFinancialYearModal();
      this.dispatcher.closeFinancialYearModal();
      this.dispatcher.loadBusinessSettings(response);
      this.dispatcher.setAlertMessage({
        message: "Success! You've started a new financial year.",
        type: 'success',
      });
    };

    this.dispatcher.startLoadingFinancialYearModal();

    this.integrator.startNewFinancialYear({
      onSuccess: () =>
        this.integrator.loadBusinessSettings({ onSuccess, onFailure }),
      onFailure,
    });
  };

  render = () => {
    const businessSettingsView = (
      <BusinessSettingsView
        onBusinessDetailsSave={this.updateBusinessDetails}
        onCancelButtonClick={this.openCancelModal}
        onChange={this.updateBusinessDetailField}
        onCloseFinancialYearModal={this.dispatcher.closeFinancialYearModal}
        onConfirmCancel={this.redirectToModalUrl}
        onConfirmClose={this.dispatcher.closeModal}
        onConfirmSave={this.updateAndRedirectToUrl}
        onConfirmSwitchTab={this.onConfirmSwitchTab}
        onDismissAlert={this.dismissAlert}
        onFinancialYearSettingsChange={this.updateFinancialYearSettingsField}
        onGstSettingsSave={this.updateGstSettings}
        onPreferencesSave={this.updatePreferences}
        onLockDateDetailChange={this.updateLockDateDetail}
        onOpenFinancialYearModal={this.dispatcher.openFinancialYearModal}
        onStartNewFinancialYear={this.startNewFinancialYear}
        onTabSelect={this.switchTab}
        onUpdateGstSettings={this.updateGstSettingsField}
        onUpdatePreferences={this.updatePreferencesField}
        shouldDisplayAccountBillingMenuText={
          this.shouldDisplayAccountBillingMenuText
        }
      />
    );

    this.setRootView(
      <Provider store={this.store}>{businessSettingsView}</Provider>
    );
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModal(state);

    if (modalType) return;

    const selectTab = getSelectedTab(state);

    const handler = {
      [mainTabIds.businessDetails]: this.updateBusinessDetails,
      [mainTabIds.gstSettings]: this.updateGstSettings,
      [mainTabIds.preferences]: this.updatePreferences,
    }[selectTab];

    if (handler) {
      handler();
    }
  };

  handlers = { SAVE_ACTION: this.saveHandler };

  redirectToUrl = (url) => {
    if (url) window.location.href = url;
  };

  redirectToModalUrl = () => {
    const url = getModalUrl(this.store.getState());
    this.dispatcher.closeModal();
    this.redirectToUrl(url);
  };

  updateAndRedirectToUrl = () => {
    const onSuccess = () => {
      this.redirectToModalUrl();
    };

    const selectedTab = getSelectedTab(this.store.getState());
    const handler = {
      [mainTabIds.businessDetails]: () => this.saveBusinessDetails(onSuccess),
      [mainTabIds.gstSettings]: () => this.saveGstSettings(onSuccess),
      [mainTabIds.preferences]: () => this.savePreferences(onSuccess),
    }[selectedTab];
    if (handler) {
      handler();
    }
  };

  handlePageTransition = (url) => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.openModal(url, modalTypes.unsaved);
    } else {
      this.redirectToUrl(url);
    }
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.loadBusinessSettings();
  }
}
