const GeneralJournalIntents = {
  LOAD_GENERAL_JOURNAL_DETAIL: Symbol('Load a general journal entry data'),
  FORMAT_GENERAL_JOURNAL_LINE: Symbol('Format general journal line'),
  OPEN_MODAL: Symbol('Open a modal'),
  CLOSE_MODAL: Symbol('Close a modal'),
  SET_ALERT_MESSAGE: Symbol('Set alert message'),
  SET_LOADING_STATE: Symbol('Set loading state'),
  SET_SUBMITTING_STATE: Symbol('Set submitting state'),
  DELETE_GENERAL_JOURNAL: Symbol('Delete a general journal entry'),
  UPDATE_GENERAL_JOURNAL_HEADER: Symbol('Update general journal header'),
  LOAD_NEW_GENERAL_JOURNAL: Symbol('Load a new empty general journal entry data'),
  CREATE_GENERAL_JOURNAL: Symbol('Create a new general journal entry'),
  UPDATE_GENERAL_JOURNAL: Symbol('Update a general journal entry'),
  UPDATE_GENERAL_JOURNAL_LINE: Symbol('Update general journal line'),
  ADD_GENERAL_JOURNAL_LINE: Symbol('Add general journal line'),
  DELETE_GENERAL_JOURNAL_LINE: Symbol('Delete general journal line'),
  GET_CALCULATED_TOTALS: Symbol('Get calculated totals'),
  RESET_TOTALS: Symbol('Reset calculated totals'),
};

export default GeneralJournalIntents;
