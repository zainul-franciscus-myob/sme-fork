import { LOAD_ATO_SETTINGS, UPDATE_BUSINESS_CONTACT } from '../atoSettings/AtoSettingsIntents';
import { LOAD_STP_REGISTRATION_STATUS } from '../ReportingCentreIntents';
import loadAtoSettingsResponse from './data/loadAtoSettingsResponse';
import stpRegistrationStatus from './data/stpRegistrationStatus';

const MemoryStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: ({ onSuccess }) => onSuccess(stpRegistrationStatus),
  [LOAD_ATO_SETTINGS]: ({ onSuccess }) => onSuccess(loadAtoSettingsResponse),
  [UPDATE_BUSINESS_CONTACT]: ({ onSuccess }) => onSuccess({ message: 'Success!' }),
};

export default MemoryStpReportingCentreMapping;
