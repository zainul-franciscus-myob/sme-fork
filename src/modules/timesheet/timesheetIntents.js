// eslint-disable-next-line import/prefer-default-export
export const LOAD_INITIAL_TIMESHEET = Symbol('Load the initial timesheet information');
export const LOAD_TIMESHEET = Symbol('Load the timesheet for given date');
export const LOAD_CONTEXT = Symbol('Load context into state');
export const SET_SELECTED_EMPLOYEE = Symbol('Set selected employee');
export const SET_LOADING_STATE = Symbol('Set loading state for the page');
export const LOAD_EMPLOYEE_TIMESHEET = Symbol('Load employee timesheet');
export const SET_WEEK_START_DATE = Symbol('Set week start date');
export const SET_TIMESHEET_CELL = Symbol('Set timesheet cell value');
export const REMOVE_ROW = Symbol('Remove line item row');
export const ADD_ROW = Symbol('Add a new row');
export const TOGGLE_DISPLAY_START_STOP_TIMES = Symbol('Toggle the display of start and stop times');
export const CLEAR_TIMESHEET_ROWS = Symbol('Clear timesheet rows');
