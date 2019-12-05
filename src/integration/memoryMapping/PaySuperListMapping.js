import { LOAD_PAY_SUPER_LIST } from '../../paySuper/paySuperList/paySuperIntents';
import loadPaySuperListResponse from '../data/paySuperList/loadPaySuperListResponse';

const PaySuperListMapping = {
  [LOAD_PAY_SUPER_LIST]: ({ onSuccess }) => { onSuccess(loadPaySuperListResponse); },
};

export default PaySuperListMapping;
