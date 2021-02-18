export const SET_ALERT = Symbol('Set alert');
export const SET_MODAL = Symbol('Set modal');
export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');

export const LOAD_NEW_RECURRING_BILL = Symbol('Load new recurring bill');
export const LOAD_RECURRING_BILL = Symbol('Load recurring bill');
export const CREATE_RECURRING_BILL = Symbol('Create recurring bill');
export const UPDATE_RECURRING_BILL = Symbol('Update recurring bill');
export const DELETE_RECURRING_BILL = Symbol('Delete recurring bill');

export const UPDATE_SCHEDULE_OPTIONS = Symbol('Update schedule options');
export const UPDATE_BILL_HEADER_OPTIONS = Symbol('Update bill header options');
export const UPDATE_BILL_SUPPLIER_OPTIONS = Symbol(
  'Update bill supplier options'
);
export const UPDATE_BILL_LAYOUT = Symbol('Update bill layout');

export const ADD_BILL_LINE = Symbol('Add bill line');
export const UPDATE_BILL_LINE = Symbol('Update bill line');
export const REMOVE_BILL_LINE = Symbol('Remove bill line');
export const GET_TAX_CALCULATIONS = Symbol('Get tax calculations');
export const CALCULATE_BILL_LINE_AMOUNTS = Symbol(
  'Calculate bill line amounts'
);

export const LOAD_SUPPLIER = Symbol('Load supplier');

export const LOAD_ABN_FROM_SUPPLIER = Symbol('Load abn given a supplier id');
export const SET_ABN_LOADING_STATE = Symbol('Set abn loading state');

export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load account after create');

export const LOAD_ITEM = Symbol('Load item');

export const SET_REDIRECT_URL = Symbol('Set redirect url');
