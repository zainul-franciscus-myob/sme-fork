import {
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  RECORD_PAY_SUPER,
  SORT_AND_FILTER_SUPER_PAYMENTS,
} from '../../paySuper/paySuperCreate/paySuperCreateIntents';
import filterSuperPayments from '../data/paySuperCreate/filterSuperPayments';
import loadAccountsAndSuperPayments from '../data/paySuperCreate/loadAccountsAndSuperPayments';
import recordPaySuper from '../data/paySuperCreate/recordPaySuper';

const PaySuperCreateMapping = {
  [LOAD_ACCOUNTS_AND_SUPER_PAYMENTS]:
    ({ onSuccess }) => onSuccess(loadAccountsAndSuperPayments),
  [SORT_AND_FILTER_SUPER_PAYMENTS]:
    ({ onSuccess }) => onSuccess(filterSuperPayments),
  [RECORD_PAY_SUPER]:
    ({ onSuccess }) => onSuccess(recordPaySuper),
};

export default PaySuperCreateMapping;
