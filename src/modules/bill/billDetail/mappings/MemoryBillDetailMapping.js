import {
  CREATE_BILL,
  CREATE_BILL_PAYMENT,
  CREATE_PRE_CONVERSION_BILL_DETAIL,
  CREATE_SUPPLIER_PAYMENT,
  DELETE_BILL,
  DELETE_PRE_CONVERSION_BILL_DETAIL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  EXPORT_BILL_PDF,
  GET_REFERENCE_ID,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_NEW_BILL,
  LOAD_NEW_BILL_DETAIL_FROM_ORDER,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_PREFILL_FROM_RECURRING_BILL,
  LOAD_SUPPLIER_DETAIL,
  PREFILL_BILL_FROM_IN_TRAY,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL,
  UPDATE_PRE_CONVERSION_BILL_DETAIL,
} from '../BillIntents';
import billPaymentReferenceId from './data/billPaymentReferenceId.json';
import createBillResponse from './data/createBillResponse';
import loadAbnDetail from './data/loadAbnDetail';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadItemAndServiceBill from './data/loadItemAndServiceBill';
import loadItemAndServiceBillWithFreight from './data/loadItemAndServiceBillWithFreight';
import loadNewBill from './data/loadNewBill';
import loadNewBillPaymentWithSupplier from './data/loadNewBillPaymentWithSupplier.json';
import loadNewDuplicateItemAndServiceBill from './data/loadNewDuplicateItemAndServiceBill';
import loadPreConversionBill from './data/loadPreConversionBill';
import loadPrefillFromRecurringBillResponse from './data/loadPrefillFromRecurringBillResponse';
import loadReadOnlyItemAndServiceBill from './data/loadReadOnlyItemAndServiceBill';
import loadReadOnlyMiscellaneousBill from './data/loadReadOnlyMiscellaneousBill';
import loadReadOnlyProfessionalBill from './data/loadReadOnlyProfessionalBill';
import loadReadOnlyServiceBill from './data/loadReadOnlyServiceBill';
import loadServiceBill from './data/loadServiceBill';
import loadServiceBillWithFreight from './data/loadServiceBillWithFreight';
import loadSupplierDetail from './data/loadSupplierDetail';
import prefillBillFromInTray from './data/prefillBillFromNonSupplierFeed';
import successResponse from './data/success';
import updatedLineForItemDetail from './data/updatedLineForItemDetail';

const MemoryBillDetailMapping = {
  [LOAD_BILL]: ({ urlParams = {}, onSuccess }) => {
    switch (urlParams.billId) {
      case 'miscellaneous-readonly-id':
        onSuccess(loadReadOnlyMiscellaneousBill);
        break;
      case 'professional-readonly-id':
        onSuccess(loadReadOnlyProfessionalBill);
        break;
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
      case 'preconversion-id':
        onSuccess(loadPreConversionBill);
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
  [LOAD_NEW_DUPLICATE_BILL]: ({ onSuccess }) =>
    onSuccess(loadNewDuplicateItemAndServiceBill),
  [DELETE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [CREATE_BILL]: ({ onSuccess }) => onSuccess(createBillResponse),
  [UPDATE_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_SUPPLIER_DETAIL]: ({ onSuccess }) => onSuccess(loadSupplierDetail),
  [LOAD_ITEM_DETAIL_FOR_LINE]: ({ onSuccess }) =>
    onSuccess(updatedLineForItemDetail),
  [EXPORT_BILL_PDF]: ({ onSuccess }) =>
    onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) =>
    onSuccess(loadAddedAccountResponse),
  [PREFILL_BILL_FROM_IN_TRAY]: ({ onSuccess }) =>
    onSuccess(prefillBillFromInTray),
  [DOWNLOAD_IN_TRAY_DOCUMENT]: ({ onSuccess }) =>
    onSuccess(new Blob([], { type: 'application/pdf' })),
  [UNLINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [LINK_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_ABN_FROM_SUPPLIER]: ({ onSuccess }) => onSuccess(loadAbnDetail),
  [CREATE_PRE_CONVERSION_BILL_DETAIL]: ({ onSuccess }) =>
    onSuccess({ ...createBillResponse, id: 'preconversion-id' }),
  [UPDATE_PRE_CONVERSION_BILL_DETAIL]: ({ onSuccess }) =>
    onSuccess(successResponse),
  [DELETE_PRE_CONVERSION_BILL_DETAIL]: ({ onSuccess }) =>
    onSuccess(successResponse),
  [LOAD_NEW_BILL_PAYMENT]: ({ onSuccess }) =>
    onSuccess(loadNewBillPaymentWithSupplier),
  [CREATE_BILL_PAYMENT]: ({ onSuccess }) =>
    onSuccess({ ...successResponse, id: 1 }),
  [CREATE_SUPPLIER_PAYMENT]: ({ onSuccess }) =>
    onSuccess({ ...successResponse, id: 1 }),
  [GET_REFERENCE_ID]: ({ onSuccess }) => onSuccess(billPaymentReferenceId),
  [LOAD_NEW_BILL_DETAIL_FROM_ORDER]: ({ onSuccess }) =>
    onSuccess(loadItemAndServiceBill),
  [LOAD_PREFILL_FROM_RECURRING_BILL]: ({ onSuccess }) =>
    onSuccess(loadPrefillFromRecurringBillResponse),
};

export default MemoryBillDetailMapping;
