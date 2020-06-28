import {
  START_NEW_PAY_RUN,
} from '../payRunCreate/PayRunIntents';
import startNewPayRun from './data/payRun/startNewPayRun';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
};

export default PayRunMapping;
