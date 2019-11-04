import {
  CREATE_BILL,
  DELETE_BILL,
  EXPORT_BILL_PDF,
  ITEM_CALCULATE_REMOVE_LINE,
  ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE,
  ITEM_CALCULATE_UPDATE_LINE_AMOUNT,
  ITEM_CALCULATE_UPDATE_LINE_ITEM,
  ITEM_CALCULATE_UPDATE_LINE_TAX_CODE,
  LOAD_BILL,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_SUPPLIER_ADDRESS,
  PREFILL_NEW_BILL_FROM_IN_TRAY,
  SERVICE_CALCULATE,
  UPDATE_BILL,
} from '../../bill/billDetail/BillIntents';
import billItemCalculate from '../data/bill/billItemCalculate';
import loadItemBill from '../data/bill/loadItemBill';
import loadNewItemBill from '../data/bill/loadNewItemBill';
import loadSupplierAddress from '../data/bill/loadSupplierAddress';
import prefillNewBillFromInTray from '../data/bill/prefillNewBillFromInTray';
import serviceCalculate from '../data/bill/serviceCalculate';
import successResponse from '../data/success';

const BillDetailMapping = {
  [LOAD_BILL]: ({ onSuccess }) => onSuccess(loadItemBill),
  [LOAD_NEW_BILL]: ({ onSuccess }) => onSuccess(loadNewItemBill),
  [PREFILL_NEW_BILL_FROM_IN_TRAY]: ({ onSuccess }) => onSuccess(prefillNewBillFromInTray),
  [LOAD_NEW_DUPLICATE_BILL]: ({ onSuccess }) => onSuccess(loadItemBill),
  [DELETE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [CREATE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [UPDATE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [SERVICE_CALCULATE]: ({ onSuccess }) => onSuccess(serviceCalculate),
  [LOAD_SUPPLIER_ADDRESS]: ({ onSuccess }) => onSuccess(loadSupplierAddress),
  [ITEM_CALCULATE_REMOVE_LINE]: ({ onSuccess }) => onSuccess(billItemCalculate),
  [ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE]: ({ onSuccess }) => onSuccess(billItemCalculate),
  [ITEM_CALCULATE_UPDATE_LINE_AMOUNT]: ({ onSuccess }) => onSuccess(billItemCalculate),
  [ITEM_CALCULATE_UPDATE_LINE_ITEM]: ({ onSuccess }) => onSuccess(billItemCalculate),
  [ITEM_CALCULATE_UPDATE_LINE_TAX_CODE]: ({ onSuccess }) => onSuccess(billItemCalculate),
  [EXPORT_BILL_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
};

export default BillDetailMapping;
