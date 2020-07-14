export const PREPARE_PAYSLIPS = {
  key: 'preparePayslips',
  index: 3,
};

export const DONE = {
  key: 'done',
  index: 4,
};

export const RECORD_AND_REPORT = {
  key: 'recordAndReport',
  index: 2,
  nextStep: PREPARE_PAYSLIPS,
};

export const EMPLOYEE_PAY_LIST = {
  key: 'employeePayList',
  index: 1,
  nextStep: RECORD_AND_REPORT,
};

export const START_PAY_RUN = {
  key: 'startPayRun',
  index: 0,
  nextStep: EMPLOYEE_PAY_LIST,
};
