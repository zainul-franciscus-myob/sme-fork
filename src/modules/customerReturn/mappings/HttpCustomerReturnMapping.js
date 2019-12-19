import {
  LOAD_CUSTOMER_RETURN_LIST,
  SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
} from '../CustomerReturnIntents';

const HttpCustomerReturnMapping = {
  [LOAD_CUSTOMER_RETURN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/customerReturn/load_customer_return_list`,
  },
  [SORT_AND_FILTER_CUSTOMER_RETURN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/customerReturn/filter_customer_return_list`,
  },
};

export default HttpCustomerReturnMapping;
