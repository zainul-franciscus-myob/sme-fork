export const SET_ALERT_MESSAGE = Symbol('Set alert message');
export const SET_LOADING_STATE = Symbol('Set loading state');
export const START_LOADING_MORE = Symbol('Start loading more');
export const STOP_LOADING_MORE = Symbol('Stop loading more');
export const SET_ERROR_STATE = Symbol('Set error state');
export const SET_ALERT = Symbol('Set the Alert of the page');

export const OPEN_MODAL = Symbol('Open a modal');
export const CLOSE_MODAL = Symbol('Close a modal');
export const SET_MODAL_ALERT = Symbol('Set modal alert');
export const START_MODAL_BLOCKING = Symbol('Start modal blocking');
export const STOP_MODAL_BLOCKING = Symbol('Stop modal blocking');

export const LOAD_BANK_TRANSACTIONS = Symbol('Load list of bank transactions');
export const LOAD_BANK_TRANSACTIONS_NEXT_PAGE = Symbol(
  'Load list of bank transactions next page'
);
export const SORT_AND_FILTER_BANK_TRANSACTIONS = Symbol(
  'Sort and filter list of bank transactions'
);
export const SET_TABLE_LOADING_STATE = Symbol('Set Table loading state');
export const UPDATE_FILTER_OPTIONS = Symbol('Update filter Options');
export const UPDATE_PERIOD_DATE_RANGE = Symbol('Update period date range');
export const RESET_FILTERS = Symbol('Reset filters');

export const SET_ENTRY_FOCUS = Symbol('Set the focus state of an entry');
export const SET_ENTRY_HOVERED = Symbol('Set the hover state of an entry');
export const START_ENTRY_LOADING_STATE = Symbol(
  'Start the loading state of an entry'
);
export const STOP_ENTRY_LOADING_STATE = Symbol(
  'Stop the loading state of an entry'
);

export const ALLOCATE_TRANSACTION = Symbol('Allocate a bank transaction');
export const UNALLOCATE_TRANSACTION = Symbol(
  'Unallocate an allocated bank transaction'
);

export const SET_OPEN_ENTRY_LOADING_STATE = Symbol(
  'Set bank transaction open entry loading state'
);
export const SET_OPEN_ENTRY_POSITION = Symbol(
  'Set bank transaction open entry position'
);
export const COLLAPSE_TRANSACTION_LINE = Symbol(
  'Collapse bank transaction entry'
);

export const UPDATE_SPLIT_ALLOCATION_HEADER = Symbol(
  'Update the header of split allocation in accordion table'
);
export const ADD_SPLIT_ALLOCATION_LINE = Symbol('Add split allocation line');
export const UPDATE_SPLIT_ALLOCATION_LINE = Symbol(
  'Update split allocation line'
);
export const DELETE_SPLIT_ALLOCATION_LINE = Symbol(
  'Delete split allocation line'
);
export const SAVE_SPLIT_ALLOCATION = Symbol(
  'Save split allocation transaction'
);
export const LOAD_SPLIT_ALLOCATION = Symbol(
  'Load split allocation transaction'
);
export const LOAD_NEW_SPLIT_ALLOCATION = Symbol(
  'Load new split allocation transaction'
);

export const LOAD_MATCH_TRANSACTIONS = Symbol(
  'Load list of match transactions'
);
export const SORT_AND_FILTER_MATCH_TRANSACTIONS = Symbol(
  'Sort and filter list of match transactions'
);
export const SAVE_MATCH_TRANSACTION = Symbol('Save match transaction');
export const SHOW_SELECTED_MATCH_TRANSACTIONS = Symbol(
  'Show selected matched transaction'
);
export const UPDATE_MATCH_TRANSACTION_OPTIONS = Symbol(
  'Update match transaction filter Options'
);
export const RESET_MATCH_TRANSACTION_OPTIONS = Symbol(
  'Reset match transaction filter Options'
);
export const SET_MATCH_TRANSACTION_SORT_ORDER = Symbol(
  'Set match transaction sort order'
);
export const UPDATE_MATCH_TRANSACTION_SELECTION = Symbol(
  'Update match transaction selection'
);
export const UPDATE_SELECTED_TRANSACTION_DETAILS = Symbol(
  'Update selected transaction details'
);
export const TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE = Symbol(
  'Toggle select all state'
);
export const SET_MATCH_TRANSACTION_LOADING_STATE = Symbol(
  'Set match transaction table loading state'
);
export const ADD_MATCH_TRANSACTION_ADJUSTMENT = Symbol(
  'Add match transaction adjustment'
);
export const UPDATE_MATCH_TRANSACTION_ADJUSTMENT = Symbol(
  'Update match transaction adjustment'
);
export const REMOVE_MATCH_TRANSACTION_ADJUSTMENT = Symbol(
  'Remove match transaction adjustment'
);
export const EXPAND_ADJUSTMENT_SECTION = Symbol('Expand adjustment section');

