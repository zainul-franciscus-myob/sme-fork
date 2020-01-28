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
export const SET_NEXT_PAGE_LOADING_STATE = Symbol('Set loading next page state');
export const LOAD_NEXT_PAGE = Symbol('Load next page');

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
export const UPDATE_INVOICE_LAYOUT = Symbol('Update invoice layout');

export const ADD_INVOICE_LINE = Symbol('Add invoice line');
export const REMOVE_INVOICE_LINE = Symbol('Remove invoice line');
export const UPDATE_INVOICE_LINE = Symbol('Update invoice line');
export const FORMAT_INVOICE_LINE = Symbol('Format invoice line');
export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load account after create');

export const SET_INVOICE_ITEM_LINE_DIRTY = Symbol('Set invoice item line amount dirty');
export const RESET_TOTALS = Symbol('Reset totals');
export const CALCULATE_LINE_TOTALS = Symbol('Calculate line totals');
export const CALCULATE_LINE_TOTALS_ON_AMOUNT_CHANGE = Symbol('Calculate line totals on amount change');
export const CALCULATE_LINE_TOTALS_ON_ITEM_CHANGE = Symbol('Calculate line totals on item change');
export const CALCULATE_LINE_TOTALS_ON_TAX_INCLUSIVE_CHANGE = Symbol('Calculate line totals on tax inclusive change');
export const CALCULATE_LINE_AMOUNTS = Symbol('Calculate line amounts');

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

export const LOAD_ITEM_OPTION = Symbol('Load item option');

export const SET_UPGRADE_MODAL_SHOWING = Symbol('Set upgrade modal showing');

export const SET_INVOICE_HISTORY_LOADING = Symbol('Set invoice history loading state');
export const SET_INVOICE_HISTORY_UNAVAILABLE = Symbol('Set invoice history unavailable');
export const SET_INVOICE_HISTORY_CLOSED = Symbol('Set invoice history closed');
export const SET_INVOICE_HISTORY_OPEN = Symbol('Set invoice history open');
export const LOAD_INVOICE_HISTORY = Symbol('Load invoice history');
export const SET_REDIRECT_REF = Symbol('Set redirect ref');

export const LOAD_ACCOUNT_OPTIONS = Symbol('Load account options');
export const LOAD_ITEM_OPTIONS = Symbol('Load item options');
export const LOAD_CONTACT_OPTIONS = Symbol('Load contact options');

export const LOAD_ITEM_SELLING_DETAILS = Symbol('Load item selling details');
