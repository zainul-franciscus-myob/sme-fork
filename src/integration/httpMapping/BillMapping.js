import {
  LOAD_BILL_DETAIL,
  LOAD_NEW_BILL_ITEM_DETAIL,
  LOAD_NEW_BILL_SERVICE_DETAIL,
} from '../../bill/BillIntents';

const BillMapping = {
  [LOAD_NEW_BILL_ITEM_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_new_item_bill`,
  },
  [LOAD_NEW_BILL_SERVICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_new_service_bill`,
  },
  [LOAD_BILL_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/load_bill/${billId}`,
  },
};

export default BillMapping;
