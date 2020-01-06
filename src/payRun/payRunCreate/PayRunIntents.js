export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const SET_ALERT = Symbol('Set alert');
export const NEXT_STEP = Symbol('Next step');
export const PREVIOUS_STEP = Symbol('Previous step');
export const OPEN_PREVIOUS_STEP_MODAL = Symbol('Open previous step modal');
export const CLOSE_PREVIOUS_STEP_MODAL = Symbol('Close previous step modal');
export const SET_STP_REGISTRATION_STATUS = Symbol('Set STP registration status');
export const LOAD_STP_REGISTRATION_STATUS = Symbol('Load STP registration status');

export const START_NEW_PAY_RUN = Symbol('Start new pay run');
export const LOAD_EMPLOYEE_PAYS = Symbol('Load employee pays');
export const RECORD_PAYMENTS = Symbol('Record payments');
export const SET_PAY_PERIOD_DETAILS = Symbol('Set pay period details');

export const UPDATE_IS_EMPLOYEE_SELECTED = Symbol('Update is employee selected');
export const UPDATE_ARE_ALL_EMPLOYEES_SELECTED = Symbol('Update are all employees selected');
export const OPEN_ETP_MODAL = Symbol('Open ETP modal');
export const CLOSE_ETP_MODAL = Symbol('Close ETP modal');
export const CHANGE_ETP_CODE_CATEGORY = Symbol('Change ETP code category');
export const CHANGE_ETP_CODE = Symbol('Change ETP code');
export const VALIDATE_ETP = Symbol('Validate ETP');
export const SAVE_ETP = Symbol('SAVE_ETP');
export const VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT = Symbol('Validate pay period employee limit');
export const UPDATE_PAY_PERIOD_EMPLOYEE_LIMIT = Symbol('Update pay period employee limit');
export const SET_PAY_ITEM_LINE_DIRTY = Symbol('Set pay item line dirty');
export const UPDATE_EMPLOYEE_PAY_ITEM = Symbol('Update employee pay item');
export const FORMAT_EMPLOYEE_PAY_ITEM = Symbol('Format employee pay item');
export const RECALCULATE_PAY = Symbol('Recalculate pay');
export const UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION = Symbol('Update employee line after recalculation');
export const SET_TOTAL_NET_PAY = Symbol('Set total net pay');
export const SET_EMPLOYEE_PAYMENTS = Symbol('Store employee payments returned from record payments request');

export const OPEN_STP_DECLARATION_MODAL = Symbol('Open STP Declaration modal');
export const CLOSE_STP_DECLARATION_MODAL = Symbol('Close STP Declaration modal');
export const SET_STP_DECLARATION_LOADING_STATE = Symbol('Set STP Declaration loading state');
export const CHANGE_STP_DECLARATION_NAME = Symbol('Change STP Declaration name');
export const RECORD_STP_DECLARATION = Symbol('Record STP Declaration');
export const SET_STP_DECLARATION_ALERT_MESSAGE = Symbol('Set STP Declaration alert message');

export const SET_UPGRADE_MODAL_SHOWING = Symbol('Set upgrade modal showing');

export const EDIT_EXISTING_PAY_RUN = Symbol('Edit existing pay run');
export const DELETE_PAY_RUN_DRAFT = Symbol('Delete draft pay run');
export const SAVE_DRAFT = Symbol('Save pay run draft');
