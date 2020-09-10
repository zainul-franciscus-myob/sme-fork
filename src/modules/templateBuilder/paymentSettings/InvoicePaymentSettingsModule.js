import { Provider } from 'react-redux';
import React from 'react';

import { getBusinessId, getRegion } from '../../template/templateSelectors';
import {
  getLoadingState,
  getSalesSettingsPayload,
} from '../../salesSettings/salesSettingsDetail/SalesSettingsDetailSelectors';
import { mainTabIds } from '../../salesSettings/salesSettingsDetail/tabItems';
import InvoicePaymentSettingsView from './InvoicePaymentSettingsView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createSalesSettingsDispatcher from '../../salesSettings/salesSettingsDetail/createSalesSettingsDispatcher';
import createSalesSettingsIntegrator from '../../salesSettings/salesSettingsDetail/createSalesSettingsIntegrator';
import salesSettingsReducer from '../../salesSettings/salesSettingsDetail/salesSettingsDetailReducer';

export default class InvoicePaymentSettingsModule {
  constructor({ integration, setRootView, addedPaymentDetails }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(salesSettingsReducer);
    this.dispatcher = createSalesSettingsDispatcher(this.store);
    this.integrator = createSalesSettingsIntegrator(this.store, integration);
    this.addedPaymentDetailsCallback = addedPaymentDetails;
  }

  loadSalesSettings = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSalesSettings(response);
      this.dispatcher.setTab(mainTabIds.payments);
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

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
      this.addedPaymentDetailsCallback();
      this.dispatcher.saveDataTab();
      this.redirectToEmailSettings();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.updateSalesSettings({ onSuccess, onFailure, content });
  };

  render = () => {
    this.setRootView(
      <Provider store={this.store}>
        <InvoicePaymentSettingsView
          onDismissAlert={this.dispatcher.dismissAlert}
          onSalesSettingsSave={this.updateSalesSettings}
          onUpdateSalesSettingsItem={this.dispatcher.updateSalesSettingsItem}
        />
      </Provider>
    );
  };

  redirectToPath = (path) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToEmailSettings = () => {
    this.redirectToPath('/invoiceEmailSettings');
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
