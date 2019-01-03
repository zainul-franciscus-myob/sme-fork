import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { SUCCESSFULLY_CREATED_ENTRY, SUCCESSFULLY_DELETED_ENTRY } from '../GeneralJournalMessageTypes';
import { getFilterOptions, getOrder, getSortOrder } from './GeneralJournalSelectors';
import Alert from '../../components/Alert/Alert';
import GeneralJournalIntents from '../GeneralJournalIntents';
import GeneralJournalTableRowView from './components/GeneralJournalTableRowView';
import GeneralJournalView from './components/GeneralJournalView';
import Store from '../../store/Store';
import SystemIntents from '../../SystemIntents';
import generalJournalReducer from './generalJournalReducer';

export default class GeneralJournalModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(generalJournalReducer);
    this.setRootView = setRootView;
    this.businessId = '';
    this.popMessages = popMessages;
    this.messageTypes = [SUCCESSFULLY_CREATED_ENTRY, SUCCESSFULLY_DELETED_ENTRY];
  }

  render = (state) => {
    const renderGeneralJournalEntries = tableConfig => (
      GeneralJournalTableRowView(state.entries, tableConfig, this.businessId)
    );

    const alertComponent = state.alertMessage && (
      <Alert type="success" onDismiss={this.dismissAlert}>
        {state.alertMessage}
      </Alert>
    );

    const generalJournalView = (
      <GeneralJournalView
        renderRows={renderGeneralJournalEntries}
        isTableLoading={state.isTableLoading}
        isEmpty={state.entries.length === 0}
        onUpdateFilters={this.updateFilterOptions}
        filterOptions={state.filterOptions}
        onApplyFilter={this.filterGeneralJournalEntries}
        onSort={this.sortGeneralJournalEntries}
        order={getOrder(state)}
        newGeneralJournalEntry={this.newGeneralJournalEntry}
        alertComponent={alertComponent}
      />
    );

    const view = state.isLoading ? (<Spinner />) : generalJournalView;
    this.setRootView(view);
  };

  loadGeneralJournalEntries = () => {
    const intent = GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES;

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
      console.log('Failed to load general journal entries');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  filterGeneralJournalEntries = () => {
    const { state } = this.store;
    this.setTableLoadingState(true);

    const intent = GeneralJournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES;

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

    const onFailure = () => {
      console.log('Failed to filter general journal entries');
    };

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

  sortGeneralJournalEntries = () => {
    const { state } = this.store;
    const intent = GeneralJournalIntents.SORT_GENERAL_JOURNAL_ENTRIES;

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

    const onFailure = () => {
      console.log('Failed to sort general journal entries');
    };

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
        content: alertMessage,
      } = successMessage;

      const intent = GeneralJournalIntents.SET_ALERT_MESSAGE;

      this.store.dispatch({
        intent,
        alertMessage,
      });
    }
  }

  newGeneralJournalEntry = () => {
    window.location.href = `/#/${this.businessId}/generalJournal/new`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    const intent = GeneralJournalIntents.SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = GeneralJournalIntents.SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  updateFilterOptions = ({ filterName, value }) => {
    const intent = GeneralJournalIntents.UPDATE_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterName,
      value,
    });
  };

  dismissAlert = () => {
    const intent = GeneralJournalIntents.SET_ALERT_MESSAGE;
    this.store.dispatch({
      intent,
      alertMessage: '',
    });
  };

  run(context) {
    this.businessId = context.businessId;
    this.store.subscribe(this.render);
    this.readMessages();
    this.setLoadingState(true);
    this.loadGeneralJournalEntries();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
