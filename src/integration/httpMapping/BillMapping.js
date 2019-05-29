import {
  CREATE_BILL_SERVICE_DETAIL,
  DELETE_BILL_SERVICE_DETAIL,
  GET_CALCULATED_BILL_SERVICE_DETAIL_TOTALS,
  LOAD_BILL_DETAIL,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_NEW_BILL_ITEM_DETAIL, LOAD_NEW_BILL_SERVICE_DETAIL,
  UPDATE_BILL_SERVICE_DETAIL,
} from '../../bill/BillIntents';

const BillMapping = {
  [LOAD_NEW_BILL_ITEM_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_new_bill_item_detail`,
  },
  [LOAD_NEW_BILL_SERVICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_new_bill_service_detail`,
  },
  [LOAD_BILL_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/load_bill_detail/${billId}`,
  },
  [LOAD_CUSTOMER_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) => `/${businessId}/bill/load_contact_address/${customerId}`,
  },
  [CREATE_BILL_SERVICE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/create_bill_service_detail`,
  },
  [UPDATE_BILL_SERVICE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/update_bill_service_detail/${billId}`,
  },
  [DELETE_BILL_SERVICE_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/delete_bill_service_detail/${billId}`,
  },
  [GET_CALCULATED_BILL_SERVICE_DETAIL_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_service_detail_totals`,
  },
};

export default BillMapping;
