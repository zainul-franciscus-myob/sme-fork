import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_SUPER_FUND, SUCCESSFULLY_SAVED_SUPER_FUND } from './PayrollSettingsMessageTypes';
import {
  getBusinessId, getRegion, getTab, getURLParams,
} from './selectors/payrollSettingsSelectors';
import { getNewSortOrder } from './selectors/superFundListSelectors';
import { tabIds } from './tabItems';
import PayrollSettingsView from './components/PayrollSettingsView';
import Store from '../store/Store';
import createPayrollSettingsDispatcher from './createPayrollSettingsDispatcher';
import createPayrollSettingsIntegrator from './createPayrollSettingsIntegrator';
import payrollSettingsReducer from './reducer/payrollSettingsReducer';

const messageTypes = [SUCCESSFULLY_DELETED_SUPER_FUND, SUCCESSFULLY_SAVED_SUPER_FUND];

export default class PayrollSettingsModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(payrollSettingsReducer);
    this.replaceURLParams = replaceURLParams;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createPayrollSettingsDispatcher(this.store);
    this.integrator = createPayrollSettingsIntegrator(this.store, integration);
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  }

  dismissAlert = () => {
    this.dispatcher.dismissAlert();
  }

  updateURLFromState = state => this.replaceURLParams(getURLParams(state))

  setTab = (selectedTab) => {
    this.dispatcher.setTab(selectedTab);

    const state = this.store.getState();
    const tab = getTab(state);

    this.loadTabContent(tab);
  }

  loadTabContent = (selectedTab) => {
    const loadData = {
      [tabIds.superFundList]: this.loadSuperFundList,
    }[selectedTab] || (() => {});

    loadData();
  }

  loadSuperFundList = () => {
    this.dispatcher.setSuperFundListLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListLoadingState(false);
      this.dispatcher.loadSuperFundList(response);
    };

    const onFailure = () => {
      console.log('Failed to load super fund entries');
    };

    this.integrator.loadSuperFundList({ onSuccess, onFailure });
  }

  filterSuperFundList = () => {
    this.dispatcher.setSuperFundListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.filterSuperFundList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterSuperFundList({ onSuccess, onFailure });
  }

  sortSuperFundList = (orderBy) => {
    this.dispatcher.setSuperFundListTableLoadingState(true);

    const state = this.store.getState();
    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSuperFundListSortOrder(orderBy, sortOrder);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.sortSuperFundList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortSuperFundList({
      orderBy, sortOrder, onSuccess, onFailure,
    });
  }

  redirectToCreateSuperFund= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/superFund/new`;
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    this.render();
    this.readMessages();
    this.setTab(context.tab);
  }

  render = () => {
    const view = (
      <PayrollSettingsView
        onDismissAlert={this.dispatcher.dismissAlert}
        onSelectTab={this.setTab}
        superFundListeners={{
          onCreateButtonClick: this.redirectToCreateSuperFund,
          onUpdateFilterOptions: this.dispatcher.setSuperFundListFilterOptions,
          onApplyFilter: this.filterSuperFundList,
          onSort: this.sortSuperFundList,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );
    this.setRootView(wrappedView);
  }
}
