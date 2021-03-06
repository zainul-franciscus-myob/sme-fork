export const LOAD_INITIAL_EMPLOYEES_AND_HEADERS = Symbol(
  'Load the initial list of employees and header details'
);
export const LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR = Symbol(
  'Load the list of employees and header details for a particular year'
);
export const SET_LOADING_STATE = Symbol('Set the loading state');
export const SET_TABLE_LOADING_STATE = Symbol('Set the table loading state');
export const SET_SELECTED_PAYROLL_YEAR = Symbol('Set selected Payroll year');
export const SET_SORTED_EMPLOYEES = Symbol('Set the sorted employees list');
export const SET_IS_RFBA_ENABLED = Symbol('Set the RFBA enabled state');
export const SELECT_ALL_EMPLOYEES = Symbol('Select all employees');
export const SELECT_EMPLOYEES_ITEM = Symbol('Select employees item');
export const UPDATE_EMPLOYEE_ROW = Symbol('Update employee row value');
export const SUBMIT_EMPLOYEES_FINALISATION = Symbol(
  'Submit employees for finalisation'
);
export const RESET_EVENT_ID = Symbol('Reset the event id');
export const SUBMIT_EMPLOYEES_REMOVE_FINALISATION = Symbol(
  'Submit employees for removal of finalisation'
);
export const SET_UNSAVED_CHANGES_MODAL = Symbol('open unsaved changes modal');
export const SORT_EMPLOYEES = Symbol('Sorts employees');
export const RESET_DIRTY_FLAG = Symbol('Resets the dirty flag back to false');
export const OPEN_EOFY_YTD_REPORT = Symbol(
  'Open the EOFY YTD verification report'
);
export const OPEN_EMPLOYEE_SUMMARY_REPORT = Symbol(
  'Open the summary report for an employee'
);
