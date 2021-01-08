import { LOAD_PAY_RUN_DETAILS } from '../payRunDetail/payRunDetailNzIntents';
import loadPayRunDetail from './data/payRunDetail/loadPayRunDetail';

const PayRunDetailMapping = {
  [LOAD_PAY_RUN_DETAILS]: ({ onSuccess }) => onSuccess(loadPayRunDetail),
};

export default PayRunDetailMapping;
