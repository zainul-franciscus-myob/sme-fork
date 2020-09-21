import {
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_STATEMENT_TEXT,
  UPDATE_BILL_PAYMENT,
  UPDATE_REFERENCE_ID,
} from '../BillPaymentIntents';
import billList from './data/billList';
import billPaymentEntry from './data/billPaymentEntry';
import billPaymentNewEntry from './data/billPaymentNewEntry';
import billPaymentReferenceId from './data/billPaymentReferenceId';
import successMessage from './data/success.json';
import supplierDetails from './data/supplierDetails.json';

const loadNewBillPayment = ({ onSuccess }) => onSuccess(billPaymentNewEntry);
const loadBillPayment = ({ onSuccess }) => onSuccess(billPaymentEntry);
const loadBillList = ({ onSuccess }) => onSuccess(billList);
const loadSupplierStatementText = ({ onSuccess }) => onSuccess(supplierDetails);
const updateReferenceId = ({ onSuccess }) => onSuccess(billPaymentReferenceId);
const createBillPayment = ({ onSuccess }) => onSuccess(successMessage);
const updateBillPayment = ({ onSuccess }) => onSuccess(successMessage);
const deleteBillPayment = ({ onSuccess }) => onSuccess(successMessage);

const MemoryBillPaymentMapping = {
  [LOAD_NEW_BILL_PAYMENT]: loadNewBillPayment,
  [LOAD_BILL_PAYMENT]: loadBillPayment,
  [LOAD_BILL_LIST]: loadBillList,
  [LOAD_SUPPLIER_STATEMENT_TEXT]: loadSupplierStatementText,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [CREATE_BILL_PAYMENT]: createBillPayment,
  [UPDATE_BILL_PAYMENT]: updateBillPayment,
  [DELETE_BILL_PAYMENT]: deleteBillPayment,
};

export default MemoryBillPaymentMapping;
