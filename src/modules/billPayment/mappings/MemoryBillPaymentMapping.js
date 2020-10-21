import {
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  EXPORT_PDF,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_DETAILS,
  SEND_EMAIL,
  UPDATE_BILL_PAYMENT,
  UPDATE_REFERENCE_ID,
} from '../BillPaymentIntents';
import billList from './data/billList.json';
import billPaymentEntry from './data/billPaymentEntry';
import billPaymentNewEntry from './data/billPaymentNewEntry';
import billPaymentNewEntryWithSupplier from './data/billPaymentNewEntryWithSupplier';
import billPaymentReferenceId from './data/billPaymentReferenceId';
import successMessage from './data/success.json';
import supplierDetails from './data/supplierDetails.json';

const loadBillPayment = ({ onSuccess }) => onSuccess(billPaymentEntry);
const loadNewBillPayment = ({ onSuccess, params }) =>
  onSuccess(
    params?.supplierId ? billPaymentNewEntryWithSupplier : billPaymentNewEntry
  );
const loadSupplierDetails = ({ onSuccess }) => onSuccess(supplierDetails);
const loadBillList = ({ onSuccess }) => onSuccess(billList);
const updateReferenceId = ({ onSuccess }) => onSuccess(billPaymentReferenceId);
const createBillPayment = ({ onSuccess }) => onSuccess(successMessage);
const updateBillPayment = ({ onSuccess }) => onSuccess(successMessage);
const deleteBillPayment = ({ onSuccess }) => onSuccess(successMessage);
const sendRemittanceAdviceEmail = ({ onSuccess }) => onSuccess(successMessage);
const exportRemittanceAdvicePdf = ({ onSuccess }) =>
  onSuccess(new Blob([], { type: 'application/pdf' }));

const MemoryBillPaymentMapping = {
  [LOAD_NEW_BILL_PAYMENT]: loadNewBillPayment,
  [LOAD_BILL_PAYMENT]: loadBillPayment,
  [LOAD_SUPPLIER_DETAILS]: loadSupplierDetails,
  [LOAD_BILL_LIST]: loadBillList,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [CREATE_BILL_PAYMENT]: createBillPayment,
  [UPDATE_BILL_PAYMENT]: updateBillPayment,
  [DELETE_BILL_PAYMENT]: deleteBillPayment,
  [SEND_EMAIL]: sendRemittanceAdviceEmail,
  [EXPORT_PDF]: exportRemittanceAdvicePdf,
};

export default MemoryBillPaymentMapping;
