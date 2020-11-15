import {
  LOAD_PURCHASE_ORDER_LIST,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST,
} from '../../PurchaseOrderIntents';

const PurchaseOrderMapping = {
  [LOAD_PURCHASE_ORDER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/load_purchase_order_list`,
  },
  [SORT_AND_FILTER_PURCHASE_ORDER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/filter_purchase_order_list`,
  },
  [LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/filter_purchase_order_list`,
  },
};

export default PurchaseOrderMapping;
