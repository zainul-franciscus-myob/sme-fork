export const LOAD_NEW_BILL_SERVICE_DETAIL = Symbol('Load the new initial bill service payload');
export const CREATE_BILL_SERVICE_DETAIL = Symbol('Create a new service bill');
export const GET_CALCULATED_BILL_DETAIL_TOTALS = Symbol('Get calculated totals');
export const UPDATE_BILL_SERVICE_HEADER_OPTIONS = Symbol('Update service bill header options');
export const UPDATE_BILL_SERVICE_DETAIL = Symbol('Update a service bill entry');
export const ADD_BILL_SERVICE_LINE = Symbol('Add a new service bill line');
export const UPDATE_BILL_SERVICE_LINE = Symbol('Update service bill line');
export const REMOVE_BILL_SERVICE_LINE = Symbol('Remove a service bill line');
export const FORMAT_BILL_SERVICE_LINE = Symbol('Format service bill line');
export const PREFILL_NEW_BILL_SERVICE_FROM_IN_TRAY = Symbol('Prefill new bill service from in-tray');
export const PREFILL_NEW_BILL_SERVICE_FROM_IN_TRAY_ON_SUPPLIER_SELECT = Symbol(
  'Prefill new bill service from in-tray on supplier select',
);
export const RESET_TOTALS = Symbol('Reset totals');
