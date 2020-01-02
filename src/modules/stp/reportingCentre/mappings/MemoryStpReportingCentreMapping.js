import { LOAD_ATO_SETTINGS } from '../atoSettings/AtoSettingsIntents';
import { LOAD_STP_REGISTRATION_STATUS } from '../ReportingCentreIntents';
import loadAtoSettingsResponse from './data/loadAtoSettingsResponse';
import stpRegistrationStatus from './data/stpRegistrationStatus';

const MemoryStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: ({ onSuccess }) => onSuccess(stpRegistrationStatus),
  [LOAD_ATO_SETTINGS]: ({ onSuccess }) => onSuccess(loadAtoSettingsResponse),
};

export default MemoryStpReportingCentreMapping;
