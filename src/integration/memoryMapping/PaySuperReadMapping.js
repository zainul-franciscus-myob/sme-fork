import { LOAD_PAY_SUPER_READ, REVERSE_PAY_SUPER } from '../../paySuper/paySuperRead/paySuperReadIntents';
import loadPaySuperReadResponse from '../data/paySuperRead/loadPaySuperReadResponse';
import paySuperReversalResponse from '../data/paySuperRead/paySuperReversalResponse';

const PaySuperReadMapping = {
  [LOAD_PAY_SUPER_READ]: ({ onSuccess }) => { onSuccess(loadPaySuperReadResponse); },
  [REVERSE_PAY_SUPER]: ({ onSuccess }) => { onSuccess(paySuperReversalResponse); },
};

export default PaySuperReadMapping;
