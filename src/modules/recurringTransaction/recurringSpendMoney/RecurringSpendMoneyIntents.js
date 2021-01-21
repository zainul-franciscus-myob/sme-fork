export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_ALERT = Symbol('Set alert');
export const OPEN_MODAL = Symbol('Open a modal');
export const CLOSE_MODAL = Symbol('Close a modal');

export const LOAD_NEW_RECURRING_SPEND_MONEY = Symbol(
  'Load new recurring spend money'
);
export const LOAD_RECURRING_SPEND_MONEY = Symbol('Load recurring spend money');
export const CREATE_RECURRING_SPEND_MONEY = Symbol(
  'Create recurring spend money'
);
export const DELETE_RECURRING_SPEND_MONEY = Symbol(
  'Delete recurring spend money'
);
export const UPDATE_RECURRING_SPEND_MONEY = Symbol(
  'Update recurring spend money'
);

export const SET_SCHEDULE_OPTIONS = Symbol('Set schedule options');
export const SET_SPEND_MONEY_OPTIONS = Symbol('Set spend money header');
export const ADD_SPEND_MONEY_LINE = Symbol('Add spend money line');
export const UPDATE_SPEND_MONEY_LINE = Symbol('Update spend money line');
export const REMOVE_SPEND_MONEY_LINE = Symbol('Delete spend money line');
export const GET_TAX_CALCULATIONS = Symbol('Get tax calculations');
export const RESET_TOTALS = Symbol('Reset calculated totals');
export const CLEAR_IS_REPORTABLE = Symbol('clear is reportable');

export const LOAD_CONTACT = Symbol('Load a contact');

export const SET_PAY_TO_CONTACT = Symbol('Set pay to contact');
export const RESET_PAY_TO_CONTACT = Symbol('Reset pay to contact');

export const LOAD_ABN_FROM_CONTACT = Symbol('Load abn given a contact id');
export const SET_ABN_LOADING_STATE = Symbol('Set abn loading state');

export const LOAD_ACCOUNT_AFTER_CREATE = Symbol('Load an account after create');
