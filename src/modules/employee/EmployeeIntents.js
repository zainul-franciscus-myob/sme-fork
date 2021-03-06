export const LOAD_EMPLOYEE_LIST = Symbol('Load employee list');
export const SET_LOADING_STATE = Symbol('Set loading state');
export const SET_TABLE_LOADING_STATE = Symbol('Set table loading state');
export const UPDATE_FILTER_BAR_OPTIONS = Symbol('Update filter bar options');
export const RESET_FILTER_BAR_OPTIONS = Symbol('Reset filter bar options');
export const SORT_AND_FILTER_EMPLOYEE_LIST = Symbol(
  'Sort and filter employee list'
);
export const SET_ALERT = Symbol('Set alert');
export const SET_SORT_ORDER = Symbol('Set sort order');
export const SET_MAIN_TAB = Symbol('Set main tab');
export const SET_SUB_TAB = Symbol('Set sub tab');
export const LOAD_EMPLOYEE_DETAIL = Symbol('Load employee detail');
export const UPDATE_CONTACT_DETAILS = Symbol('Update employee contact details');
export const UPDATE_EMPLOYEE = Symbol('Update employee');
export const CREATE_EMPLOYEE = Symbol('Create employee');
export const DELETE_EMPLOYEE = Symbol('Delete employee');
export const SET_SUBMITTING_STATE = Symbol('Set submitting state');
export const LOAD_NEW_EMPLOYEE_DETAIL = Symbol('Load new employee detail');
export const OPEN_MODAL = Symbol('Open modal');
export const CLOSE_MODAL = Symbol('Close modal');
export const SET_PAGE_EDITED_STATE = Symbol('Set page edited state');
export const UPDATE_PAYROLL_EMPLOYMENT_DETAIL = Symbol(
  'Update Payroll employment detail'
);
export const SET_TERMINATION_CONFIRM_MODAL = Symbol(
  'Open or close the termination confirmation modal'
);
export const UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY = Symbol(
  'Update Payroll employment payslip delivery'
);
export const UPDATE_PAYMENT_DETAILS = Symbol('Update employee payment details');
export const UPDATE_BANK_ACCOUNT_DETAILS = Symbol(
  'Update employee bank account details'
);
export const LOAD_EMPLOYEE_LIST_NEXT_PAGE = Symbol(
  'Load employee list next page'
);
export const START_LOADING_MORE = Symbol('Start loading more');
export const STOP_LOADING_MORE = Symbol('Stop loading more');

export const ADD_PAYROLL_DEDUCTION_PAY_ITEM = Symbol('Add deduction pay item');
export const REMOVE_PAYROLL_DEDUCTION_PAY_ITEM = Symbol(
  'Remove deduction pay item'
);
export const SET_SHOW_ADD_PAY_ITEM_BUTTON = Symbol(
  'Set show add pay item button'
);

export const ADD_PAYROLL_SUPER_PAY_ITEM = Symbol('Add payroll super pay item');
export const REMOVE_PAYROLL_SUPER_PAY_ITEM = Symbol(
  'Remove payroll super pay item'
);
export const UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS = Symbol(
  'Update payroll details superannuation details'
);

export const ADD_PAYROLL_TAX_PAY_ITEM = Symbol('Add tax pay item');
export const REMOVE_PAYROLL_TAX_PAY_ITEM = Symbol('Remove tax pay item');
export const UPDATE_PAYROLL_TAX_DETAILS = Symbol('Update payroll tax details');
export const SET_TAX_FILE_NUMBER_STATUS = Symbol(
  'Set the tax file number status'
);
export const FORMAT_PAYROLL_TAX_AMOUNT = Symbol('Format payroll tax amount');

export const ADD_PAYROLL_WAGE_PAY_ITEM = Symbol('Add wage pay item');
export const REMOVE_PAYROLL_WAGE_PAY_ITEM = Symbol('Remove wage pay item');
export const UPDATE_PAYROLL_WAGE_DETAILS = Symbol(
  'Update payroll wage details'
);
export const UPDATE_PAYROLL_WAGE_PAY_BASIS = Symbol(
  'Update payroll wage pay basis'
);
export const UPDATE_PAYROLL_WAGE_HOURLY_RATE = Symbol(
  'Update payroll wage hourly rate'
);
export const UPDATE_PAYROLL_WAGE_ANNUAL_SALARY = Symbol(
  'Update payroll wage annual salary'
);
export const UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE = Symbol(
  'Update payroll wage hours in a pay cycle'
);
export const UPDATE_PAYROLL_WAGE_PAY_CYCLE = Symbol(
  'Update payroll wage pay cycle'
);
export const UPDATE_PAYROLL_WAGE_APPLIED_DETAILS = Symbol(
  'Update payroll wage applied details'
);

