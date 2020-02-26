import { Provider } from 'react-redux';
import React from 'react';

import {
  getShouldShowBanking,
  getShouldShowPurchases,
  getShouldShowSales,
  getShouldShowTracking,
} from './selectors/DashboardSelectors';
import DashboardView from './components/DashboardView';
import Store from '../../store/Store';
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
      this.loadSales();
      this.loadPurchase();
      this.loadTracking();
      this.loadBanking();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
    };

    this.integrator.loadDashboard({ onSuccess, onFailure });
  }

  loadSales = () => {
    if (!getShouldShowSales(this.store.getState())) {
      return;
    }

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

  loadPurchase = () => {
    if (!getShouldShowPurchases(this.store.getState())) {
      return;
    }

    this.dispatcher.setPurchaseErrorState(false);
    this.dispatcher.setPurchaseLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setPurchaseLoadingState(false);
      this.dispatcher.loadPurchase(payload);
    };

    const onFailure = () => {
      this.dispatcher.setPurchaseLoadingState(false);
      this.dispatcher.setPurchaseErrorState(true);
    };

    this.integrator.loadPurchase({ onSuccess, onFailure });
  }

  loadTracking = () => {
    if (!getShouldShowTracking(this.store.getState())) {
      return;
    }

    this.dispatcher.setTrackingErrorState(false);
    this.dispatcher.setTrackingLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTrackingLoadingState(false);
      this.dispatcher.loadTracking(payload);
    };

    const onFailure = () => {
      this.dispatcher.setTrackingLoadingState(false);
      this.dispatcher.setTrackingErrorState(true);
    };

    this.integrator.loadTracking({ onSuccess, onFailure });
  }

  loadTrackingDetail = () => {
    this.dispatcher.setTrackingErrorState(false);
    this.dispatcher.setTrackingDetailLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTrackingDetailLoadingState(false);
      this.dispatcher.loadTrackingDetail(payload);
    };

    const onFailure = () => {
      this.dispatcher.setTrackingDetailLoadingState(false);
      this.dispatcher.setTrackingErrorState(true);
    };

    this.integrator.loadTrackingDetail({ onSuccess, onFailure });
  }

  setTrackingOptions = ({ key, value }) => {
    this.dispatcher.setTrackingOptions({ key, value });
    this.loadTrackingDetail();
  }

  loadBanking = () => {
    if (!getShouldShowBanking(this.store.getState())) {
      return;
    }

    this.dispatcher.setBankingErrorState(false);
    this.dispatcher.setBankingLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setBankingLoadingState(false);
      this.dispatcher.loadBanking(payload);
    };

    const onFailure = () => {
      this.dispatcher.setBankingLoadingState(false);
      this.dispatcher.setBankingErrorState(true);
    };

    this.integrator.loadBanking({ onSuccess, onFailure });
  }

  updateBankFeedAccount = (bankFeedAccount) => {
    const { id } = bankFeedAccount;
    this.dispatcher.setBankFeedAccount(id);
    this.loadBanking();
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
        onPurchaseReload={this.loadPurchase}
        onTrackingReload={this.loadTracking}
        onTrackingChange={this.setTrackingOptions}
        onBankingReload={this.loadBanking}
        onBankFeedAccountChange={this.updateBankFeedAccount}
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
  }
}
