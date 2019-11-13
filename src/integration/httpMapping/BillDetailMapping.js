import {
  CREATE_BILL,
  DELETE_BILL,
  EXPORT_BILL_PDF,
  ITEM_CALCULATE_REMOVE_LINE,
  ITEM_CALCULATE_UPDATE_AMOUNT_PAID,
  ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE,
  ITEM_CALCULATE_UPDATE_LINE_AMOUNT,
  ITEM_CALCULATE_UPDATE_LINE_ITEM,
  ITEM_CALCULATE_UPDATE_LINE_TAX_CODE,
  LOAD_BILL,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  PREFILL_NEW_BILL_FROM_IN_TRAY,
  SERVICE_CALCULATE,
  UPDATE_BILL,
} from '../../bill/billDetail/BillIntents';

const BillDetailMapping = {
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
  [LOAD_SUPPLIER_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) => `/${businessId}/bill/load_supplier_address/${supplierId}`,
  },
  [LOAD_SUPPLIER_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) => `/${businessId}/bill/load_supplier/${supplierId}`,
  },
  [ITEM_CALCULATE_UPDATE_LINE_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/item_calculate_update_line_item`,
  },
  [ITEM_CALCULATE_UPDATE_LINE_TAX_CODE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/item_calculate_update_line_tax_code`,
  },
  [ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/item_calculate_update_is_tax_inclusive`,
  },
  [ITEM_CALCULATE_UPDATE_LINE_AMOUNT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/item_calculate_update_line_amount`,
  },
  [ITEM_CALCULATE_REMOVE_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/item_calculate_remove_line`,
  },
  [ITEM_CALCULATE_UPDATE_AMOUNT_PAID]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/item_calculate_update_amount_paid`,
  },
  [SERVICE_CALCULATE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/service_calculate`,
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
  [PREFILL_NEW_BILL_FROM_IN_TRAY]: {
    method: 'GET',
    getPath: ({ businessId, inTrayDocumentId }) => `/${businessId}/bill/prefill_new_bill_from_in_tray/${inTrayDocumentId}`,
  },
  [EXPORT_BILL_PDF]: {
    method: 'GET',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/export_bill_pdf/${billId}`,
  },
};

export default BillDetailMapping;