export const LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE = Symbol(
  'Load standard pay wage amount rule'
);
export const SET_PAYROLL_STANDARD_PAY_DETAILS_INPUT = Symbol(
  'Set standard pay details input'
);
export const SET_PAYROLL_STANDARD_PAY_ITEM_INPUT = Symbol(
  'Set standard pay item input'
);
export const REMOVE_PAYROLL_STANDARD_PAY_ITEM = Symbol(
  'Remove standard pay item'
);

export const SET_PAYROLL_PAY_HISTORY_FILTER_OPTIONS = Symbol(
  'Set pay history filter options'
);
export const SET_PAYROLL_PAY_HISTORY_ITEM_INPUT = Symbol(
  'Set pay history item input'
);
export const FORMAT_PAYROLL_PAY_HISTORY_ITEM_INPUT = Symbol(
  'Set pay history item input'
);

export const OPEN_TAX_PAY_ITEM_MODAL = Symbol('Open tax pay item modal');
export const CLOSE_TAX_PAY_ITEM_MODAL = Symbol('Close tax pay item modal');
export const LOAD_TAX_PAY_ITEM_MODAL = Symbol('Load tax pay item modal');
export const UPDATE_TAX_PAY_ITEM_MODAL = Symbol('Update tax pay item modal');
export const UPDATE_TAX_PAY_ITEM_MODAL_DETAILS = Symbol(
  'Update tax pay item modal details'
);
export const SET_TAX_PAY_ITEM_MODAL_LOADING_STATE = Symbol(
  'Set tax pay item modal loading state'
);
export const SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE = Symbol(
  'Set tax pay item modal submitting state'
);
export const SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE = Symbol(
  'Set tax pay item modal alert message'
);
export const ADD_ALLOCATED_LEAVE_ITEM = Symbol('Add an allocated leave item');
export const REMOVE_ALLOCATED_LEAVE_ITEM = Symbol(
  'Remove an allocated leave item'
);
export const UPDATE_ALLOCATE_LEAVE_ITEM_BALANCE_ADJUSTMENT = Symbol(
  'Update an allocated leave item balance adjustment'
);
export const SET_ALLOCATED_LEAVE_ITEM_MODAL = Symbol(
  'Set allocated leave item modal'
);
export const SET_EXPENSE_PAY_ITEM_MODAL_ALERT = Symbol(
  'Set expense pay item modal alert'
);
export const CHANGE_EXPENSE_PAY_ITEM_MODAL_INPUT = Symbol(
  'Change expense pay item modal input'
);
export const FORMAT_EXPENSE_PAY_ITEM_MODAL_AMOUNT_INPUT = Symbol(
  'Format expense pay item modal amount input'
);
export const ADD_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE = Symbol(
  'Add expense pay item modal allocated employee'
);
export const REMOVE_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE = Symbol(
  'Remove expense pay item modal allocated employee'
);
export const ADD_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM = Symbol(
  'Add expense pay item modal exemption pay item'
);
export const REMOVE_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM = Symbol(
  'Remove expense pay item modal exemption pay item'
);
export const OPEN_EXPENSE_PAY_ITEM_MODAL = Symbol(
  'Open expense pay item modal'
);
export const SET_EXPENSE_PAY_ITEM_MODAL_LOADING_STATE = Symbol(
  'Set expense pay item modal loading state'
);
export const LOAD_NEW_EXPENSE_PAY_ITEM_MODAL = Symbol(
  'Load new expense pay item modal'
);
export const LOAD_EXPENSE_PAY_ITEM_MODAL = Symbol(
  'Load expense pay item modal'
);
export const CLOSE_EXPENSE_PAY_ITEM_MODAL = Symbol(
  'Close expense pay item modal'
);
export const SET_EXPENSE_PAY_ITEM_MODAL_SUBMITTING_STATE = Symbol(
  'Set expense pay item modal submitting state'
);
export const CREATE_EXPENSE_PAY_ITEM_MODAL = Symbol(
  'Create expense pay item modal'
);
export const UPDATE_EXPENSE_PAY_ITEM_MODAL = Symbol(
  'Update expense pay item modal'
);

export const ADD_PAYROLL_EXPENSE_PAY_ITEM = Symbol('Add payroll pay item');
export const REMOVE_PAYROLL_EXPENSE_PAY_ITEM = Symbol(
  'Remove payroll pay item'
);

