import {
  CREATE_BILL,
  DELETE_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  EXPORT_BILL_PDF,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_OPTION,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_SUPPLIER_AFTER_CREATE,
  LOAD_SUPPLIER_DETAIL,
  PREFILL_BILL_FROM_IN_TRAY,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL,
} from '../BillIntents';
import createBillResponse from './data/createBillResponse';
import loadAbnDetail from './data/loadAbnDetail';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedJobResponse from './data/loadAddedJobResponse';
import loadItemAndServiceBill from './data/loadItemAndServiceBill';
import loadItemAndServiceBillWithFreight from './data/loadItemAndServiceBillWithFreight';
import loadItemOption from './data/loadItemOption';
import loadNewBill from './data/loadNewBill';
import loadNewDuplicateItemAndServiceBill from './data/loadNewDuplicateItemAndServiceBill';
import loadReadOnlyItemAndServiceBill from './data/loadReadOnlyItemAndServiceBill';
import loadReadOnlyServiceBill from './data/loadReadOnlyServiceBill';
import loadServiceBill from './data/loadServiceBill';
import loadServiceBillWithFreight from './data/loadServiceBillWithFreight';
import loadSupplierDetail from './data/loadSupplierDetail';
import loadSupplierResponse from './data/loadSupplierAfterCreate.json';
import prefillBillFromInTray from './data/prefillBillFromSupplierFeed';
import successResponse from './data/success';
import updatedLineForItemDetail from './data/updatedLineForItemDetail';

const MemoryBillDetailMapping = {
  [LOAD_BILL]: ({ urlParams = {}, onSuccess }) => {
    switch (urlParams.billId) {
      case 'service-readonly-id':
        onSuccess(loadReadOnlyServiceBill);
        break;
      case 'service-freight-id':
        onSuccess(loadServiceBillWithFreight);
        break;
      case 'item-readonly-id':
        onSuccess(loadReadOnlyItemAndServiceBill);
        break;
      case 'item-freight-id':
        onSuccess(loadItemAndServiceBillWithFreight);
        break;
      case 'service-id':
        onSuccess(loadServiceBill);
        break;
      case 'item-id':
      default:
        onSuccess(loadItemAndServiceBill);
        break;
    }
  },
  [LOAD_NEW_BILL]: ({ onSuccess }) => onSuccess(loadNewBill),
  [LOAD_NEW_DUPLICATE_BILL]: ({ onSuccess }) => onSuccess(loadNewDuplicateItemAndServiceBill),
  [DELETE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [CREATE_BILL]: ({ onSuccess }) => onSuccess(createBillResponse),
  [UPDATE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_SUPPLIER_DETAIL]: ({ onSuccess }) => onSuccess(loadSupplierDetail),
  [LOAD_SUPPLIER_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadSupplierResponse),
  [LOAD_ITEM_DETAIL_FOR_LINE]: ({ onSuccess }) => onSuccess(updatedLineForItemDetail),
  [EXPORT_BILL_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_ITEM_OPTION]: ({ onSuccess }) => onSuccess(loadItemOption),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [LOAD_JOB_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedJobResponse),
  [PREFILL_BILL_FROM_IN_TRAY]: ({ onSuccess }) => onSuccess(prefillBillFromInTray),
  [DOWNLOAD_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [UNLINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [LINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_ABN_FROM_SUPPLIER]: ({ onSuccess }) => onSuccess(loadAbnDetail),
};

export default MemoryBillDetailMapping;
