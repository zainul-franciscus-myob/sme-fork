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
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  PREFILL_BILL_FROM_IN_TRAY,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL,
} from '../BillIntents';
import calculatedLineTotalsResponse from './data/calculatedLineTotalsResponse';
import createBillResponse from './data/createBillResponse';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadItemAndServiceBill from './data/loadItemAndServiceBill';
import loadItemOption from './data/loadItemOption';
import loadNewBill from './data/loadNewBill';
import loadNewDuplicateItemAndServiceBill from './data/loadNewDuplicateItemAndServiceBill';
import loadSupplierAddress from './data/loadSupplierAddress';
import loadSupplierResponse from './data/loadSupplierResponse';
import prefillBillFromInTray from './data/prefillBillFromSupplierFeed';
import successResponse from './data/success';
import updatedLineForItemDetail from './data/updatedLineForItemDetail';

const MemoryBillDetailMapping = {
  [LOAD_BILL]: ({ onSuccess }) => onSuccess(loadItemAndServiceBill),
  [LOAD_NEW_BILL]: ({ onSuccess }) => onSuccess(loadNewBill),
  [LOAD_NEW_DUPLICATE_BILL]: ({ onSuccess }) => onSuccess(loadNewDuplicateItemAndServiceBill),
  [DELETE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [CREATE_BILL]: ({ onSuccess }) => onSuccess(createBillResponse),
  [UPDATE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_SUPPLIER_ADDRESS]: ({ onSuccess }) => onSuccess(loadSupplierAddress),
  [LOAD_SUPPLIER_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadSupplierResponse),
  [CALCULATE_BILL_ITEM_CHANGE]: ({ onSuccess }) => onSuccess(calculatedLineTotalsResponse),
  [LOAD_ITEM_DETAIL_FOR_LINE]: ({ onSuccess }) => onSuccess(updatedLineForItemDetail),
  [EXPORT_BILL_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_ITEM_OPTION]: ({ onSuccess }) => onSuccess(loadItemOption),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [PREFILL_BILL_FROM_IN_TRAY]: ({ onSuccess }) => onSuccess(prefillBillFromInTray),
  [DOWNLOAD_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [UNLINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [LINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
};

export default MemoryBillDetailMapping;