export const OPEN_WAGE_PAY_ITEM_MODAL = Symbol('Open wage pay item modal');
export const SET_WAGE_PAY_ITEM_MODAL_LOADING_STATE = Symbol(
  'Set wage pay item modal loading state'
);
export const SET_WAGE_PAY_ITEM_MODAL_SUBMITTING_STATE = Symbol(
  'Set wage pay item modal submitting state'
);
export const LOAD_WAGE_PAY_ITEM_MODAL = Symbol('Load wage pay item modal');
export const LOAD_NEW_WAGE_PAY_ITEM_MODAL = Symbol(
  'Load new wage pay item modal'
);
export const CLOSE_WAGE_PAY_ITEM_MODAL = Symbol('Close wage pay item modal');
export const SET_WAGE_PAY_ITEM_MODAL_ALERT = Symbol(
  'Set wage pay item modal alert'
);
export const UPDATE_WAGE_PAY_ITEM_MODAL_DETAILS = Symbol(
  'Update wage pay item modal details'
);
export const UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT = Symbol(
  'Update wage pay item modal amount'
);
export const UPDATE_WAGE_PAY_ITEM_MODAL_OVERRIDE_ACCOUNT = Symbol(
  'Update wage pay item modal override account'
);
export const ADD_WAGE_PAY_ITEM_MODAL_EMPLOYEE = Symbol(
  'Add wage pay item modal employee'
);
export const REMOVE_WAGE_PAY_ITEM_MODAL_EMPLOYEE = Symbol(
  'Remove wage pay item modal employee'
);
export const ADD_WAGE_PAY_ITEM_MODAL_EXEMPTION = Symbol(
  'Add wage pay item modal exemption'
);
export const REMOVE_WAGE_PAY_ITEM_MODAL_EXEMPTION = Symbol(
  'Remove wage pay item modal exemption'
);
export const CREATE_WAGE_PAY_ITEM_MODAL = Symbol('Create wage pay item modal');
export const UPDATE_WAGE_PAY_ITEM_MODAL = Symbol('Update wage pay item modal');

export const OPEN_DEDUCTION_PAY_ITEM_MODAL = Symbol(
  'Open deduction pay item modal'
);
export const CLOSE_DEDUCTION_PAY_ITEM_MODAL = Symbol(
  'Close deduction pay item modal'
);
export const LOAD_DEDUCTION_PAY_ITEM_MODAL = Symbol(
  'Load deduction pay item modal'
);
export const LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL = Symbol(
  'Load new deduction pay item modal'
);
export const CREATE_DEDUCTION_PAY_ITEM_MODAL = Symbol(
  'Create deduction pay item modal'
);
export const UPDATE_DEDUCTION_PAY_ITEM_MODAL = Symbol(
  'Update deduction pay item modal'
);
export const SET_DEDUCTION_PAY_ITEM_MODAL_ALERT = Symbol(
  'Set deduction pay item modal alert'
);
export const SET_DEDUCTION_PAY_ITEM_MODAL_LOADING_STATE = Symbol(
  'Set deduction pay item modal loading state'
);
export const SET_DEDUCTION_PAY_ITEM_MODAL_SUBMITTING_STATE = Symbol(
  'Set deduction pay item modal submitting state'
);
export const SET_DEDUCTION_PAY_ITEM_MODAL_INPUT = Symbol(
  'Set deduction pay item modal input'
);
export const FORMAT_DEDUCTION_PAY_ITEM_MODAL_AMOUNT_INPUT = Symbol(
  'Format deduction pay item modal amount input'
);
export const ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM = Symbol(
  'Add deduction pay item modal item'
);
export const REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM = Symbol(
  'Remove deduction pay item modal item'
);

export const OPEN_SUPER_FUND_MODAL = Symbol('Open super fund modal');
export const CLOSE_SUPER_FUND_MODAL = Symbol('Close super fund modal');
export const LOAD_NEW_SUPER_FUND = Symbol('Load new super fund');
export const LOAD_ABN_DETAIL = Symbol('Load abn detail');
export const CREATE_SUPER_FUND = Symbol('Create super fund');
export const SET_SUPER_FUND_MODAL_LOADING_STATE = Symbol(
  'Set super fund modal loading state'
);
export const SET_SUPER_FUND_MODAL_SUBMITTING_STATE = Symbol(
  'Set super fund modal submitting state'
);
export const UPDATE_SUPER_FUND_DETAIL = Symbol('Update super fund detail');
export const SET_ABN_LOADING_STATE = Symbol('Set abn loading state');
export const SET_ABN_STATUS = Symbol('Set abn status');
export const UPDATE_SELF_MANAGED_FUND_ABN = Symbol(
  'Update self managed fund abn'
);
export const SET_SUPER_FUND_MODAL_ALERT_MESSAGE = Symbol(
  'Set super fund modal alert message'
);
export const SELECT_APRA_FUND = Symbol('Select a APRA fund');
export const SHOW_CONTACT_DETAILS = Symbol('Show contact detail fields');
export const SET_ACCESS_TOKEN = Symbol('Set the access token for pay super');

