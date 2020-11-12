export const SET_LOADING_STATE = Symbol('Set the loading state');
export const SET_JOB_KEEPER_INITIAL = Symbol('Sets JobKeeper initial');
export const SET_TABLE_LOADING_STATE = Symbol('Set the table loading state');
export const SET_SORTED_EMPLOYEES = Symbol('Set employees after sort');
export const SET_SELECTED_PAYROLL_YEAR = Symbol('Set selected payroll year');
export const LOAD_INITIAL_JOB_KEEPER_EMPLOYEES = Symbol(
  'Load initial JobKeeper employee list and header'
);
export const FILTER_JOB_KEEPER_EMPLOYEES = Symbol('Filter JobKeeper employees');
export const SET_FILTERED_EMPLOYEES = Symbol('Set filtered employees');
export const SORT_JOB_KEEPER_EMPLOYEES = Symbol('Sort employees');
export const UPDATE_JOB_KEEPER_PAYMENTS = Symbol(
  'Update job keeper employees payments'
);
export const SET_INITIAL_STATE = Symbol('Set the initial state');
export const UPDATE_EMPLOYEE_ROW = Symbol('Update employee row value');
export const SET_NEW_EVENT_ID = Symbol('Set a new event id');
export const RESET_DIRTY_FLAG = Symbol('Resets the dirty flag back to false');
export const SET_UNSAVED_CHANGES_MODAL = Symbol('open unsaved changes modal');
export const LOAD_JOB_KEEPER_REPORT = Symbol('open JobKeeper report');
export const DISMISS_INITIAL_WARNING = Symbol('Dismiss the JK initial warning');
export const TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL = Symbol(
  'Show/hide the employee benefit report modal'
);
export const SELECT_EMPLOYEE = Symbol('Update employee is selected to true');
export const SELECT_ALL_EMPLOYEES = Symbol('Select all employees');
export const LOAD_EMPLOYEES_BENEFIT_REPORT = Symbol(
  'Load employees benefit report'
);
export const SET_ALERT_MESSAGE = Symbol('Set alert message');
export const SET_INLINE_ALERT_MESSAGE = Symbol('Set inline alert message');
