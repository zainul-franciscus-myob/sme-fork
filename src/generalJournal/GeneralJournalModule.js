import React from 'react';

import GeneralJournalIntents from './GeneralJournalIntents';
import GeneralJournalTableRowView from './components/GeneralJournalTableRow';
import GeneralJournalView from './components/GeneralJournalView';
import Store from '../store/Store';
import generalJournalReducer from './generalJournalReducer';

export default class GeneralJournalModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(generalJournalReducer);
    this.setRootView = setRootView;
    this.businessId = '';
  }

  render = (state) => {
    const renderGeneralJournalEntries = tableConfig => (
      GeneralJournalTableRowView(state.entries, tableConfig)
    );

    this.setRootView(<GeneralJournalView
      renderRows={renderGeneralJournalEntries}
      isEmpty={state.entries.length === 0}
      onUpdateFilters={this.updateFilterOptions}
      filterOptions={state.filterOptions}
      onApplyFilter={this.filterGeneralJournalEntries}
      onDateSort={this.sortGeneralJournalEntries}
      order={state.order}
    />);
  };

  loadGeneralJournalEntries = () => {
    const intent = GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries, order, ...filterOptions }) => {
      this.store.publish({
        intent,
        entries,
        filterOptions,
        order,
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
      params: { order: this.store.state.order, ...this.store.state.filterOptions },
      onSuccess,
      onFailure,
    });
  };

  sortGeneralJournalEntries = () => {
    const intent = GeneralJournalIntents.SORT_GENERAL_JOURNAL_ENTRIES;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ entries, order }) => {
      this.store.publish({
        intent,
        entries,
        order,
      });
    };

    const onFailure = () => {
      console.log('Failed to sort general journal entries');
    };

    this.integration.read({
      intent,
      urlParams,
      params: { order: this.store.state.order, ...this.store.state.filterOptions },
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

  run(context) {
    this.businessId = context.businessId;
    this.store.subscribe(this.render);
    this.loadGeneralJournalEntries();
  }
}
