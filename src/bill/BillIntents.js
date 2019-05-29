export const LOAD_BILL_DETAIL = Symbol('Load the initial bill payload');
export const LOAD_NEW_BILL_SERVICE_DETAIL = Symbol('Load the new initial bill service payload');
export const LOAD_NEW_BILL_ITEM_DETAIL = Symbol('Load the new initial bill item payload');

export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_ALERT_MESSAGE = Symbol('Set the alert message of the page');
export const OPEN_MODAL = Symbol('Open modal');
export const CLOSE_MODAL = Symbol('Close modal');

export const CREATE_BILL_SERVICE_DETAIL = Symbol('Create a new service bill');
export const DELETE_BILL_SERVICE_DETAIL = Symbol('Delete a service bill entry');
export const GET_CALCULATED_BILL_SERVICE_DETAIL_TOTALS = Symbol('Get calculated totals');
export const LOAD_CUSTOMER_ADDRESS = Symbol('Load contact address');
export const UPDATE_BILL_SERVICE_HEADER_OPTIONS = Symbol('Update service bill header options');
export const UPDATE_BILL_SERVICE_DETAIL = Symbol('Update a service bill entry');
export const ADD_BILL_SERVICE_LINE = Symbol('Add a new service bill line');
export const UPDATE_BILL_SERVICE_LINE = Symbol('Update service bill line');
export const REMOVE_BILL_SERVICE_LINE = Symbol('Remove a service bill line');
export const FORMAT_BILL_SERVICE_LINE = Symbol('Format service bill line');
export const RESET_TOTALS = Symbol('Reset totals');
