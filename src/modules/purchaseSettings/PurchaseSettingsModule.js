import { Provider } from 'react-redux';
import React from 'react';

import { getIsPageEdited, getRedirectUrl } from './purchaseSettingsSelector';
import LoadingState from '../../components/PageView/LoadingState';
import PurchaseSettingsView from './components/PurchaseSettingsView';
import Store from '../../store/Store';
import createPurchaseSettingsDispatcher from './createPurchaseSettingsDispatcher';
import createPurchaseSettingsIntegrator from './createPurchaseSettingsIntegrator';
import modalTypes from './modalTypes';
import openBlob from '../../common/blobOpener/openBlob';
import purchaseSettingsReducer from './purchaseSettingsReducer';

export default class PurchaseSettingsModule {
  constructor({ integration, setRootView, navigateTo }) {
    this.setRootView = setRootView;
    this.store = new Store(purchaseSettingsReducer);
    this.dispatcher = createPurchaseSettingsDispatcher(this.store);
    this.integrator = createPurchaseSettingsIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
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
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.saveEmailSettings({ onSuccess, onFailure });
  };

  closeUnsavedModal = () => {
    this.dispatcher.setRedirectUrl('');
    this.dispatcher.closeModal();
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

  discardAndRedirect = () => {
    this.dispatcher.closeModal();
    const state = this.store.getState();
    const url = getRedirectUrl(state);
    this.navigateTo(url);
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.loadPurchaseSettings();

    this.render();
  }

  render = () => {
    const view = (
      <PurchaseSettingsView
        onUpdateEmailSettingsField={this.updateEmailSettingsField}
        saveEmailSettings={this.saveEmailSettings}
        onDismissAlert={this.dispatcher.dismissAlert}
        exportPdf={this.exportPdf}
        onUnsavedModalCancel={this.closeUnsavedModal}
        onUnsavedModalConfirm={this.discardAndRedirect}
      />
    );

    const wrappedView = <Provider store={this.store}>{view}</Provider>;
    this.setRootView(wrappedView);
  };
}
