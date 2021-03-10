import {
  CREATE_ONBOARD_USER,
  DELETE_ONBOARD_USER,
  LOAD_BUSINESS_ONBOARDED_DETAILS,
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  LOAD_PAYDAY_USER_SESSION,
  LOAD_PAYRUN_PDF_REPORT,
  UPDATE_ONBOARD_USER,
  UPDATE_PAY_EVENT,
} from '../PaydayFilingIntents';

const PaydayFilingMapping = {
  [LOAD_PAYDAY_USER_SESSION]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/user_session`,
  },

  [LOAD_BUSINESS_ONBOARDED_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_business_onboarded_details`,
  },

  [DELETE_ONBOARD_USER]: {
    method: 'DELETE',
    getPath: ({ businessId, userGuid }) =>
      `/${businessId}/nz-payroll/paydayFiling/remove_onboard_user/${userGuid}`,
  },

  [CREATE_ONBOARD_USER]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/create_onboard_user`,
  },

  [UPDATE_ONBOARD_USER]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/update_onboard_user`,
  },

  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_ei_submissions_initial`,
  },

  [LOAD_FILTERED_EI_SUBMISSIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_filtered_ei_submissions`,
  },

  [LOAD_PAYRUN_PDF_REPORT]: {
    method: 'GET',
    getPath: ({ businessId, payRunId }) =>
      `/${businessId}/nz-payroll/paydayFiling/payruns/${payRunId}/load_report`,
  },

  [UPDATE_PAY_EVENT]: {
    method: 'PUT',
    getPath: ({ businessId, payRunId }) =>
      `/${businessId}/nz-payroll/paydayFiling/update_pay_event/${payRunId}`,
  },
};

export default PaydayFilingMapping;
