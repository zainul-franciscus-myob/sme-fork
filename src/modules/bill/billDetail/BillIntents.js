export const LOAD_NEW_BILL = Symbol('Load new bill');
export const LOAD_NEW_DUPLICATE_BILL = Symbol('Load new duplicate bill');
export const LOAD_BILL = Symbol('Load bill');
export const LOAD_SUPPLIER_DETAIL = Symbol('Load supplier detail');
export const LOAD_ITEM_OPTION = Symbol('Load item option');
export const LOAD_SUPPLIER_AFTER_CREATE = Symbol('Load supplier after create');
export const START_SUPPLIER_BLOCKING = Symbol('Start supplier blocking');
export const STOP_SUPPLIER_BLOCKING = Symbol('Stop supplier blocking');
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
export const RESET_TOTALS = Symbol('Reset totals');
export const UPDATE_BILL_ID = Symbol('Update bill id');
export const FORMAT_AMOUNT_PAID = Symbol('Format amount paid');
export const START_LOADING_MORE = Symbol('Start loading more');
export const STOP_LOADING_MORE = Symbol('Stop loading more');

export const ADD_BILL_LINE = Symbol('Add bill line');
export const UPDATE_BILL_LINE = Symbol('Update bill line');
export const UPDATE_LINE_ITEM_ID = Symbol('Update line item id');
export const FORMAT_BILL_LINE = Symbol('Format bill line');
export const SET_CALCULATED_BILL_LINES_AND_TOTALS = Symbol('Set calculated bill lines and totals');
export const CALCULATE_BILL_ITEM_CHANGE = Symbol('Calculate bill line totals on item id change');
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
