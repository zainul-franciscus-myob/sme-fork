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
import filterEmployeesResponse from './data/filterTerminationEmployeesResponse';
import filterPayEventsResponse from './data/filterPayEventsResponse';
import loadAtoSettingsResponse from './data/loadAtoSettingsResponse';
import loadEmployeesResponse from './data/loadTerminationEmployeesResponse';
import loadPayEventDetails from './data/loadPayEventDetailResponse';
import loadPayEventsResponse from './data/loadPayEventsResponse';
import stpRegistrationStatus from './data/stpRegistrationStatus';

const MemoryStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: ({ onSuccess }) => onSuccess(stpRegistrationStatus),
  [LOAD_ATO_SETTINGS]: ({ onSuccess }) => onSuccess(loadAtoSettingsResponse),
  [UPDATE_BUSINESS_DETAILS]: ({ onSuccess }) => onSuccess({ message: 'Success!' }),
  [UPDATE_BUSINESS_CONTACT]: ({ onSuccess }) => onSuccess({ message: 'Success!' }),
  [UPDATE_AGENT_CONTACT]: ({ onSuccess }) => onSuccess({ message: 'Success!' }),
  [LOAD_PAY_EVENTS]: ({ onSuccess }) => onSuccess(loadPayEventsResponse),
  [FILTER_PAY_EVENTS]: ({ onSuccess }) => onSuccess(filterPayEventsResponse),
  [LOAD_PAY_EVENT_DETAILS]: ({ urlParams, onSuccess }) => {
    onSuccess({
      ...loadPayEventDetails,
      id: urlParams.payEventId,
    });
  },
  [LOAD_TERMINATION_EMPLOYEES]: ({ onSuccess }) => onSuccess(loadEmployeesResponse),
  [FILTER_TERMINATION_EMPLOYEES]: ({ onSuccess }) => onSuccess(filterEmployeesResponse),
  [UPDATE_STP_EMPLOYEES]: () => {},
};

export default MemoryStpReportingCentreMapping;
