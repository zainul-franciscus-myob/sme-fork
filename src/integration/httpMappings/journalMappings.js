import * as JournalIntents from '../../journal/journalIntents';

export default {
  [JournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/journal/load_general_journal_entries`,
  },
  [JournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/journal/load_general_journal_entries`,
  },
};
