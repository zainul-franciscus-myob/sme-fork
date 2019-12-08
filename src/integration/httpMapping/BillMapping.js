import {
  LOAD_BILL_LIST,
  SORT_AND_FILTER_BILL_LIST,
} from '../../bill/BillIntents';
import { LOAD_BILL_LIST_NEXT_PAGE } from '../../bill/billDetail/BillIntents';

const BillMapping = {
  [LOAD_BILL_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_bill_list`,
  },
  [SORT_AND_FILTER_BILL_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/filter_bill_list`,
  },
  [LOAD_BILL_LIST_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/filter_bill_list`,
  },
};

export default BillMapping;
