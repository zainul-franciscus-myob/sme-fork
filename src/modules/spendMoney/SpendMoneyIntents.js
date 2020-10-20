export const LOAD_NEW_SPEND_MONEY = Symbol(
  'Load a new empty spend money entry data'
);
export const LOAD_SPEND_MONEY_DETAIL = Symbol('Load a spend money entry data');
export const LOAD_NEW_DUPLICATE_SPEND_MONEY = Symbol(
  'Load new duplicate spend money'
);
export const LOAD_SUPPLIER_EXPENSE_ACCOUNT = Symbol(
  'Load supplier expense account'
);
export const LOAD_REFERENCE_ID = Symbol('Load the reference id');
export const CREATE_SPEND_MONEY = Symbol('Create a new spend money entry');
export const DELETE_SPEND_MONEY = Symbol('Delete spend money transaction');
export const UPDATE_SPEND_MONEY = Symbol('Update a spend money entry');
export const UPDATE_SPEND_MONEY_HEADER = Symbol('Update spend money header');
export const UPDATE_SPEND_MONEY_LINE = Symbol('Update spend money line');
export const ADD_SPEND_MONEY_LINE = Symbol('Add spend money line');
export const DELETE_SPEND_MONEY_LINE = Symbol('Delete spend money line');
export const OPEN_MODAL = Symbol('Open a modal');
export const CLOSE_MODAL = Symbol('Close a modal');
export const SET_ALERT = Symbol('Set alert');
export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_SUPPLIER_BLOCKING_STATE = Symbol(
  'Set supplier blocking state'
);
export const GET_TAX_CALCULATIONS = Symbol('Get tax calculations');
export const RESET_TOTALS = Symbol('Reset calculated totals');
export const ADD_ATTACHMENTS = Symbol('Add attachments');
export const UPLOAD_ATTACHMENT = Symbol('Upload attachment');
export const UPDATE_UPLOAD_PROGRESS = Symbol('Update upload progress');
export const UPLOAD_ATTACHMENT_FAILED = Symbol('Upload attachment failed');
export const APPEND_ALERT_MESSAGE = Symbol('Append alert message');
export const OPEN_REMOVE_ATTACHMENT_MODAL = Symbol(
  'Open remove attachment modal'
);
export const REMOVE_ATTACHMENT = Symbol('Remove attachment');
export const REMOVE_ATTACHMENT_BY_INDEX = Symbol('Remove attachment by index');
export const OPEN_ATTACHMENT = Symbol('Open attachment');
export const SET_OPERATION_IN_PROGRESS_STATE = Symbol(
  'Set operation in progress state'
);
export const SET_SHOW_SPLIT_VIEW = Symbol('Set show split view');
export const DOWNLOAD_IN_TRAY_DOCUMENT = Symbol('Download in tray document');
export const PREFILL_DATA_FROM_IN_TRAY = Symbol('Prefill data from in tray');
export const SET_IN_TRAY_DOCUMENT_URL = Symbol('Set in tray document url');
export const CLEAR_IN_TRAY_DOCUMENT_URL = Symbol('Clear in tray document url');
export const HIDE_PREFILL_INFO = Symbol('Hide prefill info');
export const LINK_IN_TRAY_DOCUMENT = Symbol('Link in tray document');

export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load an account after create');
export const LOAD_CONTACT = Symbol('Load a contact');
export const PREFILL_SPEND_MONEY_ON_CONTACT = Symbol(
  'Prefill spend money based on a contact'
);
export const SET_CONTACT_TYPE = Symbol('Set contact type');
export const CLEAR_CONTACT_TYPE = Symbol('clear contact type');
export const CLEAR_IS_REPORTABLE = Symbol('clear is reportable');
export const LOAD_JOB_AFTER_CREATE = Symbol('Load job after create');
export const SET_JOB_LOADING_STATE = Symbol('Set job loading state');
export const RESET_BANK_STATEMENT_TEXT = Symbol('Reset bank statement text');
export const UPDATE_BANK_STATEMENT_TEXT = Symbol('Update bank statement text');
export const SET_DUPLICATE_ID = Symbol('Set duplicate id');
export const SET_PREFILL_NEW = Symbol('Set prefill new');
export const SET_PREFILL_INTRAY_DOCUMENT_ID = Symbol(
  'Set prefill in tray document id'
);

export const LOAD_ABN_FROM_CONTACT = Symbol('Load abn given a contact id');
export const SET_ABN_LOADING_STATE = Symbol('Set abn loading state');
export const CLEAR_ABN = Symbol('Clear the abn');

export const SET_VIEWED_ACCOUNT_TOOL_TIP_STATE = Symbol(
  'Set the viewed Account tool tip state'
);
