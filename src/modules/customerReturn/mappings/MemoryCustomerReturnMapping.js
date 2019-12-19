import { LOAD_CUSTOMER_RETURN_LIST, SORT_AND_FILTER_CUSTOMER_RETURN_LIST } from '../CustomerReturnIntents';
import filterCustomerReturnListResponse from './data/filterCustomerReturnList';
import loadCustomerReturnListResponse from './data/loadCustomerReturnList';

const loadCustomerReturnList = ({ onSuccess }) => { onSuccess(loadCustomerReturnListResponse); };

const sortAndFilterCustomerReturnList = ({ onSuccess }) => {
  onSuccess(filterCustomerReturnListResponse);
};

const MemoryCustomerReturnMapping = {
  [LOAD_CUSTOMER_RETURN_LIST]: loadCustomerReturnList,
  [SORT_AND_FILTER_CUSTOMER_RETURN_LIST]: sortAndFilterCustomerReturnList,
};

export default MemoryCustomerReturnMapping;
