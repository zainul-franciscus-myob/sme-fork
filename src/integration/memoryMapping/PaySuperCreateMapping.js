import {
  AUTHORISE_WITH_CODE,
  GET_CODE_TO_AUTHORISE,
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  RECORD_PAY_SUPER,
  SORT_AND_FILTER_SUPER_PAYMENTS,
} from '../../paySuper/paySuperCreate/paySuperCreateIntents';
import filterSuperPayments from '../data/paySuperCreate/filterSuperPayments';
import getAuthorisationPayload from '../data/paySuperCreate/getAuthorisationPayload';
import loadAccountsAndSuperPayments from '../data/paySuperCreate/loadAccountsAndSuperPayments';
import recordPaySuper from '../data/paySuperCreate/recordPaySuper';

const PaySuperCreateMapping = {
  [LOAD_ACCOUNTS_AND_SUPER_PAYMENTS]:
    ({ onSuccess }) => onSuccess(loadAccountsAndSuperPayments),
  [SORT_AND_FILTER_SUPER_PAYMENTS]:
    ({ onSuccess }) => onSuccess(filterSuperPayments),
  [RECORD_PAY_SUPER]:
    ({ onSuccess }) => onSuccess(recordPaySuper),
  [GET_CODE_TO_AUTHORISE]:
    ({ onSuccess }) => onSuccess(getAuthorisationPayload),
  [AUTHORISE_WITH_CODE]:
    ({ onSuccess }) => onSuccess({ message: 'Pay super authorised.' }),
};

export default PaySuperCreateMapping;
