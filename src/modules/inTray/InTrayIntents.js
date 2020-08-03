export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_ALERT = Symbol('Set alert');
export const OPEN_MODAL = Symbol('Open modal');
export const CLOSE_MODAL = Symbol('Close modal');
export const LOAD_IN_TRAY = Symbol('Load in tray');

export const GENERATE_IN_TRAY_EMAIL = Symbol('Generate in tray email');
export const SET_CONFIRMING_EMAIL_GENERATION = Symbol(
  'Sets flag to confirm generating new email'
);
export const SET_UPLOAD_OPTIONS_LOADING_STATE = Symbol(
  'Sets the loading state of the upload options'
);
export const SET_UPLOAD_OPTIONS_ALERT = Symbol('Sets the upload options alert');

export const SORT_AND_FILTER_IN_TRAY_LIST = Symbol(
  'Sort and filter in tray document list'
);
export const SET_IN_TRAY_LIST_FILTER_OPTIONS = Symbol(
  'Set in tray document list filter options'
);

export const RESET_IN_TRAY_LIST_FILTER_OPTIONS = Symbol(
  'Reset in tray document list filter options'
);

export const SET_IN_TRAY_LIST_SORT_ORDER = Symbol(
  'Set in tray document list sort order'
);
export const SET_IN_TRAY_LIST_TABLE_LOADING_STATE = Symbol(
  'Set in tray document list table loading state'
);

export const CREATE_IN_TRAY_DOCUMENT = Symbol('Create in tray document');
export const DELETE_IN_TRAY_DOCUMENT = Symbol('Delete in tray document');
export const DOWNLOAD_IN_TRAY_DOCUMENT = Symbol('Download in tray document');
export const ADD_IN_TRAY_LIST_ENTRY = Symbol('Add in tray list entry');
export const REMOVE_IN_TRAY_LIST_ENTRY = Symbol('Remove in tray list entry');
export const SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE = Symbol(
  'Set in tray list entry submitting state'
);
export const SET_IN_TRAY_DELETE_MODAL = Symbol(
  'Set in tray entry delete modal'
);
export const SET_ACTIVE_ENTRY_ROW = Symbol('Activate an entry in the table');
export const UNSET_ACTIVE_ENTRY_ROW = Symbol('Deactivate an entry');

export const CREATE_IN_TRAY_MODAL_DOCUMENT = Symbol(
  'Create in tray modal document'
);
export const LOAD_IN_TRAY_MODAL = Symbol('Load in tray modal');
export const SORT_AND_FILTER_IN_TRAY_MODAL = Symbol(
  'Sort and filter in tray modal'
);
export const VIEW_IN_TRAY_MODAL_DOCUMENT = Symbol(
  'View in tray modal document'
);
export const SELECT_DOCUMENT = Symbol('Select document');
export const SET_DOCUMENT_VIEWER_URL = Symbol('Set document viewer url');
export const UNSET_DOCUMENT_VIEWER_URL = Symbol('Unset document viewer url');

export const POLL_INTRAY_LIST = Symbol('Poll for OCR status');
