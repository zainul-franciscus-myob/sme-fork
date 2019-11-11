import { LOAD_PAY_RUN_LIST, SORT_AND_FILTER_PAY_RUN_LIST } from '../../payRun/payRunList/PayRunListIntents';
import filterPayRunList from '../data/payRunList/filterPayRunList';
import loadPayRunList from '../data/payRunList/loadPayRunList';

const PayRunListMapping = {
  [LOAD_PAY_RUN_LIST]: ({ onSuccess }) => onSuccess(loadPayRunList),
  [SORT_AND_FILTER_PAY_RUN_LIST]: ({ onSuccess }) => onSuccess(filterPayRunList),
};

export default PayRunListMapping;
