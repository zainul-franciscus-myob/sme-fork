import React from 'react'
import ReactDOM from 'react-dom'
import Store from '../store/Store'
import GeneralJournalReducer from './GeneralJournalReducer'
import GeneralJournalView from './GeneralJournalView'
import GeneralJournalTableRowView from './GeneralJournalTableRowView'
import { LOAD_GENERAL_JOURNAL_ENTRIES } from './JournalIntents'

export default class GeneralJournalModule {
  constructor(integration, domElement) {
    this.integration = integration;
    this.store = new Store(GeneralJournalReducer);
    this.domElement = domElement;
  }

  render = (state) => {
    const renderGeneralJournalEntries = tableConfig => (
      <GeneralJournalTableRowView
        tableConfig={tableConfig}
        entries={state.entries}
      />
    );

    ReactDOM.render(<GeneralJournalView renderRows={renderGeneralJournalEntries}/>, this.domElement);
  }

  run() {
    ReactDOM.render(<p>Loading...</p>, this.domElement);
    this.store.subscribe(this.render);
    this.integration.read(
      LOAD_GENERAL_JOURNAL_ENTRIES,
      ({ entries }) => {
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
