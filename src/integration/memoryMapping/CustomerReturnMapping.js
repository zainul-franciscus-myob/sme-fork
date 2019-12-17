import { LOAD_CUSTOMER_RETURN_LIST, SORT_AND_FILTER_CUSTOMER_RETURN_LIST } from '../../modules/customerReturn/CustomerReturnIntents';
import filterCustomerReturnListResponse from '../data/customerReturn/filterCustomerReturnList';
import loadCustomerReturnListResponse from '../data/customerReturn/loadCustomerReturnList';

const loadCustomerReturnList = ({ onSuccess }) => { onSuccess(loadCustomerReturnListResponse); };

const sortAndFilterCustomerReturnList = ({ onSuccess }) => {
  onSuccess(filterCustomerReturnListResponse);
};

const CustomerReturnMapping = {
  [LOAD_CUSTOMER_RETURN_LIST]: loadCustomerReturnList,
  [SORT_AND_FILTER_CUSTOMER_RETURN_LIST]: sortAndFilterCustomerReturnList,
};

export default CustomerReturnMapping;
