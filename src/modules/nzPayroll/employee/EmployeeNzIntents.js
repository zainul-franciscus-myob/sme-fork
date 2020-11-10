// Alert intents
export const SET_ALERT = Symbol('Set alert');
export const DISMISS_ALERT = Symbol('Dismiss alert');
// Modal intents
export const CLOSE_MODAL = Symbol('Close modal');
export const OPEN_DELETE_MODAL = Symbol('Open delete modal');
export const OPEN_UNSAVED_MODAL = Symbol('Open unsaved modal');

// Saving employee detail intents
export const UPDATE_EMPLOYEE = Symbol('Update employee detail');
export const UPDATING_EMPLOYEE = Symbol('Updating employee detail');
export const UPDATE_EMPLOYEE_FAILED = Symbol('Update employee detail failed');

// Create employee intents
export const CREATE_EMPLOYEE = Symbol('Create employee');

// Deleting employee intents
export const DELETE_EMPLOYEE = Symbol('Delete employee');
export const DELETING_EMPLOYEE = Symbol('Deleting employee');
export const DELETE_EMPLOYEE_FAILED = Symbol('Delete employee failed');

// Loading employee list intents
export const LOAD_EMPLOYEE_LIST = Symbol('Load employee list');
export const LOAD_EMPLOYEE_LIST_NEXT_PAGE = Symbol('Load next employee list');
export const LOADING_EMPLOYEE_DETAIL = Symbol('Loading employee detail');
export const LOAD_EMPLOYEE_LIST_FAILED = Symbol('Load employee list failed');

// Loading employee details intents
export const LOAD_EMPLOYEE_DETAIL = Symbol('Load employee detail');
export const LOAD_EMPLOYEE_DETAIL_FAILED = Symbol(
  'Load employee detail failed'
);
export const LOAD_NEW_EMPLOYEE_DETAIL = Symbol('Load new employee detail');

// Update contant detail intents
export const UPDATE_CONTACT_DETAIL = Symbol('Update employee contact detail');

// Update tabs intents
export const SET_MAIN_TAB = Symbol('Set main tab');
export const SET_SUB_TAB = Symbol('Set sub tab');

// Sort and Filter Intents
export const SET_EMPLOYEE_LIST_TABLE_LOADING = Symbol(
  'Set employee list table loading'
);
export const SET_SORT_ORDER = Symbol('Set sort order');
export const UPDATE_FILTER_BAR_OPTIONS = Symbol('Update filter bar options');
export const RESET_FILTER_BAR_OPTIONS = Symbol('Reset filter bar options');
export const SORT_AND_FILTER_EMPLOYEE_LIST = Symbol(
  'Sort and filter employee list'
);
