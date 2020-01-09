import { GET_BUSINESS_SID, SUBMIT_STP_REGISTRATION } from '../stpNotifyAtoIntents';
import getBusinessSidResponse from './data/getBusinessSidResponse';

const StpNotifyAtoMapping = {
  [GET_BUSINESS_SID]: ({ onSuccess }) => onSuccess(getBusinessSidResponse),
  [SUBMIT_STP_REGISTRATION]: ({ onSuccess }) => onSuccess({}),
};

export default StpNotifyAtoMapping;
