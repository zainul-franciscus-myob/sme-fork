import {
  CALCULATE_BILL_ITEM_CHANGE,
  CREATE_BILL,
  DELETE_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  EXPORT_BILL_PDF,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_OPTION,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_SUPPLIER_AFTER_CREATE,
  LOAD_SUPPLIER_DETAIL,
  PREFILL_BILL_FROM_IN_TRAY,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL,
} from '../BillIntents';

const HttpBillDetailMapping = {
  [LOAD_BILL]: {
    method: 'GET',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/load_bill/${billId}`,
  },
  [LOAD_NEW_BILL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_new_bill`,
  },
  [LOAD_NEW_DUPLICATE_BILL]: {
    method: 'GET',
    getPath: ({ businessId, duplicatedBillId }) => `/${businessId}/bill/load_new_duplicate_bill/${duplicatedBillId}`,
  },
  [LOAD_SUPPLIER_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) => `/${businessId}/bill/load_supplier_detail/${supplierId}`,
  },
  [LOAD_SUPPLIER_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) => `/${businessId}/bill/load_supplier_after_create/${supplierId}`,
  },
  [CALCULATE_BILL_ITEM_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_item_change`,
  },
  [LOAD_ITEM_DETAIL_FOR_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/load_item_detail`,
  },
  [CREATE_BILL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/create_bill`,
  },
  [DELETE_BILL]: {
    method: 'DELETE',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/delete_bill/${billId}`,
  },
  [UPDATE_BILL]: {
    method: 'PUT',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/update_bill/${billId}`,
  },
  [EXPORT_BILL_PDF]: {
    method: 'GET',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/export_bill_pdf/${billId}`,
  },
  [LOAD_ITEM_OPTION]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) => `/${businessId}/bill/load_item_option/${itemId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) => `/${businessId}/bill/load_account/${accountId}`,
  },
  [PREFILL_BILL_FROM_IN_TRAY]: {
    method: 'GET',
    getPath: ({ businessId, inTrayDocumentId }) => `/${businessId}/bill/prefill_bill_from_in_tray/${inTrayDocumentId}`,
  },
  [DOWNLOAD_IN_TRAY_DOCUMENT]: {
    method: 'GET',
    getPath: ({ businessId, inTrayDocumentId }) => `/${businessId}/bill/download_in_tray_document/${inTrayDocumentId}`,
  },
  [UNLINK_IN_TRAY_DOCUMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, inTrayDocumentId }) => `/${businessId}/bill/unlink_in_tray_document/${inTrayDocumentId}`,
  },
  [LINK_IN_TRAY_DOCUMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/link_in_tray_document`,
  },
};

export default HttpBillDetailMapping;
