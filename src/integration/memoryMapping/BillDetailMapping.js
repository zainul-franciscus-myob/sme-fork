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
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_IN_TRAY_DOCUMENT,
  LOAD_IN_TRAY_DOCUMENT_URL,
  LOAD_ITEM_OPTION,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  PREFILL_BILL_FROM_IN_TRAY,
  SERVICE_CALCULATE,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL,
} from '../../bill/billDetail/BillIntents';
import createBillResponse from '../data/bill/createBillResponse';
import itemCalculate from '../data/bill/itemCalculate';
import loadAddedAccountResponse from '../data/invoice/serviceLayout/loadAddedAccountResponse';
import loadInTrayDocumentResponse from '../data/bill/loadInTrayDocumentResponse';
import loadInTrayDocumentUrlResponse from '../data/bill/loadInTrayDocumentUrlResponse';
import loadItemBill from '../data/bill/loadItemBill';
import loadItemOption from '../data/bill/loadItemOption';
import loadNewDuplicateItemBill from '../data/bill/loadNewDuplicateItemBill';
import loadNewItemBill from '../data/bill/loadNewItemBill';
import loadSupplierAddress from '../data/bill/loadSupplierAddress';
import loadSupplierResponse from '../data/bill/loadSupplierResponse';
import prefillBillFromInTray from '../data/bill/prefillBillFromInTray';
import serviceCalculate from '../data/bill/serviceCalculate';
import successResponse from '../data/success';

const BillDetailMapping = {
  [LOAD_BILL]: ({ onSuccess }) => onSuccess(loadItemBill),
  [LOAD_NEW_BILL]: ({ onSuccess }) => onSuccess(loadNewItemBill),
  [LOAD_NEW_DUPLICATE_BILL]: ({ onSuccess }) => onSuccess(loadNewDuplicateItemBill),
  [DELETE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [CREATE_BILL]: ({ onSuccess }) => onSuccess(createBillResponse),
  [UPDATE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [SERVICE_CALCULATE]: ({ onSuccess }) => onSuccess(serviceCalculate),
  [LOAD_SUPPLIER_ADDRESS]: ({ onSuccess }) => onSuccess(loadSupplierAddress),
  [LOAD_SUPPLIER_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadSupplierResponse),
  [ITEM_CALCULATE_REMOVE_LINE]: ({ onSuccess }) => onSuccess(itemCalculate),
  [ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE]: ({ onSuccess }) => onSuccess(itemCalculate),
  [ITEM_CALCULATE_UPDATE_LINE_AMOUNT]: ({ onSuccess }) => onSuccess(itemCalculate),
  [ITEM_CALCULATE_UPDATE_LINE_ITEM]: ({ onSuccess }) => onSuccess(itemCalculate),
  [ITEM_CALCULATE_UPDATE_LINE_TAX_CODE]: ({ onSuccess }) => onSuccess(itemCalculate),
  [ITEM_CALCULATE_UPDATE_AMOUNT_PAID]: ({ onSuccess }) => onSuccess(itemCalculate),
  [EXPORT_BILL_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_ITEM_OPTION]: ({ onSuccess }) => onSuccess(loadItemOption),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [PREFILL_BILL_FROM_IN_TRAY]: ({ onSuccess }) => onSuccess(prefillBillFromInTray),
  [LOAD_IN_TRAY_DOCUMENT_URL]: ({ onSuccess }) => onSuccess(loadInTrayDocumentUrlResponse),
  [UNLINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(loadInTrayDocumentResponse),
  [LINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
};

export default BillDetailMapping;
