import { LOAD_PAY_SUPER_READ } from '../../paySuper/paySuperRead/paySuperReadIntents';
import loadPaySuperReadResponse from '../data/paySuperRead/loadPaySuperReadResponse';

const PaySuperReadMapping = {
  [LOAD_PAY_SUPER_READ]: ({ onSuccess }) => { onSuccess(loadPaySuperReadResponse); },
};

export default PaySuperReadMapping;
