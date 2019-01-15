import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_ENTRY,
  SUCCESSFULLY_SAVED_ENTRY,
} from '../receiveMoneyMessageTypes';
import {
  getFilterOptions, getSortOrder,
} from './ReceiveMoneyListSelectors';
import ReceiveMoneyIntents from '../ReceiveMoneyIntents';
import ReceiveMoneyListView from './components/ReceiveMoneyListView';
import Store from '../../store/Store';
import SystemIntents from '../../SystemIntents';
import receiveMoneyListReducer from './receiveMoneyListReducer';

export default class ReceiveMoneyListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(receiveMoneyListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = [SUCCESSFULLY_SAVED_ENTRY, SUCCESSFULLY_DELETED_ENTRY];
  }

  render = () => {
    const receiveMoneyView = (
      <ReceiveMoneyListView
        businessId={this.businessId}
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.filterReceiveMoneyEntries}
        onSort={this.sortReceiveMoneyEntries}
        onDismissAlert={this.dismissAlert}
        onCreateNewEntry={this.newReceiveMoneyEntry}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {receiveMoneyView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  newReceiveMoneyEntry = () => {
    window.location.href = `/#/${this.businessId}/receiveMoney/new`;
  };

  loadReceiveMoneyEntries = () => {
    const { state } = this.store;

    const intent = ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_ENTRIES;
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({
      entries,
      sortOrder,
      ...filterOptions
    }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        filterOptions,
        sortOrder,
      });
    };

    const onFailure = () => {
      console.log('Failed to load receive money entries');
    };

    const filterOptions = getFilterOptions(state);

    this.integration.read({
      intent,
      params: {
        ...filterOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  filterReceiveMoneyEntries = () => {
    const { state } = this.store;
    this.setTableLoadingState(true);

    const intent = ReceiveMoneyIntents.FILTER_RECEIVE_MONEY_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
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

  sortReceiveMoneyEntries = () => {
    const { state } = this.store;
    const intent = ReceiveMoneyIntents.SORT_RECEIVE_MONEY_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries, sortOrder }) => {
      this.store.dispatch({
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
    const intent = ReceiveMoneyIntents.SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  }


  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    const intent = ReceiveMoneyIntents.SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = ReceiveMoneyIntents.SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  updateFilterOptions = ({ filterName, value }) => {
    const intent = ReceiveMoneyIntents.UPDATE_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterName,
      value,
    });
  };

  dismissAlert = () => {
    const intent = ReceiveMoneyIntents.SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  run(context) {
    this.businessId = context.businessId;
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.loadReceiveMoneyEntries();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
