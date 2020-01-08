import { GET_BUSINESS_SID } from '../stpNotifyAtoIntents';
import getBusinessSidResponse from './data/getBusinessSidResponse';

const StpNotifyAtoMapping = {
  [GET_BUSINESS_SID]: ({ onSuccess }) => onSuccess(getBusinessSidResponse),
};

export default StpNotifyAtoMapping;
