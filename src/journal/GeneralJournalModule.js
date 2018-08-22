import React from 'react';
import Store from '../store/Store';
import GeneralJournalReducer from './GeneralJournalReducer';
import GeneralJournalView from './GeneralJournalView';
import GeneralJournalTableRowView from './GeneralJournalTableRowView';
import {LOAD_GENERAL_JOURNAL_ENTRIES} from './JournalIntents';
import EmptyGeneralJournalTableRowView from './EmptyGeneralJournalTableRowView';

export default class GeneralJournalModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(GeneralJournalReducer);
    this.setRootView = setRootView;
  }

  render = (state) => {
    const hasGeneralJournalEntriesToDisplay = state.entries.length > 0;

    const renderGeneralJournalEntries = tableConfig => (
      <GeneralJournalTableRowView
        tableConfig={tableConfig}
        entries={state.entries}
      />
    );

    const renderEmptyGeneralJournalEntries = () => <EmptyGeneralJournalTableRowView/>;

    const renderGeneralJournalTableRows = hasGeneralJournalEntriesToDisplay
      ? renderGeneralJournalEntries
      : renderEmptyGeneralJournalEntries;

    this.setRootView(<GeneralJournalView renderRows={renderGeneralJournalTableRows}/>);
  };

  run() {
    this.store.subscribe(this.render);
    this.integration.read(
      LOAD_GENERAL_JOURNAL_ENTRIES,
      ({entries}) => {
        this.store.publish({
          intent: LOAD_GENERAL_JOURNAL_ENTRIES,
          entries: entries
        })
      },
      () => {
        console.log("Failed to load general journal entries");
      }
    )
  }
}
