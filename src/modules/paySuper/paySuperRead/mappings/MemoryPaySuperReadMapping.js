import { LOAD_PAY_SUPER_READ, REVERSE_PAY_SUPER } from '../paySuperReadIntents';
import loadPaySuperReadResponse from './data/loadPaySuperReadResponse';
import paySuperReversalResponse from './data/paySuperReversalResponse';

const MemoryPaySuperReadMapping = {
  [LOAD_PAY_SUPER_READ]: ({ onSuccess }) => { onSuccess(loadPaySuperReadResponse); },
  [REVERSE_PAY_SUPER]: ({ onSuccess }) => { onSuccess(paySuperReversalResponse); },
};

export default MemoryPaySuperReadMapping;
