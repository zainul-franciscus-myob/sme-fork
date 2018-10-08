const GeneralJournalIntents = {
  LOAD_GENERAL_JOURNAL_ENTRIES: Symbol('Load all general journal entry data'),
  FILTER_GENERAL_JOURNAL_ENTRIES: Symbol('Filter general journal entry data'),
  UPDATE_FILTER_OPTIONS: Symbol('Update Filter Options'),
  SORT_GENERAL_JOURNAL_ENTRIES: Symbol('Sort general journal entry data'),
  LOAD_GENERAL_JOURNAL_DETAIL: Symbol('Load details for a single journal entry'),
  UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS: Symbol('Update general journal detail header options'),
  UPDATE_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Update general journal detail line'),
  ADD_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Add general journal detail line'),
  DELETE_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Delete general journal detail line'),
  REORDER_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Reorder general journal detail line'),
  FORMAT_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Format general journal detail line'),
};

export default GeneralJournalIntents;
