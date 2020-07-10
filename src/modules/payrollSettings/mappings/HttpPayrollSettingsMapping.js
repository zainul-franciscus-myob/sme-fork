import {
  CREATE_EMPLOYMENT_CLASSIFICATION,
  DELETE_EMPLOYMENT_CLASSIFICATION,
  LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_GENERAL_PAYROLL_INFORMATION,
  LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_PAY_SLIP_EMAIL_DEFAULTS,
  LOAD_SUPER_FUND_LIST,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
  SUBMIT_PAY_SLIP_EMAIL_DEFAULTS,
  UPDATE_EMPLOYMENT_CLASSIFICATION,
  UPDATE_GENERAL_PAYROLL_INFORMATION,
} from '../PayrollSettingsIntents';

const HttpPayrollSettingsMapping = {
  [LOAD_SUPER_FUND_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/load_super_fund_list`,
  },
  [SORT_AND_FILTER_SUPER_FUND_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/filter_super_fund_list`,
  },
  [LOAD_EMPLOYMENT_CLASSIFICATION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/load_employment_classification_list`,
  },
  [SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/filter_employment_classification_list`,
  },
  [LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/load_new_employment_classification_detail`,
  },
  [LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, employmentClassificationId }) =>
      `/${businessId}/payrollSettings/load_employment_classification_detail/${employmentClassificationId}`,
  },
  [CREATE_EMPLOYMENT_CLASSIFICATION]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/create_employment_classification`,
  },
  [UPDATE_EMPLOYMENT_CLASSIFICATION]: {
    method: 'PUT',
    getPath: ({ businessId, employmentClassificationId }) =>
      `/${businessId}/payrollSettings/update_employment_classification/${employmentClassificationId}`,
  },
  [DELETE_EMPLOYMENT_CLASSIFICATION]: {
    method: 'DELETE',
    getPath: ({ businessId, employmentClassificationId }) =>
      `/${businessId}/payrollSettings/delete_employment_classification/${employmentClassificationId}`,
  },
  [LOAD_GENERAL_PAYROLL_INFORMATION]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/load_general_payroll_information`,
  },
  [UPDATE_GENERAL_PAYROLL_INFORMATION]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/update_general_payroll_information`,
  },
  [LOAD_PAY_SLIP_EMAIL_DEFAULTS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/load_pay_slip_email_defaults`,
  },
  [SUBMIT_PAY_SLIP_EMAIL_DEFAULTS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/payrollSettings/submit_pay_slip_email_defaults`,
  },
};

export default HttpPayrollSettingsMapping;
