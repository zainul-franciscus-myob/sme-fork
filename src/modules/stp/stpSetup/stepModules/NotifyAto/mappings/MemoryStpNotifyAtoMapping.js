import { GET_SOFTWARE_ID, SUBMIT_STP_REGISTRATION } from '../stpNotifyAtoIntents';
import getSoftwareIdResponse from './data/getSoftwareIdResponse';

const StpNotifyAtoMapping = {
  [GET_SOFTWARE_ID]: ({ onSuccess }) => onSuccess(getSoftwareIdResponse),
  [SUBMIT_STP_REGISTRATION]: ({ onSuccess }) => onSuccess({}),
};

export default StpNotifyAtoMapping;
