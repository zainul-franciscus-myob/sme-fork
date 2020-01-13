import {
  CREATE_BILL,
  DELETE_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
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
  LOAD_ITEM_OPTION,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  PREFILL_BILL_FROM_IN_TRAY,
  SERVICE_CALCULATE,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL,
} from '../BillIntents';
import createBillResponse from './data/createBillResponse';
import itemCalculate from './data/itemCalculate';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadItemBill from './data/loadItemBill';
import loadItemOption from './data/loadItemOption';
import loadNewDuplicateItemBill from './data/loadNewDuplicateItemBill';
import loadNewItemBill from './data/loadNewItemBill';
import loadSupplierAddress from './data/loadSupplierAddress';
import loadSupplierResponse from './data/loadSupplierResponse';
import prefillBillFromInTray from './data/prefillBillFromInTray';
import serviceCalculate from './data/serviceCalculate';
import successResponse from './data/success';

const MemoryBillDetailMapping = {
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
  [DOWNLOAD_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [UNLINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [LINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
};

export default MemoryBillDetailMapping;
