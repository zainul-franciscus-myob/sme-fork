import {
  CALCULATE_LINE,
  CREATE_BILL,
  LOAD_NEW_BILL_ITEM_DETAIL,
  PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY,
  REMOVE_LINE,
  UPDATE_BILL,
  UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
  UPDATE_TAX_INCLUSIVE,
} from '../../bill/billDetail/billItem/BillItemIntents';

const BillItemMapping = {
  [LOAD_NEW_BILL_ITEM_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_new_bill_item_detail`,
  },
  [CREATE_BILL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/create_bill_item_detail`,
  },
  [UPDATE_BILL]: {
    method: 'PUT',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/update_bill_item_detail/${billId}`,
  },
  [UPDATE_LINE_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_item_totals/change_line_item`,
  },
  [UPDATE_LINE_TAX_CODE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_item_totals/change_line_tax_code`,
  },
  [UPDATE_TAX_INCLUSIVE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_item_totals/change_tax_inclusive`,
  },
  [CALCULATE_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_item_totals/change_line_amount`,
  },
  [REMOVE_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_item_totals/remove_line`,
  },
  [PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY]: {
    method: 'GET',
    getPath:
      ({ businessId, inTrayDocumentId }) => `/${businessId}/bill/prefill_new_bill_item_from_in_tray/${inTrayDocumentId}`,
  },
};

export default BillItemMapping;
