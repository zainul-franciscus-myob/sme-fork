import { LOAD_STP_REGISTRATION_STATUS } from '../ReportingCentreIntents';
import stpRegistrationStatus from './data/stpRegistrationStatus';

const MemoryStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: ({ onSuccess }) => onSuccess(stpRegistrationStatus),
};

export default MemoryStpReportingCentreMapping;