export const LOAD_MATCH_TRANSFER_MONEY = Symbol(
  'Load a list of matching transfer money'
);
export const SORT_MATCH_TRANSFER_MONEY = Symbol(
  'Sort a list of matching transfer money'
);
export const SET_MATCH_TRANSFER_MONEY_SORT_ORDER = Symbol(
  'Set match transfer money sort order'
);
export const SET_MATCH_TRANSFER_MONEY_SELECTION = Symbol(
  'Set match transfer money selection'
);
export const SET_MATCH_TRANSFER_MONEY_LOADING_STATE = Symbol(
  'Set match transfer money loading state'
);
export const LOAD_TRANSFER_MONEY = Symbol('Load an existing transfer money');
export const LOAD_NEW_TRANSFER_MONEY = Symbol('Load a new transfer money');
export const SET_TRANSFER_MONEY_DETAIL = Symbol('Update the transfer money');
export const SAVE_TRANSFER_MONEY = Symbol('Save transfer money');

export const SELECT_TRANSACTION = Symbol('Select bank transaction');
export const SELECT_ALL_TRANSACTIONS = Symbol('Select all bank transactions');
export const UPDATE_BULK_ALLOCATION_OPTIONS = Symbol(
  'Update bulk allocation options'
);
export const BULK_ALLOCATE_TRANSACTIONS = Symbol('Bulk allocate transactions');
export const SET_BULK_LOADING_STATE = Symbol(
  'Set bulk loading state for bulk allocation'
);
export const RESET_BULK_ALLOCATION = Symbol(
  'Reset the state of the bulk allocation options'
);
export const OPEN_BULK_ALLOCATION = Symbol('Open bulk allocation');
export const CLOSE_BULK_ALLOCATION = Symbol('Close bulk allocation');
export const APPLY_RULE_TO_TRANSACTIONS = Symbol(
  'Apply baning rule to transactions'
);
export const UNSELECT_TRANSACTIONS = Symbol('Unselect transactions');

export const LOAD_ATTACHMENTS = Symbol('Load attachments');
export const SET_ATTACHMENTS_LOADING_STATE = Symbol(
  'Set attachments loading state'
);
export const ADD_ATTACHMENTS = Symbol('Add attachments');
export const UPLOAD_ATTACHMENT = Symbol('Upload attachment');
export const UPDATE_UPLOAD_PROGRESS = Symbol('Update upload progress');
export const UPLOAD_ATTACHMENT_FAILED = Symbol('Upload attachment failed');
export const OPEN_REMOVE_ATTACHMENT_MODAL = Symbol(
  'Open remove attachment modal'
);
export const OPEN_ATTACHMENT = Symbol('Open attachment');
export const REMOVE_ATTACHMENT = Symbol('Remove attachment');
export const REMOVE_ATTACHMENT_BY_INDEX = Symbol('Remove attachment by index');
export const LINK_IN_TRAY_DOCUMENT = Symbol('Link in tray document');
export const SET_OPERATION_IN_PROGRESS_STATE = Symbol(
  'Set operation in progress state'
);

export const SET_EDITING_NOTE_STATE = Symbol('Set editing note state');
export const SET_SUBMMITTING_NOTE_STATE = Symbol('Set submitting note state');
export const SET_PENDING_NOTE = Symbol('Set pending note');

export const SAVE_PENDING_NOTE = Symbol('Save pending note');

export const LOAD_ACCOUNT_AFTER_CREATE = Symbol(
  'Load account detail after create'
);
export const APPEND_NEW_ACCOUNT_TO_ALLOCATE_TABLE = Symbol(
  'Append new account to allocate table'
);
export const SET_LOADING_SINGLE_ACCOUNT_STATE = Symbol(
  'Set loading single account state'
);

export const LOAD_JOB_AFTER_CREATE = Symbol('Load job after create');
export const SET_JOB_LOADING_STATE = Symbol('Set job loading state');
