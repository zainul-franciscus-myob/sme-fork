import { Provider } from 'react-redux';
import React from 'react';

import {
  getBusinessId,
  getIsPageEdited,
  getIsSubmitting,
  getModalUrl,
  getRegion,
} from './invoiceBusinessSettingsDetailSelectors';
import InvoiceBusinessSettingsView from './components/InvoiceBusinessSettingsView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import businessDetailReducer from './invoiceBusinessDetailReducer';
import createInvoiceBusinessDetailDispatcher from './createInvoiceBusinessDetailDispatcher';
import createInvoiceBusinessDetailIntegrator from './createInvoiceBusinessDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoiceBusinessSettingsModule {
  constructor({ integration, setRootView, setupBusinessDetailsCompleted }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(businessDetailReducer);
    this.dispatcher = createInvoiceBusinessDetailDispatcher(this.store);
    this.integrator = createInvoiceBusinessDetailIntegrator(
      this.store,
      integration
    );
    this.setupBusinessDetailsCallback = setupBusinessDetailsCompleted;
  }

  loadBusinessDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBusinessDetail(response);
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.loadBusinessDetail({ onSuccess, onFailure });
  };

  updateBusinessDetailField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateBusinessDetail({ key, value });
  };

  updateBusinessDetail = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPageEditedState(false);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
      this.setupBusinessDetailsCallback();
      this.redirectToLogoSettings();
    };
    this.saveBusinessDetails(onSuccess);
  };

  redirectToPath = (path) => {
    const state = this.store.getState();
    const region = getRegion(state);
    const businessId = getBusinessId(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToLogoSettings = () => this.redirectToPath('/invoiceLogoSettings');

  saveBusinessDetails = (onSuccess) => {
    const state = this.store.getState();

    if (getIsSubmitting(state)) return;

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

  dismissAlert = () => this.dispatcher.setAlertMessage();

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();

  render = () => {
    const businessDetailsView = (
      <InvoiceBusinessSettingsView
        onChange={this.updateBusinessDetailField}
        onSaveButtonClick={this.updateBusinessDetail}
        onDismissAlert={this.dismissAlert}
        onConfirmSave={this.updateAndRedirectToUrl}
        onConfirmCancel={this.redirectToModalUrl}
        onConfirmClose={this.dispatcher.closeModal}
      />
    );

    this.setRootView(
      <Provider store={this.store}>{businessDetailsView}</Provider>
    );
  };

  handlers = { SAVE_ACTION: this.updateBusinessDetail };

  redirectToUrl = (url) => {
    if (url) window.location.href = url;
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.dispatcher.closeModal();
    this.redirectToUrl(url);
  };

  updateAndRedirectToUrl = () => {
    const onSuccess = () => this.redirectToModalUrl();
    this.saveBusinessDetails(onSuccess);
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.openModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.loadBusinessDetail();
  }
}
