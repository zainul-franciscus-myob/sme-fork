import { SORT_AND_FILTER_PAY_RUN_LIST } from '../payRunList/PayRunListIntents';
import filterPayRunList from './data/payRunList/filterPayRunList';

const PayRunListMapping = {
  [SORT_AND_FILTER_PAY_RUN_LIST]: ({ onSuccess }) =>
    onSuccess(filterPayRunList),
};

export default PayRunListMapping;
