const GeneralJournalIntents = {
  LOAD_GENERAL_JOURNAL_ENTRIES: Symbol('Load all general journal entry data'),
  FILTER_GENERAL_JOURNAL_ENTRIES: Symbol('Filter general journal entry data'),
  UPDATE_FILTER_OPTIONS: Symbol('Update Filter Options'),
  SORT_GENERAL_JOURNAL_ENTRIES: Symbol('Sort general journal entry data'),
};

export default GeneralJournalIntents;
