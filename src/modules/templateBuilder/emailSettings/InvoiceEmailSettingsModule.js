import { Provider } from 'react-redux';
import React from 'react';

import {
  getBusinessId, getLoadingState, getRegion, getSalesSettingsPayload, getTabData,
} from '../../salesSettings/salesSettingsDetail/SalesSettingsDetailSelectors';
import { mainTabIds } from '../../salesSettings/salesSettingsDetail/tabItems';
import InvoiceEmailSettingsView from './InvoiceEmailSettingsView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createSalesSettingsDispatcher from '../../salesSettings/salesSettingsDetail/createSalesSettingsDispatcher';
import createSalesSettingsIntegrator from '../../salesSettings/salesSettingsDetail/createSalesSettingsIntegrator';
import salesSettingsReducer from '../../salesSettings/salesSettingsDetail/salesSettingsDetailReducer';

export default class InvoiceEmailSettingsModule {
  constructor({ integration, setRootView, customisedEmailDefaults }) {
    this.integration = integration;
    this.store = new Store(salesSettingsReducer);
    this.setRootView = setRootView;
    this.dispatcher = createSalesSettingsDispatcher(this.store);
    this.integrator = createSalesSettingsIntegrator(this.store, integration);
    this.customisedEmailDefaults = customisedEmailDefaults;
  }

  loadSalesSettings = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSalesSettings(response);
      this.dispatcher.setTab(mainTabIds.emailDefaults);
    };

    const onFailure = () => this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.loadSalesSettings({ onSuccess, onFailure });
  };

  updateSalesSettings = () => {
    const state = this.store.getState();
    if (getLoadingState(state) === LoadingState.LOADING) return;

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const content = getSalesSettingsPayload(state);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.updateSalesSettings({ onSuccess, onFailure, content });
  };

  redirectToPath = (path) => {
    const state = this.store.getState();
    const region = getRegion(state);
    const businessId = getBusinessId(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToTemplates = () => this.redirectToPath('/salesSettings?selectedTab=templates');

  saveEmailSettings = () => {
    const state = this.store.getState();
    if (getLoadingState(state) === LoadingState.LOADING) return;

    const content = getTabData(state);
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.saveDataTab();
      this.customisedEmailDefaults();
      this.redirectToTemplates();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.saveEmailSettings({ onSuccess, onFailure, content });
  };

  render = () => {
    const salesSettingsView = (
      <InvoiceEmailSettingsView
        onDismissAlert={this.dispatcher.dismissAlert}
        onSalesSettingsSave={this.updateSalesSettings}
        onSaveEmailSettings={this.saveEmailSettings}
        onUpdateEmailSettings={this.dispatcher.updateEmailSettings}
      />
    );

    const wrappedView = <Provider store={this.store}>{salesSettingsView}</Provider>;

    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.render();
    this.loadSalesSettings();
  };
}
