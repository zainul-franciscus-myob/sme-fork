import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsPageEdited,
  getModalType,
  getPendingTab,
  getSelectedTab,
} from './purchaseSettingsSelector';
import { isToggleOn } from '../../splitToggle';
import { mainTabIds } from './tabItems';
import FeatureToggles from '../../FeatureToggles';
import LoadingState from '../../components/PageView/LoadingState';
import PurchaseSettingsView from './components/PurchaseSettingsView';
import Store from '../../store/Store';
import createPurchaseSettingsDispatcher from './createPurchaseSettingsDispatcher';
import createPurchaseSettingsIntegrator from './createPurchaseSettingsIntegrator';
import isFeatureEnabled from '../../common/feature/isFeatureEnabled';
import keyMap from '../../hotKeys/keyMap';
import modalTypes from './modalTypes';
import openBlob from '../../common/blobOpener/openBlob';
import purchaseSettingsReducer from './purchaseSettingsReducer';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class PurchaseSettingsModule {
  constructor({
    integration,
    setRootView,
    replaceURLParams,
    navigateTo,
    featureToggles,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(purchaseSettingsReducer);
    this.dispatcher = createPurchaseSettingsDispatcher(this.store);
    this.integrator = createPurchaseSettingsIntegrator(this.store, integration);
    this.replaceURLParams = replaceURLParams;
    this.navigateTo = navigateTo;
    this.featureToggles = featureToggles;
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  loadPurchaseSettings = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadPurchaseSettings(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);

    this.integrator.loadPurchaseSettings({
      onSuccess,
      onFailure,
    });
  };

  exportPdf = () => {
    const onSuccess = (data) => {
      openBlob({
        blob: data,
        filename: 'RemittanceAdviceSample',
        shouldDownload: true,
      });
    };

    const onFailure = () => {};

    this.integrator.loadSamplePdf({ onSuccess, onFailure });
  };

  updateEmailSettingsField = ({ key, value }) => {
    this.dispatcher.updateEmailSettingsField({ key, value });
  };

  saveEmailSettings = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.saveEmailSettings({ onSuccess, onFailure });
  };

  switchTab = (selectedTab) => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setPendingTab(selectedTab);
      this.dispatcher.openModal(modalTypes.SWITCH_TAB);
    } else {
      this.dispatcher.setTab(selectedTab);
      this.replaceURLParams({ selectedTab });
    }
  };

  onConfirmSwitchTab = () => {
    const state = this.store.getState();
    const pendingTab = getPendingTab(state);

    this.dispatcher.setTab(pendingTab);
    this.dispatcher.closeModal();
    this.replaceURLParams({ selectedTab: pendingTab });
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.setRedirectUrl(url);
      this.dispatcher.openModal(modalTypes.UNSAVED);
    } else {
      this.navigateTo(url);
    }
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);

    if (modalType) return;

    const selectTab = getSelectedTab(state);

    const handler = {
      [mainTabIds.emailDefaults]: this.saveEmailSettings,
    }[selectTab];

    if (handler) {
      handler();
    }
  };

  handlers = { SAVE_ACTION: this.saveHandler };

  run(context) {
    const isPurchaseOrderEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isPurchaseOrderEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.PurchaseOrders),
    });

    this.dispatcher.setInitialState({ ...context, isPurchaseOrderEnabled });

    setupHotKeys(keyMap, this.handlers);
    this.loadPurchaseSettings();

    this.render();
  }

  render = () => {
    const view = (
      <PurchaseSettingsView
        onUpdateEmailSettingsField={this.updateEmailSettingsField}
        onConfirmSwitchTab={this.onConfirmSwitchTab}
        onTabSelect={this.switchTab}
        saveEmailSettings={this.saveEmailSettings}
        onDismissAlert={this.dispatcher.dismissAlert}
        exportPdf={this.exportPdf}
        onCloseModal={this.dispatcher.closeModal}
      />
    );

    const wrappedView = <Provider store={this.store}>{view}</Provider>;
    this.setRootView(wrappedView);
  };
}
