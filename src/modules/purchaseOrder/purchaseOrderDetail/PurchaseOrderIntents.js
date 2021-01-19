export const LOAD_NEW_PURCHASE_ORDER = Symbol('Load new purchase order');
export const LOAD_NEW_DUPLICATE_PURCHASE_ORDER = Symbol(
  'Load new duplicate purchase order'
);
export const LOAD_PURCHASE_ORDER = Symbol('Load purchase order');
export const RELOAD_PURCHASE_ORDER = Symbol('Reload purchase order');
export const RELOAD_PURCHASE_ORDER_FAILED = Symbol(
  'Reload purchase order failed'
);
export const LOAD_SUPPLIER_DETAIL = Symbol('Load supplier detail');
export const LOAD_SUPPLIER_DETAIL_FAILED = Symbol(
  'Load supplier detail failed'
);
export const RESET_SUPPLIER = Symbol('Reset the supplier');
export const RESET_OPEN_SEND_EMAIL = Symbol('Reset open send email');

export const UPDATE_PURCHASE_ORDER_OPTION = Symbol(
  'Update purchase order option'
);
export const UPDATE_LAYOUT = Symbol('Update layout');
export const OPEN_MODAL = Symbol('Open modal');
export const CLOSE_MODAL = Symbol('Close modal');
export const OPEN_ALERT = Symbol('Open alert');
export const CLOSE_ALERT = Symbol('Close alert');
export const DELETE_PURCHASE_ORDER = Symbol('Delete purchase order');
export const DELETING_PURCHASE_ORDER = Symbol('Deleting purchase order');
export const DELETE_PURCHASE_ORDER_FAILED = Symbol(
  'Delete purchase order failed'
);
export const CREATE_PURCHASE_ORDER = Symbol('Create purchase order');
export const UPDATE_PURCHASE_ORDER = Symbol('Update purchase order');
export const START_LOADING = Symbol('Start loading');
export const STOP_LOADING = Symbol('Stop loading');
export const FAIL_LOADING = Symbol('Fail loading');
export const START_BLOCKING = Symbol('Start blocking');
export const STOP_BLOCKING = Symbol('Stop blocking');
export const START_MODAL_BLOCKING = Symbol('Start modal blocking');
export const STOP_MODAL_BLOCKING = Symbol('Stop modal blocking');
export const REMOVE_PURCHASE_ORDER_LINE = Symbol('Remove purchase order line');
export const UPDATE_PURCHASE_ORDER_ID = Symbol('Update purchase order id');
export const START_LOADING_MORE = Symbol('Start loading more');
export const STOP_LOADING_MORE = Symbol('Stop loading more');
export const LOADING_AFTER_CREATE = Symbol('Load after create');

export const ADD_PURCHASE_ORDER_LINE = Symbol('Add purchase order line');
export const UPDATE_PURCHASE_ORDER_LINE = Symbol('Update purchase order line');
export const LOAD_ITEM_DETAIL_FOR_LINE = Symbol('Load item detail for line');
export const LOAD_ITEM_DETAIL_FOR_LINE_FAILED = Symbol(
  'Load item detail for line failed'
);
export const GET_TAX_CALCULATIONS = Symbol('Get tax calculations');
export const CALCULATE_LINE_AMOUNTS = Symbol('Calculate line amounts');

export const EXPORT_PURCHASE_ORDER_PDF = Symbol('Export purchase order pdf');
export const EXPORT_PURCHASE_ORDER_PDF_FAILED = Symbol(
  'Export purchase order pdf failed'
);
export const UPDATE_EXPORT_PDF_DETAIL = Symbol('Update pdf detail');

export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load account after create');

export const LOAD_JOB_AFTER_CREATE = Symbol('Load job after create');

export const SET_UPGRADE_MODAL_SHOWING = Symbol('Set upgrade modal showing');

export const HIDE_PREFILL_INFO = Symbol('Hide prefill info');
export const SET_DUPLICATE_ID = Symbol('Set duplicate id');
export const SET_SOURCE = Symbol('Set source');
export const SET_REDIRECT_URL = Symbol('Set redirect url');

export const LOAD_ABN_FROM_SUPPLIER = Symbol('Load abn given a supplier id');
export const SET_ABN_LOADING_STATE = Symbol('Set abn loading state');
export const UPDATE_ISSUE_DATE = Symbol('Update issue date');

export const UPDATE_HEADER_OPTION = Symbol('Update header option');

export const SET_VIEWED_ACCOUNT_TOOL_TIP_STATE = Symbol(
  'Set the viewed Account tool tip state'
);
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_MODAL_ALERT = Symbol('Set modal alert');

export const SAVE_PURCHASE_ORDER_FAILED = Symbol('Save purchase order failed');

export const SEND_EMAIL = Symbol('Send email');
export const UPLOAD_EMAIL_ATTACHMENT = Symbol('Upload email attachment');
export const UPDATE_EMAIL_PURCHASE_ORDER_DETAIL = Symbol(
  'Update email purchase order detail'
);
export const RESET_EMAIL_PURCHASE_ORDER_DETAIL = Symbol(
  'Reset email purchase order detail'
);

export const ADD_EMAIL_ATTACHMENTS = Symbol('Add email attachments');
export const UPLOAD_EMAIL_ATTACHMENT_FAILED = Symbol(
  'Upload email attachment failed'
);
export const UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS = Symbol(
  'Update email attachment upload progress'
);
export const REMOVE_EMAIL_ATTACHMENT = Symbol('Remove email attachment');
