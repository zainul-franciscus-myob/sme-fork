export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_ALERT = Symbol('Set alert state');
export const SET_ALERT_MESSAGE = Symbol('Set alert message');
export const SET_MODAL_ALERT = Symbol('Set modal alert');
export const SET_MODAL_TYPE = Symbol('Set modal type');
export const SET_MODAL_SUBMITTING_STATE = Symbol('Set modal submitting state');
export const OPEN_MODAL = Symbol('Open Modal');
export const CLOSE_MODAL = Symbol('Close Modal');

export const LOAD_INVOICE_LIST = Symbol('Load list of invoices');
export const SORT_AND_FILTER_INVOICE_LIST = Symbol('Sort and filter list of invoices');
export const SET_SORT_ORDER = Symbol('Set sort order');
export const SET_TABLE_LOADING_STATE = Symbol('Set table loading state');
export const UPDATE_FILTER_OPTIONS = Symbol('Update filter options of invoices');

export const LOAD_NEW_INVOICE_DETAIL = Symbol('Load a new invoice');
export const LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE = Symbol('Load a new invoice from a quote');
export const LOAD_NEW_DUPLICATE_INVOICE_DETAIL = Symbol('Load a new duplicate invoice');
export const LOAD_INVOICE_DETAIL = Symbol('Load an existing invoice');
export const CREATE_INVOICE_DETAIL = Symbol('Create a new invoice');
export const UPDATE_INVOICE_DETAIL = Symbol('Update a new invoice');
export const DELETE_INVOICE_DETAIL = Symbol('Delete invoice detail');
export const LOAD_CONTACT_ADDRESS = Symbol('Load contact address');
export const LOAD_CONTACT_AFTER_CREATE = Symbol('Load contact after create');
export const SET_CONTACT_LOADING_STATE = Symbol('Set contact loading state');
export const LOAD_PAY_DIRECT = Symbol('Load pay direct');
export const SET_PAY_DIRECT_LOADING_STATE = Symbol('Set pay direct loading state');
export const UPDATE_INVOICE_ID_AFTER_CREATE = Symbol('Update invoice id after create');
export const UPDATE_INVOICE_DETAIL_HEADER_OPTIONS = Symbol('Update invoice header options');
export const UPDATE_INVOICE_PAYMENT_AMOUNT = Symbol('Update the payment amount for a new invoice');

export const ADD_INVOICE_SERVICE_LINE = Symbol('Add invoice service line');
export const REMOVE_INVOICE_SERVICE_LINE = Symbol('Remove invoice service line');
export const UPDATE_INVOICE_SERVICE_LINE = Symbol('Update invoice service line');
export const FORMAT_INVOICE_SERVICE_LINE = Symbol('Format invoice service line');
export const GET_INVOICE_SERVICE_CALCULATED_TOTALS = Symbol('Get calculated invoice detail totals');
export const RESET_INVOICE_SERVICE_TOTALS = Symbol('Reset invoice service totals');
export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load account after create');
export const SET_ACCOUNT_LOADING_STATE = Symbol('Set account loading state');

export const ADD_INVOICE_ITEM_LINE = Symbol('Add invoice item line');
export const REMOVE_INVOICE_ITEM_LINE = Symbol('Remove invoice item line');
export const UPDATE_INVOICE_ITEM_LINE = Symbol('Update invoice item line');
export const FORMAT_INVOICE_ITEM_LINE = Symbol('Format invoice item line');
export const SET_INVOICE_ITEM_LINE_DIRTY = Symbol('Set invoice item line amount dirty');
export const SET_INVOICE_ITEM_SUBMITTING_STATE = Symbol('Set invoice item line submitting state');
export const GET_INVOICE_ITEM_CALCULATED_LINES = Symbol('Get invoice item calculated lines');
export const RESET_INVOICE_ITEM_TOTALS = Symbol('Reset invoice item totals');
export const CALCULATE_INVOICE_ITEM_TAX_INCLUSIVE_CHANGE = Symbol('Calculate invoice item lines from tax inclusive change');
export const CALCULATE_INVOICE_ITEM_LINES_CHANGE = Symbol('Calculate invoice item lines from add or remove line');
export const CALCULATE_INVOICE_ITEM_LINE_TAX_CODE_CHANGE = Symbol('Calculate invoice item lines from tax code change');
export const CALCULATE_INVOICE_ITEM_LINE_INPUT_CHANGE = Symbol('Calculate invoice item lines from line change');

export const SEND_EMAIL = Symbol('Send email');
export const UPDATE_EMAIL_INVOICE_DETAIL = Symbol('Update email invoice detail');
export const RESET_EMAIL_INVOICE_DETAIL = Symbol('Reset email invoice detail');
export const RESET_OPEN_SEND_EMAIL = Symbol('Reset open send email');
export const ADD_EMAIL_ATTACHMENTS = Symbol('Add email attachments');
export const UPLOAD_EMAIL_ATTACHMENT = Symbol('Upload email attachment');
export const UPLOAD_EMAIL_ATTACHMENT_FAILED = Symbol('Upload email attachment failed');
export const UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS = Symbol('Update email attachment upload progress');
export const REMOVE_EMAIL_ATTACHMENT = Symbol('Remove email attachment');

export const EXPORT_INVOICE_PDF = Symbol('Export invoice pdf');
export const UPDATE_EXPORT_PDF_DETAIL = Symbol('Update pdf detail');
