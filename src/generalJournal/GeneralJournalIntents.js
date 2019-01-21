const GeneralJournalIntents = {
  UPDATE_FILTER_OPTIONS: Symbol('Update Filter Options'),
  LOAD_GENERAL_JOURNAL_DETAIL: Symbol('Load details for a single journal entry'),
  LOAD_NEW_GENERAL_JOURNAL_DETAIL: Symbol('Load a new empty single journal entry'),
  UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS: Symbol('Update general journal detail header options'),
  DELETE_GENERAL_JOURNAL_DETAIL: Symbol('Delete a general journal detail entry'),
  CREATE_GENERAL_JOURNAL_DETAIL: Symbol('Create a new general journal detail entry'),
  SAVE_GENERAL_JOURNAL_DETAIL: Symbol('Save a general journal detail entry'),
  UPDATE_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Update general journal detail line'),
  ADD_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Add general journal detail line'),
  DELETE_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Delete general journal detail line'),
  REORDER_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Reorder general journal detail line'),
  OPEN_MODAL: Symbol('Open a modal'),
  CLOSE_MODAL: Symbol('Close a modal'),
  SET_ALERT_MESSAGE: Symbol('Set alert message'),
  SET_LOADING_STATE: Symbol('Set loading state'),
  SET_SUBMITTING_STATE: Symbol('Set submitting state'),
  GET_CALCULATED_TAX: Symbol('Get calculated tax'),
  FORMAT_GENERAL_JOURNAL_DETAIL_LINE: Symbol('Format general journal detail line'),
};

export default GeneralJournalIntents;
