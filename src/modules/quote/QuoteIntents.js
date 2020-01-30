export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_ALERT = Symbol('Set the alert of the page');
export const OPEN_MODAL = Symbol('Open modal');
export const CLOSE_MODAL = Symbol('Close modal');
export const SET_MODAL_SUBMITTING_STATE = Symbol('Set modal submitting state');
export const SET_MODAL_ALERT = Symbol('Set modal alert');

export const LOAD_QUOTE_LIST = Symbol('Load list of quotes');
export const SET_SORT_ORDER = Symbol('Set sort order for quote list');
export const SET_TABLE_LOADING_STATE = Symbol('Set Table loading state');
export const SORT_AND_FILTER_QUOTE_LIST = Symbol('Sort and filter list of quotes');
export const UPDATE_FILTER_OPTIONS = Symbol('Update filter Options');

export const LOAD_NEW_QUOTE_DETAIL = Symbol('Load a new quote');
export const LOAD_NEW_DUPLICATE_QUOTE_DETAIL = Symbol('Load a new duplicate quote');
export const LOAD_QUOTE_DETAIL = Symbol('Load an existing quote');
export const CREATE_QUOTE_DETAIL = Symbol('Create a new quote');
export const UPDATE_QUOTE_DETAIL = Symbol('Update a quote');
export const DELETE_QUOTE_DETAIL = Symbol('Delete a quote');
export const UPDATE_QUOTE_ID_AFTER_CREATE = Symbol('Update quote id after create');
export const UPDATE_QUOTE_DETAIL_HEADER_OPTIONS = Symbol('Update quote header options');
export const UPDATE_LAYOUT = Symbol('Update layout');

export const ADD_QUOTE_LINE = Symbol('Add quote line');
export const UPDATE_QUOTE_LINE = Symbol('Update quote line');
export const REMOVE_QUOTE_LINE = Symbol('Remove quote line');
export const RESET_QUOTE_TOTALS = Symbol('Reset quote totals');
export const FORMAT_QUOTE_LINE = Symbol('Format quote line');

export const CALCULATE_QUOTE_LINE_TOTALS = Symbol('Calculate quote line totals');

export const CALCULATE_QUOTE_ITEM_CHANGE = Symbol('Calculate quote item change');
export const CALCULATE_QUOTE_AMOUNT_CHANGE = Symbol('Calculate quote amount change');
export const CALCULATE_QUOTE_TAX_INCLUSIVE_CHANGE = Symbol('Calculate quote tax inclusive change');
export const CALCULATE_LINE_AMOUNTS = Symbol('Calculate line amount changes');
export const LOAD_ITEM_SELLING_DETAILS = Symbol('Load item selling details');
export const CACHE_ITEM_SELLING_DETAILS = Symbol('Cache item selling details');
export const SET_QUOTE_CALCULATED_LINES = Symbol('Set quote item from calculation');
export const SET_QUOTE_SUBMITTING_STATE = Symbol('Set is submitting');
export const SET_QUOTE_LINE_DIRTY = Symbol('Set is line amount input dirty');

export const LOAD_CONTACT_ADDRESS = Symbol('Load contact address');
export const LOAD_CONTACT_AFTER_CREATE = Symbol('Load contact after create');
export const SET_CONTACT_LOADING_STATE = Symbol('Set contact loading state');

export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load account after create');
export const SET_ACCOUNT_LOADING_STATE = Symbol('Set account loading state');

export const LOAD_ITEM_AFTER_CREATE = Symbol('Load item after create');

export const UPDATE_EMAIL_QUOTE_DETAIL = Symbol('Update email quote detail');
export const SEND_EMAIL = Symbol('Send email');
export const RESET_EMAIL_QUOTE_DETAIL = Symbol('Reset email quote detail');
export const RESET_OPEN_SEND_EMAIL = Symbol('Reset open send email');
export const ADD_EMAIL_ATTACHMENTS = Symbol('Add email attachments');
export const UPLOAD_EMAIL_ATTACHMENT = Symbol('Upload email attachment');
export const UPLOAD_EMAIL_ATTACHMENT_FAILED = Symbol('Upload email attachment failed');
export const UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS = Symbol('Update email attachment upload progress');
export const REMOVE_EMAIL_ATTACHMENT = Symbol('Remove email attachment');

export const EXPORT_QUOTE_PDF = Symbol('Export quote PDF');
export const CHANGE_EXPORT_PDF_TEMPLATE = Symbol(' Change export pdf template');

export const LOAD_QUOTE_LIST_NEXT_PAGE = Symbol('Load quote list next page');
export const START_LOADING_MORE = Symbol('Start loading more');
export const STOP_LOADING_MORE = Symbol('Stop loading more');
