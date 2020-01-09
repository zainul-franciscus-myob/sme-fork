import { FILTER_PAY_EVENTS, LOAD_PAY_EVENTS } from '../reports/ReportsIntents';
import { LOAD_ATO_SETTINGS, UPDATE_BUSINESS_CONTACT } from '../atoSettings/AtoSettingsIntents';
import { LOAD_STP_REGISTRATION_STATUS } from '../ReportingCentreIntents';
import filterPayEventsResponse from './data/filterPayEventsResponse';
import loadAtoSettingsResponse from './data/loadAtoSettingsResponse';
import loadPayEventsResponse from './data/loadPayEventsResponse';
import stpRegistrationStatus from './data/stpRegistrationStatus';

const MemoryStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: ({ onSuccess }) => onSuccess(stpRegistrationStatus),
  [LOAD_ATO_SETTINGS]: ({ onSuccess }) => onSuccess(loadAtoSettingsResponse),
  [UPDATE_BUSINESS_CONTACT]: ({ onSuccess }) => onSuccess({ message: 'Success!' }),
  [LOAD_PAY_EVENTS]: ({ onSuccess }) => onSuccess(loadPayEventsResponse),
  [FILTER_PAY_EVENTS]: ({ onSuccess }) => onSuccess(filterPayEventsResponse),
};

export default MemoryStpReportingCentreMapping;
