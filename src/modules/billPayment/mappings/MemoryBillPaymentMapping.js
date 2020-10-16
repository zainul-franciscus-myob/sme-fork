import {
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  EXPORT_PDF,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_PAYMENT_INFO,
  SEND_EMAIL,
  UPDATE_BILL_PAYMENT,
  UPDATE_REFERENCE_ID,
} from '../BillPaymentIntents';
import billList from './data/billList';
import billPaymentEntry from './data/billPaymentEntry';
import billPaymentNewEntry from './data/billPaymentNewEntry';
import billPaymentReferenceId from './data/billPaymentReferenceId';
import successMessage from './data/success.json';
import supplierPaymentInfo from './data/supplierPaymentInfo.json';

const loadNewBillPayment = ({ onSuccess }) => onSuccess(billPaymentNewEntry);
const loadBillPayment = ({ onSuccess }) => onSuccess(billPaymentEntry);
const loadBillList = ({ onSuccess }) => onSuccess(billList);
const loadSupplierPaymentInfo = ({ onSuccess }) =>
  onSuccess(supplierPaymentInfo);
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
  [LOAD_BILL_LIST]: loadBillList,
  [LOAD_SUPPLIER_PAYMENT_INFO]: loadSupplierPaymentInfo,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [CREATE_BILL_PAYMENT]: createBillPayment,
  [UPDATE_BILL_PAYMENT]: updateBillPayment,
  [DELETE_BILL_PAYMENT]: deleteBillPayment,
  [SEND_EMAIL]: sendRemittanceAdviceEmail,
  [EXPORT_PDF]: exportRemittanceAdvicePdf,
};

export default MemoryBillPaymentMapping;
