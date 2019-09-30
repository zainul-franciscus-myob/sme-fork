import {
  DELETE_BILL_DETAIL,
  LOAD_BILL_DETAIL,
  LOAD_BILL_LIST,
  LOAD_DEFAULT_BILL_LAYOUT,
  LOAD_SUPPLIER_ADDRESS,
  SORT_AND_FILTER_BILL_LIST,
} from '../../bill/BillIntents';

const BillMapping = {
  [LOAD_BILL_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/load_bill_detail/${billId}`,
  },
  [LOAD_BILL_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_bill_list`,
  },
  [SORT_AND_FILTER_BILL_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/filter_bill_list`,
  },
  [DELETE_BILL_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/delete_bill_detail/${billId}`,
  },
  [LOAD_DEFAULT_BILL_LAYOUT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_default_layout`,
  },
  [LOAD_SUPPLIER_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) => `/${businessId}/bill/load_contact_address/${supplierId}`,
  },
};

export default BillMapping;
