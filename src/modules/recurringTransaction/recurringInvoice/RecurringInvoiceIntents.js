export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_ALERT = Symbol('Set alert state');
export const SET_MODAL_TYPE = Symbol('Set modal type');

export const LOAD_NEW_RECURRING_INVOICE = Symbol('Load new recurring invoice');
export const LOAD_RECURRING_INVOICE = Symbol('Load recurring invoice');
export const RELOAD_RECURRING_INVOICE = Symbol('Reload recurring invoice');
export const CREATE_RECURRING_INVOICE = Symbol('Create recurring invoice');
export const UPDATE_RECURRING_INVOICE = Symbol('Update recurring invoice');
export const DELETE_RECURRING_INVOICE = Symbol('Delete recurring invoice');
export const UPDATE_RECURRING_INVOICE_ID_AFTER_CREATE = Symbol(
  'Update recurring invoice id after create'
);

export const UPDATE_SCHEDULE_OPTIONS = Symbol('Update schedule options');
export const UPDATE_INVOICE_HEADER_OPTIONS = Symbol(
  'Update invoice header options'
);
export const UPDATE_INVOICE_LAYOUT = Symbol('Update invoice layout');
export const ADD_INVOICE_LINE = Symbol('Add invoice line');
export const REMOVE_INVOICE_LINE = Symbol('Remove invoice line');
export const UPDATE_INVOICE_LINE = Symbol('Update invoice line');
export const CALCULATE_INVOICE_LINES = Symbol('Calculate lines');
export const CALCULATE_INVOICE_LINE_AMOUNTS = Symbol('Calculate line amounts');
export const SET_INVOICE_ITEM_LINE_DIRTY = Symbol('Set invoice line dirty');

export const LOAD_CUSTOMER_OPTIONS = Symbol('Load customer options');
export const LOAD_CUSTOMER = Symbol('Load customer');
export const RESET_CUSTOMER = Symbol('Reset the abn');
export const LOAD_ABN_FROM_CUSTOMER = Symbol('Load abn given a customer id');
export const SET_ABN_LOADING_STATE = Symbol('Set abn loading state');
export const LOAD_ACCOUNT_OPTIONS = Symbol('Load account options');
export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load account after create');
export const LOAD_ITEM = Symbol('Load item');
export const LOAD_PAY_DIRECT = Symbol('Load pay direct');
export const SET_PAY_DIRECT_LOADING_STATE = Symbol(
  'Set pay direct loading state'
);

export const SET_REDIRECT_STATE = Symbol('Set redirect url');
