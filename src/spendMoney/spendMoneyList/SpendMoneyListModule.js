import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import {
  SUCCESSFULLY_CREATED_ENTRY,
  SUCCESSFULLY_DELETED_ENTRY,
} from '../spendMoneyMessageTypes';
import {
  getAlert, getFilterOptions, getOrder, getSortOrder, isTableEmpty,
} from './SpendMoneyListSelectors';
import Alert from '../../components/Alert/Alert';
import SpendMoneyIntents from '../SpendMoneyIntents';
import SpendMoneyListView from './components/SpendMoneyListView';
import SpendMoneyTableRowView from './components/SpendMoneyTableRowView';
import Store from '../../store/Store';
import SystemIntents from '../../SystemIntents';
import spendMoneyListReducer from './spendMoneyListReducer';

export default class SpendMoneyListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(spendMoneyListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = [SUCCESSFULLY_CREATED_ENTRY, SUCCESSFULLY_DELETED_ENTRY];
  }

  render = (state) => {
    const renderSpendMoneyEntries = tableConfig => (
      SpendMoneyTableRowView(state.entries, tableConfig, this.businessId)
    );

    const alert = getAlert(state);

    const alertComponent = alert && (
      <Alert type={alert.type} onDismiss={this.dismissAlert}>
        {alert.message}
      </Alert>
    );

    const spendMoneyView = (
      <SpendMoneyListView
        renderRows={renderSpendMoneyEntries}
        isTableLoading={state.isTableLoading}
        isEmpty={isTableEmpty(state)}
        onUpdateFilters={this.updateFilterOptions}
        filterOptions={state.filterOptions}
        onApplyFilter={this.filterSpendMoneyEntries}
        onSort={this.sortSpendMoneyEntries}
        order={getOrder(state)}
        onCreateNewEntry={this.newSpendMoneyEntry}
        alertComponent={alertComponent}
      />
    );

    const view = state.isLoading ? (<Spinner />) : spendMoneyView;
    this.setRootView(view);
  };

  loadSpendMoneyEntries = () => {
    const intent = SpendMoneyIntents.LOAD_SPEND_MONEY_ENTRIES;
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({
      entries,
      sortOrder,
      ...filterOptions
    }) => {
      this.setLoadingState(false);
      this.store.publish({
        intent,
        entries,
        filterOptions,
        sortOrder,
      });
    };

    const onFailure = () => {
      console.log('Failed to load spend money entries');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  filterSpendMoneyEntries = () => {
    const { state } = this.store;
    this.setTableLoadingState(true);

    const intent = SpendMoneyIntents.FILTER_SPEND_MONEY_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries }) => {
      this.setTableLoadingState(false);
      this.store.publish({
        intent,
        entries,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
      },
      onSuccess,
      onFailure,
    });
  };

  sortSpendMoneyEntries = () => {
    const { state } = this.store;
    const intent = SpendMoneyIntents.SORT_SPEND_MONEY_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries, sortOrder }) => {
      this.store.publish({
        intent,
        entries,
        sortOrder,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const requestSortOrder = getSortOrder(state) === 'desc' ? 'asc' : 'desc';
    const filterOptions = getFilterOptions(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: requestSortOrder,
      },
      onSuccess,
      onFailure,
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.setAlert({
        type: 'success',
        message,
      });
    }
  }

  setAlert = ({ message, type }) => {
    const intent = SpendMoneyIntents.SET_ALERT;
    this.store.publish({
      intent,
      alert: {
        message,
        type,
      },
    });
  }

  newSpendMoneyEntry = () => {
    window.location.href = `/#/${this.businessId}/spendMoney/new`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    const intent = SpendMoneyIntents.SET_LOADING_STATE;
    this.store.publish({
      intent,
      isLoading,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SpendMoneyIntents.SET_TABLE_LOADING_STATE;
    this.store.publish({
      intent,
      isTableLoading,
    });
  };

  updateFilterOptions = ({ filterName, value }) => {
    const intent = SpendMoneyIntents.UPDATE_FILTER_OPTIONS;
    this.store.publish({
      intent,
      filterName,
      value,
    });
  };

  dismissAlert = () => {
    const intent = SpendMoneyIntents.SET_ALERT;
    this.store.publish({
      intent,
      alert: undefined,
    });
  };

  run(context) {
    this.businessId = context.businessId;
    this.store.subscribe(this.render);
    this.readMessages();
    this.setLoadingState(true);
    this.loadSpendMoneyEntries();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.publish({
      intent,
    });
  }
}
