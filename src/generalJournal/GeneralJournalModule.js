import React from 'react';

import { SUCCESSFULLY_CREATED_ENTRY } from './GeneralJournalMessageTypes';
import { getOrder } from './GeneralJournalSelectors';
import GeneralJournalAlert from './components/GeneralJournalAlert';
import GeneralJournalIntents from './GeneralJournalIntents';
import GeneralJournalTableRowView from './components/GeneralJournalTableRowView';
import GeneralJournalView from './components/GeneralJournalView';
import Store from '../store/Store';
import generalJournalReducer from './generalJournalReducer';

export default class GeneralJournalModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(generalJournalReducer);
    this.setRootView = setRootView;
    this.businessId = '';
    this.popMessages = popMessages;
    this.messageTypes = [SUCCESSFULLY_CREATED_ENTRY];
  }

  render = (state) => {
    const renderGeneralJournalEntries = tableConfig => (
      GeneralJournalTableRowView(state.entries, tableConfig, this.businessId)
    );

    const alertComponent = state.alertMessage && (
      <GeneralJournalAlert type="success" onDismiss={this.dismissAlert}>
        {state.alertMessage}
      </GeneralJournalAlert>
    );

    this.setRootView(<GeneralJournalView
      renderRows={renderGeneralJournalEntries}
      isEmpty={state.entries.length === 0}
      onUpdateFilters={this.updateFilterOptions}
      filterOptions={state.filterOptions}
      onApplyFilter={this.filterGeneralJournalEntries}
      onSort={this.sortGeneralJournalEntries}
      order={getOrder(state)}
      newGeneralJournalEntry={this.newGeneralJournalEntry}
      alertComponent={alertComponent}
    />);
  };

  dismissAlert = () => {
    const intent = GeneralJournalIntents.SET_ALERT_MESSAGE;

    this.store.publish({
      intent,
      alertMessage: '',
    });
  }

  loadGeneralJournalEntries = () => {
    const intent = GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({
      entries,
      order,
      orderBy,
      ...filterOptions
    }) => {
      this.store.publish({
        intent,
        entries,
        filterOptions,
        order,
        orderBy,
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
    const intent = GeneralJournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries }) => {
      this.store.publish({
        intent,
        entries,
      });
    };

    const onFailure = () => {
      console.log('Failed to filter general journal entries');
    };

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...this.store.state.filterOptions,
        order: this.store.state.order,
        orderBy: this.store.state.orderBy,
      },
      onSuccess,
      onFailure,
    });
  };

  sortGeneralJournalEntries = (sortName) => {
    const intent = GeneralJournalIntents.SORT_GENERAL_JOURNAL_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries, order, orderBy }) => {
      this.store.publish({
        intent,
        entries,
        order,
        orderBy,
      });
    };

    const onFailure = () => {
      console.log('Failed to sort general journal entries');
    };

    const order = this.store.state.order === 'desc' ? 'asc' : 'desc';

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...this.store.state.filterOptions,
        order,
        orderBy: sortName,
      },
      onSuccess,
      onFailure,
    });
  };

  updateFilterOptions = ({ filterName, value }) => {
    const intent = GeneralJournalIntents.UPDATE_FILTER_OPTIONS;

    this.store.publish({
      intent,
      filterName,
      value,
    });
  };

  newGeneralJournalEntry = () => {
    window.location.href = `/#/${this.businessId}/generalJournal/new`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: alertMessage,
      } = successMessage;

      const intent = GeneralJournalIntents.SET_ALERT_MESSAGE;

      this.store.publish({
        intent,
        alertMessage,
      });
    }
  }

  run(context) {
    this.businessId = context.businessId;
    this.store.subscribe(this.render);
    this.readMessages();
    this.loadGeneralJournalEntries();
  }
}
