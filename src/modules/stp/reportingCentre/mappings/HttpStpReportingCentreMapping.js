import { FILTER_PAY_EVENTS, LOAD_PAY_EVENTS } from '../reports/ReportsIntents';
import { LOAD_ATO_SETTINGS, UPDATE_BUSINESS_CONTACT } from '../atoSettings/AtoSettingsIntents';
import { LOAD_STP_REGISTRATION_STATUS } from '../ReportingCentreIntents';

const HttpStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/registration_status`,
  },
  [LOAD_ATO_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/ato_settings`,
  },
  [UPDATE_BUSINESS_CONTACT]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/stp/business_contact`,
  },
  [LOAD_PAY_EVENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/pay_events`,
  },
  [FILTER_PAY_EVENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/filter_pay_events`,
  },
};

export default HttpStpReportingCentreMapping;
