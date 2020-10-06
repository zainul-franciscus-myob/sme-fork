export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_IS_TABLE_LOADING = Symbol('Set table is loading value');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_ALERT = Symbol('Set alert');
export const NEXT_STEP = Symbol('Next step');
export const PREVIOUS_STEP = Symbol('Previous step');
export const OPEN_PREVIOUS_STEP_MODAL = Symbol('Open previous step modal');
export const CLOSE_PREVIOUS_STEP_MODAL = Symbol('Close previous step modal');
export const SET_STP_REGISTRATION_STATUS = Symbol(
  'Set STP registration status'
);
export const LOAD_STP_REGISTRATION_STATUS = Symbol(
  'Load STP registration status'
);

export const START_NEW_PAY_RUN = Symbol('Start new pay run');
export const LOAD_EMPLOYEE_PAYS = Symbol('Load employee pays');

export const RECORD_PAYMENTS = Symbol('Record payments');
export const SET_PAY_PERIOD_DETAILS = Symbol('Set pay period details');

export const VALIDATE_STP_REGISTRATION = Symbol('Validates STP registration');
export const SET_SHOW_STP_VALIDATION_ERROR_MODAL = Symbol(
  'Sets the flag for showing or not showing the STP Validation Error Modal'
);

export const UPDATE_IS_EMPLOYEE_SELECTED = Symbol(
  'Update is employee selected'
);
export const UPDATE_ARE_ALL_EMPLOYEES_SELECTED = Symbol(
  'Update are all employees selected'
);
export const OPEN_ETP_MODAL = Symbol('Open ETP modal');
export const CLOSE_ETP_MODAL = Symbol('Close ETP modal');
export const OPEN_JOB_LIST_MODAL = Symbol('Open job list modal');
export const CLOSE_JOB_LIST_MODAL = Symbol('Close job list modal');
export const CHANGE_ETP_CODE_CATEGORY = Symbol('Change ETP code category');
export const CHANGE_ETP_CODE = Symbol('Change ETP code');
export const VALIDATE_ETP = Symbol('Validate ETP');
export const SAVE_ETP = Symbol('SAVE_ETP');
export const VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT = Symbol(
  'Validate pay period employee limit'
);
export const UPDATE_PAY_PERIOD_EMPLOYEE_LIMIT = Symbol(
  'Update pay period employee limit'
);
export const SET_PAY_ITEM_LINE_DIRTY = Symbol('Set pay item line dirty');
export const UPDATE_EMPLOYEE_PAY_ITEM = Symbol('Update employee pay item');
export const FORMAT_EMPLOYEE_PAY_ITEM = Symbol('Format employee pay item');
export const RECALCULATE_PAY = Symbol('Recalculate pay');
export const UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION = Symbol(
  'Update employee line after recalculation'
);
export const SET_TOTAL_NET_PAY = Symbol('Set total net pay');
export const SET_EMPLOYEE_PAYMENTS = Symbol(
  'Store employee payments returned from record payments request'
);
export const UPDATE_EMPLOYEE_NOTE = Symbol(
  'Update the note for an employee pay'
);

export const SET_UPGRADE_MODAL_SHOWING = Symbol('Set upgrade modal showing');

export const EDIT_EXISTING_PAY_RUN = Symbol('Edit existing pay run');
export const DELETE_PAY_RUN_DRAFT = Symbol('Delete draft pay run');
export const SAVE_DRAFT = Symbol('Save pay run draft');
export const LOAD_TIMESHEETS = Symbol('Load timesheets');
export const SELECT_ALL_TIMESHEETS = Symbol(
  'Select or deselect all timesheets'
);
export const SELECT_TIMESHEETS_ITEM = Symbol(
  'Select or deselect one item of the timesheets'
);
export const SET_UNPROCESSED_TIMESHEET_LINES = Symbol(
  'Set unprocessed timesheet lines'
);
export const PREVIEW_PAY_DETAILS = Symbol('Preview pay details');
export const PREVIEW_PAY_RUN_ACTIVITY = Symbol('Preview pay run activity');
export const SET_EMPLOYEE_PAY_LIST_UNSAVED_MODAL = Symbol(
  'Open or close employee pay list unsaved modal'
);
export const GET_DETAIL_JOB_LIST = Symbol('Get job list');
export const EDIT_PAY_ITEM_JOBS = Symbol('Edit pay item jobs');
export const SET_JOB_LIST_MODAL_LOADING_STATE = Symbol(
  'Set job list modal loading state'
);
export const SAVE_PAY_ITEM_JOBS = Symbol('Save pay item jobs');

export const HIDE_WARNING_TOOLTIP = Symbol('Hide warning tooltip');
