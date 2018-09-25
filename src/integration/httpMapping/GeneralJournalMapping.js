import GeneralJournalIntents from '../../generalJournal/GeneralJournalIntents';

const GeneralJournalMapping = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/load_general_journal_entries`,
  },
  [GeneralJournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/filter_general_journal_entries`,
  },
  [GeneralJournalIntents.SORT_GENERAL_JOURNAL_ENTRIES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/filter_general_journal_entries`,
  },
};

export default GeneralJournalMapping;
