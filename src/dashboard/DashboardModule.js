import { Provider } from 'react-redux';
import React from 'react';

import DashboardView from './components/DashboardView';
import Store from '../store/Store';
import createDashboardDispatcher from './createDashboardDispatcher';
import createDashboardIntegrator from './createDashboardIntegrator';
import dashboardReducer from './reducers/dashboardReducer';

export default class DashboardModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(dashboardReducer);
    this.setRootView = setRootView;
    this.dispatcher = createDashboardDispatcher(this.store);
    this.integrator = createDashboardIntegrator(this.store, integration);
  }

  loadDashboard = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadDashboard(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
    };

    this.integrator.loadDashboard({ onSuccess, onFailure });
  }

  loadSales = () => {
    this.dispatcher.setSalesErrorState(false);
    this.dispatcher.setSalesLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setSalesLoadingState(false);
      this.dispatcher.loadSales(payload);
    };

    const onFailure = () => {
      this.dispatcher.setSalesLoadingState(false);
      this.dispatcher.setSalesErrorState(true);
    };

    this.integrator.loadSales({ onSuccess, onFailure });
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  }

  render = () => {
    const dashboardView = (
      <DashboardView
        onDismissAlert={this.dispatcher.dismissAlert}
        onLinkClick={this.redirectToUrl}
        onSalesReload={this.loadSales}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {dashboardView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run = (context) => {
    this.setInitialState(context);
    this.render();

    this.loadDashboard();
    this.loadSales();
  }
}
