import { SORT_AND_FILTER_PAY_RUN_LIST } from '../../payRunOld/payRunList/PayRunListIntents';
import filterPayRunList from '../data/payRunList/filterPayRunList';

const PayRunListMapping = {
  [SORT_AND_FILTER_PAY_RUN_LIST]: ({ onSuccess }) => onSuccess(filterPayRunList),
};

export default PayRunListMapping;
