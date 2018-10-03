const GeneralJournalIntents = {
  LOAD_GENERAL_JOURNAL_ENTRIES: Symbol('Load all general journal entry data'),
  FILTER_GENERAL_JOURNAL_ENTRIES: Symbol('Filter general journal entry data'),
  UPDATE_FILTER_OPTIONS: Symbol('Update Filter Options'),
  SORT_GENERAL_JOURNAL_ENTRIES: Symbol('Sort general journal entry data'),
  LOAD_GENERAL_JOURNAL_DETAIL: Symbol('Load details for a single journal entry'),
  UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS: Symbol('Update general journal detail header options'),
};

export default GeneralJournalIntents;
