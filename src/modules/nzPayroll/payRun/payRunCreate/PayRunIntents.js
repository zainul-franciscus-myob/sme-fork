export const SET_LOADING_STATE = Symbol('Set loading state');
export const START_NEW_PAY_RUN = Symbol('Start new pay run');
export const SET_PAY_PERIOD_DETAILS = Symbol('Set pay period details');
export const CREATE_DRAFT_PAY_RUN = Symbol('Create draft pay run');
export const CREATE_DRAFT_PAY_RUN_SUCCESS = Symbol(
  'Create draft pay run succeeded'
);
export const CREATE_DRAFT_PAY_RUN_FAILED = Symbol(
  'Create draft pay run failed'
);
export const LOAD_DRAFT_PAY_RUN = Symbol('Load draft pay run');
export const NEXT_STEP = Symbol('Next step');
export const PREVIOUS_STEP = Symbol('Previous step');
export const SET_PAY_LINE_DIRTY = Symbol('Set pay item line dirty');
export const UPDATE_EMPLOYEE_PAY_LINE = Symbol('Update employee pay item');
export const UPDATE_EMPLOYEE_PAY = Symbol('Recalculate pay');
export const UPDATE_DRAFT_PAY_RUN = Symbol('Update draft pay run');
export const DELETE_DRAFT_PAY_RUN = Symbol('Delete draft pay run');
export const UPDATE_IS_EMPLOYEE_SELECTED = Symbol(
  'Update is employee selected'
);
export const UPDATE_EMPLOYEE_DAYS_PAID = Symbol(
  'Updates a given employees days paid amount'
);
export const UPDATE_ARE_ALL_EMPLOYEES_SELECTED = Symbol(
  'Update are all employees selected'
);
export const FORMAT_EMPLOYEE_PAY_LINE = Symbol('Format employee pay item');
export const RECORD_PAYMENTS = Symbol('Record payments');
export const SET_ALERT = Symbol('Set alert');
export const UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION = Symbol(
  'Update employee line after recalculation'
);
export const SET_TOTAL_TAKE_HOME_PAY = Symbol(
  'Sets amount for total take home pay'
);
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_REDIRECT_URL = Symbol('Set redirect url');
export const SET_DRAFT_PAY_RUN_ID = Symbol('Set draft pay run id');
export const OPEN_DISCARD_AND_REDIRECT_MODAL = Symbol(
  'Open discard and redirect modal'
);
export const OPEN_PREVIOUS_STEP_MODAL = Symbol('Open previous step modal');
export const CLOSE_PREVIOUS_STEP_MODAL = Symbol('Close previous step modal');
export const CLOSE_DISCARD_MODAL = Symbol('Close discard step modal');
export const RESTART_PAY_RUN = Symbol('Restart pay run');

export const LOAD_PAYROLL_VERIFICATION_REPORT = Symbol(
  'Load payroll verification report'
);
export const LOAD_PAYROLL_VERIFICATION_REPORT_SUCCESS = Symbol(
  'Payroll verification report loaded'
);
export const LOAD_PAYROLL_VERIFICATION_REPORT_FAILED = Symbol(
  'Failed to load payroll verification report'
);
export const UPDATE_EMPLOYEE_DAYS_PAID_FAILED = Symbol(
  'Failed to update Days Paid'
);

export const OPEN_ADD_HOLIDAYS_AND_LEAVE_MODAL = Symbol(
  'Open add holidays and leave modal dialog'
);

export const CANCEL_ADD_HOLIDAYS_AND_LEAVE_MODAL = Symbol(
  'Cancel add holidays and leave modal dialog'
);

export const SET_IS_BUSINESS_ONBOARDED = Symbol('Set is business onboarded');

export const LOAD_BUSINESS_ONBOARDED_STATUS = Symbol(
  'Load business onboarded status'
);