export const LOAD_NEW_SUPER_PAY_ITEM_MODAL = Symbol(
  'Load a new super pay item'
);
export const LOAD_SUPER_PAY_ITEM_MODAL = Symbol('Load a super pay item');
export const CREATE_SUPER_PAY_ITEM_MODAL = Symbol('Create a super pay item');
export const UPDATE_SUPER_PAY_ITEM_MODAL = Symbol('Update a super pay item');
export const OPEN_SUPER_PAY_ITEM_MODAL = Symbol('Open super pay item modal');
export const CLOSE_SUPER_PAY_ITEM_MODAL = Symbol('Close super pay item modal');
export const SET_SUPER_PAY_ITEM_MODAL_LOADING_STATE = Symbol(
  'Set super pay item modal loading state'
);
export const SET_SUPER_PAY_ITEM_MODAL_ALERT = Symbol(
  'Set super pay item modal alert'
);
export const SET_SUPER_PAY_ITEM_MODAL_SUBMITTING_STATE = Symbol(
  'Set super pay item modal submitting state'
);
export const SET_SUPER_PAY_ITEM_MODAL_SUPER_PAY_ITEM = Symbol(
  'Set super pay item modal super pay item'
);
export const SET_SUPER_PAY_ITEM_MODAL_INPUT = Symbol(
  'Set super pay item modal input'
);
export const ADD_SUPER_PAY_ITEM_MODAL_ITEM = Symbol(
  'Add super pay item modal item'
);
export const REMOVE_SUPER_PAY_ITEM_MODAL_ITEM = Symbol(
  'Remove super pay item modal item'
);

export const LOAD_LEAVE_PAY_ITEM = Symbol('Load leave pay item');
export const LOAD_NEW_LEAVE_PAY_ITEM = Symbol('Load new leave pay item');
export const CREATE_LEAVE_PAY_ITEM = Symbol('Create leave pay item');
export const UPDATE_LEAVE_PAY_ITEM = Symbol('Update leave pay item');
export const OPEN_LEAVE_PAY_ITEM_MODAL = Symbol('Open leave pay item modal');
export const CLOSE_LEAVE_PAY_ITEM_MODAL = Symbol('Close leave pay item modal');
export const SET_LEAVE_PAY_ITEM_MODAL_LOADING_STATE = Symbol(
  'Set leave pay item modal loading state'
);
export const SET_LEAVE_PAY_ITEM_MODAL_ALERT = Symbol(
  'Set leave pay item modal alert'
);
export const SET_LEAVE_PAY_ITEM_MODAL_SUBMITTING_STATE = Symbol(
  'Set leave pay item modal submitting state'
);
export const ADD_LEAVE_PAY_ITEM_MODAL_EMPLOYEE = Symbol(
  'Add leave pay item modal employee'
);
export const REMOVE_LEAVE_PAY_ITEM_MODAL_EMPLOYEE = Symbol(
  'Remove leave pay item modal employee'
);
export const ADD_LEAVE_PAY_ITEM_MODAL_EXEMPTION = Symbol(
  'Add leave pay item modal exemption'
);
export const REMOVE_LEAVE_PAY_ITEM_MODAL_EXEMPTION = Symbol(
  'Remove leave pay item modal exemption'
);
export const ADD_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE = Symbol(
  'Add leave pay item modal linked wage'
);
export const REMOVE_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE = Symbol(
  'Remove leave pay item modal linked wage'
);
export const UPDATE_LEAVE_PAY_ITEM_MODAL_NAME = Symbol(
  'Update leave pay item modal name'
);
export const UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS = Symbol(
  'Update leave pay item modal calculation basis'
);
export const UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS_AMOUNTS = Symbol(
  'Update leave pay item modal calculation basis amounts'
);
export const TOGGLE_JOB_KEEPER = Symbol('Toggle the job keeper checkbox');
export const MARK_WAGE_AS_JOBKEEPER = Symbol('Mark wage as jobkeeper');
