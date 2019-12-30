import { LOAD_PAY_SUPER_LIST, LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST } from '../paySuperIntents';
import loadPaySuperListResponse from './data/loadPaySuperListResponse';
import loadUpdatedSuperPaymentStatusList from './data/loadUpdatedSuperPaymentStatusList';

const MemoryPaySuperListMapping = {
  [LOAD_PAY_SUPER_LIST]: ({ onSuccess }) => { onSuccess(loadPaySuperListResponse); },
  [LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST]: ({ onSuccess }) => {
    onSuccess(loadUpdatedSuperPaymentStatusList);
  },
};

export default MemoryPaySuperListMapping;
