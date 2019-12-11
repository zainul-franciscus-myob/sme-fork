import { LOAD_PAY_SUPER_LIST, LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST } from '../../paySuper/paySuperList/paySuperIntents';
import loadPaySuperListResponse from '../data/paySuperList/loadPaySuperListResponse';
import loadUpdatedSuperPaymentStatusList from '../data/paySuperList/loadUpdatedSuperPaymentStatusList';

const PaySuperListMapping = {
  [LOAD_PAY_SUPER_LIST]: ({ onSuccess }) => { onSuccess(loadPaySuperListResponse); },
  [LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST]: ({ onSuccess }) => {
    onSuccess(loadUpdatedSuperPaymentStatusList);
  },
};

export default PaySuperListMapping;
