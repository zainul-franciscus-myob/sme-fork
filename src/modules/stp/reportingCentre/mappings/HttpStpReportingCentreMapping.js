import { CALCULATE_TURNOVER } from '../gstCalculator/GstCalculatorIntents';
import {
  CREATE_JOB_MAKER_EMPLOYEE_ACTION,
  LOAD_INITIAL_JOB_MAKER_EMPLOYEES,
} from '../jobMaker/JobMakerIntents';
import { DELETE_EMPLOYEE_ETP, LOAD_EMPLOYEE_ETP } from '../etps/EtpIntents';
import {
  FILTER_JOB_KEEPER_EMPLOYEES,
  LOAD_EMPLOYEES_BENEFIT_REPORT,
  LOAD_INITIAL_JOB_KEEPER_EMPLOYEES,
  LOAD_JOB_KEEPER_REPORT,
  UPDATE_JOB_KEEPER_PAYMENTS,
} from '../jobKeeper/JobKeeperIntents';
import {
  FILTER_PAY_EVENTS,
  LOAD_EMPLOYEE_YTD_REPORT,
  LOAD_PAY_EVENTS,
  LOAD_PAY_EVENT_DETAILS,
} from '../reports/ReportsIntents';
import {
  FILTER_TERMINATION_EMPLOYEES,
  LOAD_TERMINATION_EMPLOYEES,
  SORT_TERMINATION_EMPLOYEES,
} from '../termination/TerminationIntents';
import {
  LOAD_ATO_SETTINGS,
  UPDATE_AGENT_CONTACT,
  UPDATE_BUSINESS_CONTACT,
  UPDATE_BUSINESS_DETAILS,
} from '../atoSettings/AtoSettingsIntents';
import {
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
  OPEN_EMPLOYEE_SUMMARY_REPORT,
  OPEN_EOFY_YTD_REPORT,
  SORT_EMPLOYEES,
  SUBMIT_EMPLOYEES_FINALISATION,
  SUBMIT_EMPLOYEES_REMOVE_FINALISATION,
} from '../finalisation/FinalisationIntents';
import {
  LOAD_STP_REGISTRATION_STATUS,
  UPDATE_STP_EMPLOYEES,
} from '../ReportingCentreIntents';

const HttpStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/registration_status`,
  },
  [LOAD_ATO_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/ato_settings`,
  },
  [UPDATE_BUSINESS_DETAILS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/stp/business_details`,
  },
  [UPDATE_BUSINESS_CONTACT]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/stp/business_contact`,
  },
  [UPDATE_AGENT_CONTACT]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/stp/agent_contact`,
  },
  [LOAD_PAY_EVENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/pay_events`,
  },
  [FILTER_PAY_EVENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/filter_pay_events`,
  },
  [LOAD_PAY_EVENT_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, payEventId }) =>
      `/${businessId}/stp/pay_events/${payEventId}`,
  },
  [LOAD_TERMINATION_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/termination_employees`,
  },
  [LOAD_INITIAL_EMPLOYEES_AND_HEADERS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/eofy_finalisation_initial`,
  },
  [LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/eofy_finalisation_for_year`,
  },
  [FILTER_TERMINATION_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/filter_termination_employees`,
  },
  [UPDATE_STP_EMPLOYEES]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/stp/stp_employees`,
  },
  [LOAD_EMPLOYEE_ETP]: {
    method: 'GET',
    getPath: ({ businessId, employeeId }) =>
      `/${businessId}/stp/employee_etps/${employeeId}`,
  },
  [DELETE_EMPLOYEE_ETP]: {
    method: 'DELETE',
    getPath: ({ businessId }) => `/${businessId}/stp/employee_etps`,
  },
  [SUBMIT_EMPLOYEES_FINALISATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/finalise_employees_eofy`,
  },
  [SUBMIT_EMPLOYEES_REMOVE_FINALISATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/unfinalise_employees_eofy`,
  },
  [LOAD_EMPLOYEE_YTD_REPORT]: {
    method: 'GET',
    getPath: ({ businessId, payEventId }) =>
      `/${businessId}/stp/pay_event_report/${payEventId}`,
  },
  [OPEN_EOFY_YTD_REPORT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/eofy_ytd_report`,
  },
  [OPEN_EMPLOYEE_SUMMARY_REPORT]: {
    method: 'GET',
    getPath: ({ businessId, employeeId }) =>
      `/${businessId}/stp/eofy_employee_report/${employeeId}`,
  },
  [SORT_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/eofy_finalisation_sort_employees`,
  },
  [SORT_TERMINATION_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/termination_employees_sort_employees`,
  },
  [LOAD_INITIAL_JOB_KEEPER_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/job_keeper_payments_initial`,
  },
  [FILTER_JOB_KEEPER_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/job_keeper_payments_filter`,
  },
  [UPDATE_JOB_KEEPER_PAYMENTS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/update_job_keeper_payments`,
  },
  [LOAD_JOB_KEEPER_REPORT]: {
    method: 'GET',
    getPath: ({ businessId, month }) =>
      `/${businessId}/stp/get_job_keeper_report/${month}`,
  },
  [CALCULATE_TURNOVER]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/calculate_gst_turnover`,
  },
  [LOAD_EMPLOYEES_BENEFIT_REPORT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/employee_benefit_report`,
  },
  [LOAD_INITIAL_JOB_MAKER_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/job_maker_employees_initial`,
  },
  [CREATE_JOB_MAKER_EMPLOYEE_ACTION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/jobmaker`,
  },
};

export default HttpStpReportingCentreMapping;
