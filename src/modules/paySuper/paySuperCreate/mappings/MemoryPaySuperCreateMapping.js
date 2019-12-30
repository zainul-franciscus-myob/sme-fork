import {
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  RECORD_PAY_SUPER,
  SORT_AND_FILTER_SUPER_PAYMENTS,
} from '../paySuperCreateIntents';
import filterSuperPayments from './data/filterSuperPayments';
import loadAccountsAndSuperPayments from './data/loadAccountsAndSuperPayments';
import recordPaySuper from './data/recordPaySuper';

const MemoryPaySuperCreateMapping = {
  [LOAD_ACCOUNTS_AND_SUPER_PAYMENTS]:
    ({ onSuccess }) => onSuccess(loadAccountsAndSuperPayments),
  [SORT_AND_FILTER_SUPER_PAYMENTS]:
    ({ onSuccess }) => onSuccess(filterSuperPayments),
  [RECORD_PAY_SUPER]:
    ({ onSuccess }) => onSuccess(recordPaySuper),
};

export default MemoryPaySuperCreateMapping;
