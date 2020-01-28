import {
  FILTER_PAY_EVENTS,
  LOAD_PAY_EVENTS,
  LOAD_PAY_EVENT_DETAILS,
} from '../reports/ReportsIntents';
import {
  FILTER_TERMINATION_EMPLOYEES,
  LOAD_TERMINATION_EMPLOYEES,
} from '../termination/TerminationIntents';
import {
  LOAD_ATO_SETTINGS,
  UPDATE_AGENT_CONTACT,
  UPDATE_BUSINESS_CONTACT,
  UPDATE_BUSINESS_DETAILS,
} from '../atoSettings/AtoSettingsIntents';
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
    getPath: ({ businessId, payEventId }) => `/${businessId}/stp/pay_events/${payEventId}`,
  },
  [LOAD_TERMINATION_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/termination_employees`,
  },
  [FILTER_TERMINATION_EMPLOYEES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/filter_termination_employees`,
  },
  [UPDATE_STP_EMPLOYEES]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/stp/stp_employees`,
  },
};

export default HttpStpReportingCentreMapping;
