import {
  CREATE_PURCHASE_ORDER,
  DELETE_PURCHASE_ORDER,
  EXPORT_PURCHASE_ORDER_PDF,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_PURCHASE_ORDER,
  LOAD_NEW_PURCHASE_ORDER,
  LOAD_PURCHASE_ORDER,
  LOAD_SUPPLIER_DETAIL,
  SAVE_EMAIL_SETTINGS,
  SEND_EMAIL,
  UPDATE_PURCHASE_ORDER,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../PurchaseOrderIntents';

const HttpPurchaseOrderDetailMapping = {
  [LOAD_PURCHASE_ORDER]: {
    method: 'GET',
    getPath: ({ businessId, purchaseOrderId }) =>
      `/${businessId}/purchaseOrder/load_purchase_order/${purchaseOrderId}`,
  },
  [LOAD_NEW_PURCHASE_ORDER]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/load_new_purchase_order`,
  },
  [LOAD_NEW_DUPLICATE_PURCHASE_ORDER]: {
    method: 'GET',
    getPath: ({ businessId, duplicateId }) =>
      `/${businessId}/purchaseOrder/load_new_duplicate_purchase_order/${duplicateId}`,
  },
  [LOAD_SUPPLIER_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/purchaseOrder/load_supplier_detail/${supplierId}`,
  },
  [LOAD_ITEM_DETAIL_FOR_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/load_item_detail`,
  },
  [CREATE_PURCHASE_ORDER]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/create_purchase_order`,
  },
  [DELETE_PURCHASE_ORDER]: {
    method: 'DELETE',
    getPath: ({ businessId, purchaseOrderId }) =>
      `/${businessId}/purchaseOrder/delete_purchase_order/${purchaseOrderId}`,
  },
  [UPDATE_PURCHASE_ORDER]: {
    method: 'PUT',
    getPath: ({ businessId, purchaseOrderId }) =>
      `/${businessId}/purchaseOrder/update_purchase_order/${purchaseOrderId}`,
  },
  [EXPORT_PURCHASE_ORDER_PDF]: {
    method: 'GET',
    getPath: ({ businessId, purchaseOrderId }) =>
      `/${businessId}/purchaseOrder/export_purchase_order_pdf/${purchaseOrderId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/purchaseOrder/load_account/${accountId}`,
  },
  [LOAD_JOB_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, jobId }) =>
      `/${businessId}/purchaseOrder/load_job/${jobId}`,
  },
  [LOAD_ABN_FROM_SUPPLIER]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/purchaseOrder/load_abn_from_supplier/${supplierId}`,
  },
  [SAVE_EMAIL_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/save_email_settings`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, purchaseOrderId }) =>
      `/${businessId}/purchaseOrder/send_purchase_order_email/${purchaseOrderId}`,
  },
  [UPLOAD_EMAIL_ATTACHMENT]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseOrder/upload_email_attachment`,
  },
};

export default HttpPurchaseOrderDetailMapping;
