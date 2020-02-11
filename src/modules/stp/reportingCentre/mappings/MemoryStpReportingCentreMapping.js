import {
  DELETE_EMPLOYEE_ETP,
  LOAD_EMPLOYEE_ETP,
} from '../etps/EtpIntents';
import {
  FILTER_PAY_EVENTS,
  LOAD_EMPLOYEE_YTD_REPORT,
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
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
  OPEN_EMPLOYEE_SUMMARY_REPORT,
  OPEN_EOFY_YTD_REPORT,
  SUBMIT_EMPLOYEES_FINALISATION,
  SUBMIT_EMPLOYEES_REMOVE_FINALISATION,
} from '../finalisation/FinalisationIntents';
import {
  LOAD_STP_REGISTRATION_STATUS,
  UPDATE_STP_EMPLOYEES,
} from '../ReportingCentreIntents';
import filterEmployeesResponse from './data/filterTerminationEmployeesResponse';
import filterPayEventsResponse from './data/filterPayEventsResponse';
import loadAtoSettingsResponse from './data/loadAtoSettingsResponse';
import loadEmployeeEtps from './data/loadEmployeeEtps';
import loadEmployeesResponse from './data/loadTerminationEmployeesResponse';
import loadFinalisationEmployeesAndHeaderDetailsForYearResponse from './data/loadFinalisationEmployeesAndHeaderDetailsForYearResponse';
import loadFinalisationInitialEmployeesAndHeaderDetailsResponse from './data/loadFinalisationInitialEmployeesAndHeaderDetailsResponse';
import loadPayEventDetails from './data/loadPayEventDetailResponse';
import loadPayEventsResponse from './data/loadPayEventsResponse';
import stpRegistrationStatus from './data/stpRegistrationStatus';
import submitEmployeesFinalisation from './data/submitEmployeesFinalisation';
import submitEmployeesRemoveFinalisation from './data/submitEmployeesRemoveFinalisation';

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
  [LOAD_EMPLOYEE_ETP]: ({ onSuccess }) => onSuccess(loadEmployeeEtps),
  [DELETE_EMPLOYEE_ETP]: () => {},
  [LOAD_INITIAL_EMPLOYEES_AND_HEADERS]:
    ({ onSuccess }) => onSuccess(loadFinalisationInitialEmployeesAndHeaderDetailsResponse),
  [LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR]:
    ({ onSuccess }) => onSuccess(loadFinalisationEmployeesAndHeaderDetailsForYearResponse),
  [SUBMIT_EMPLOYEES_FINALISATION]: ({ onSuccess }) => onSuccess(submitEmployeesFinalisation),
  [SUBMIT_EMPLOYEES_REMOVE_FINALISATION]: ({ onSuccess }) => onSuccess(
    submitEmployeesRemoveFinalisation,
  ),
  [LOAD_EMPLOYEE_YTD_REPORT]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [OPEN_EOFY_YTD_REPORT]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [OPEN_EMPLOYEE_SUMMARY_REPORT]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
};

export default MemoryStpReportingCentreMapping;
