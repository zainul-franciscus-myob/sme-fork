export const LOAD_NEW_BILL = Symbol('Load new bill');
export const LOAD_NEW_DUPLICATE_BILL = Symbol('Load new duplicate bill');
export const LOAD_BILL = Symbol('Load bill');
export const RELOAD_BILL = Symbol('Reload bill');
export const LOAD_SUPPLIER_DETAIL = Symbol('Load supplier detail');
export const RESET_SUPPLIER = Symbol('Reset the supplier');
export const UPDATE_BILL_OPTION = Symbol('Update bill option');
export const UPDATE_LAYOUT = Symbol('Update layout');
export const OPEN_MODAL = Symbol('Open modal');
export const CLOSE_MODAL = Symbol('Close modal');
export const OPEN_ALERT = Symbol('Open alert');
export const CLOSE_ALERT = Symbol('Close alert');
export const DELETE_BILL = Symbol('Delete bill');
export const CREATE_BILL = Symbol('Create bill');
export const UPDATE_BILL = Symbol('Update bill');
export const START_LOADING = Symbol('Start loading');
export const STOP_LOADING = Symbol('Stop loading');
export const FAIL_LOADING = Symbol('Fail loading');
export const START_BLOCKING = Symbol('Start blocking');
export const STOP_BLOCKING = Symbol('Stop blocking');
export const START_MODAL_BLOCKING = Symbol('Start modal blocking');
export const STOP_MODAL_BLOCKING = Symbol('Stop modal blocking');
export const REMOVE_BILL_LINE = Symbol('Remove bill line');
export const PREFILL_BILL_FROM_IN_TRAY = Symbol('Prefill bill from in tray');
export const UPDATE_BILL_ID = Symbol('Update bill id');
export const START_LOADING_MORE = Symbol('Start loading more');
export const STOP_LOADING_MORE = Symbol('Stop loading more');

export const ADD_BILL_LINE = Symbol('Add bill line');
export const UPDATE_BILL_LINE = Symbol('Update bill line');
export const LOAD_ITEM_DETAIL_FOR_LINE = Symbol('Load item detail for line');
export const GET_TAX_CALCULATIONS = Symbol('Get tax calculations');
export const CALCULATE_LINE_AMOUNTS = Symbol('Calculate line amounts');

export const EXPORT_BILL_PDF = Symbol('Export bill pdf');
export const UPDATE_EXPORT_PDF_DETAIL = Symbol('Update pdf detail');

export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load account after create');

export const SET_UPGRADE_MODAL_SHOWING = Symbol('Set upgrade modal showing');

export const SET_SHOW_SPLIT_VIEW = Symbol('Set show split view');
export const SET_IN_TRAY_DOCUMENT_ID = Symbol('Set in tray document id');
export const DOWNLOAD_IN_TRAY_DOCUMENT = Symbol('Download in tray document');
export const UNLINK_IN_TRAY_DOCUMENT = Symbol('Unlink in tray document');
export const SET_DOCUMENT_LOADING_STATE = Symbol('Set document loading state');
export const HIDE_PREFILL_INFO = Symbol('Hide prefill info');
export const LINK_IN_TRAY_DOCUMENT = Symbol('Link in tray document');
export const SET_ATTACHMENT_ID = Symbol('Set attachment id');
export const SET_DUPLICATE_ID = Symbol('Set duplicate id');
export const SET_SOURCE = Symbol('Set source');
export const SET_REDIRECT_URL = Symbol('Set redirect url');

export const LOAD_ABN_FROM_SUPPLIER = Symbol('Load abn given a supplier id');
export const SET_ABN_LOADING_STATE = Symbol('Set abn loading state');
export const UPDATE_ISSUE_DATE = Symbol('Update issue date');
export const CONVERT_TO_PRE_CONVERSION_BILL = Symbol(
  'Convert to pre conversion bill'
);
export const SET_SHOW_PRE_CONVERSION_ALERT = Symbol(
  'Set show pre conversion alert'
);
export const CREATE_PRE_CONVERSION_BILL_DETAIL = Symbol(
  'Create a new pre conversion bill'
);
export const UPDATE_PRE_CONVERSION_BILL_DETAIL = Symbol(
  'Update an existing pre conversion bill'
);
export const DELETE_PRE_CONVERSION_BILL_DETAIL = Symbol(
  'Delete a pre conversion bill'
);
export const CHANGE_BANK_STATEMENT_TEXT = Symbol('Change bank statement text');
export const UPDATE_BANK_STATEMENT_TEXT = Symbol('Update bank statement text');
export const GET_REFERENCE_ID = Symbol('Get referenceId');
export const UPDATE_HEADER_OPTION = Symbol('Update header option');
export const UPDATE_REFERENCE_ID = Symbol('Update referenceId');
export const UPDATE_BILL_PAYMENT_AMOUNT_FIELDS = Symbol(
  'Update bill payment amount fields'
);
export const SET_PAYMENT_MODAL_ALERT = Symbol('Set payment modal alert');
export const SET_PAYMENT_MODAL_SUBMITTING_STATE = Symbol(
  'Set payment modal submitting state'
);
export const LOAD_NEW_BILL_PAYMENT = Symbol('Load new bill payment');
export const SET_PAYMENT_MODAL_LOADING_STATE = Symbol(
  'Set record bill payment modal loading state'
);
export const CREATE_BILL_PAYMENT = Symbol('Create bill payment');
export const SET_VIEWED_ACCOUNT_TOOL_TIP_STATE = Symbol(
  'Set the viewed Account tool tip state'
);
export const UPDATE_BILL_PAYMENT_ID = Symbol('Update Bill Payment Id');
export const UPDATE_SHOULD_SEND_REMITTANCE_ADVICE = Symbol(
  'Update Should Send Remittance Advice'
);

export const LOAD_NEW_BILL_DETAIL_FROM_ORDER = Symbol(
  'Load a new bill from an order'
);
