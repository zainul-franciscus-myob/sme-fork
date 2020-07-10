import { LOAD_PAY_RUN_DETAILS } from '../payRunDetail/payRunDetailIntents';
import loadPayRunDetail from './data/payRunDetail/loadPayRunDetail';

const PayRunDetailMapping = {
  [LOAD_PAY_RUN_DETAILS]: ({ onSuccess }) => onSuccess(loadPayRunDetail),
};

export default PayRunDetailMapping;
