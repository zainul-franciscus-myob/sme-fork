import React from 'react';

import { LOAD_GENERAL_JOURNAL_ENTRIES } from './JournalIntents';
import GeneralJournalReducer from './GeneralJournalReducer';
import GeneralJournalTableRowView from './GeneralJournalTableRowView';
import GeneralJournalView from './GeneralJournalView';
import Store from '../store/Store';

export default class GeneralJournalModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(GeneralJournalReducer);
    this.setRootView = setRootView;
  }

  render = (state) => {
    const renderGeneralJournalEntries = tableConfig => (
      GeneralJournalTableRowView(state.entries, tableConfig)
    );
    this.setRootView(
      <GeneralJournalView
        renderRows={renderGeneralJournalEntries}
        isEmpty={state.entries.length === 0}
      />,
    );
  };

  run() {
    this.store.subscribe(this.render);
    this.integration.read(
      LOAD_GENERAL_JOURNAL_ENTRIES,
      ({ entries }) => {
        this.store.publish({
          intent: LOAD_GENERAL_JOURNAL_ENTRIES,
          entries,
        });
      },
      () => {
        console.log('Failed to load general journal entries');
      },
    );
  }
}
