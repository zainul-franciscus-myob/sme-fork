import {
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  UPDATE_BILL_PAYMENT,
  UPDATE_REFERENCE_ID,
} from '../../modules/billPayment/BillPaymentIntents';
import billList from '../data/billPayment/billList.json';
import billPaymentEntry from '../data/billPayment/billPaymentEntry.json';
import billPaymentNewEntry from '../data/billPayment/billPaymentNewEntry.json';
import billPaymentReferenceId from '../data/billPayment/billPaymentReferenceId.json';
import successMessage from '../data/success.json';

const loadNewBillPayment = ({ onSuccess }) => onSuccess(billPaymentNewEntry);
const loadBillPayment = ({ onSuccess }) => onSuccess(billPaymentEntry);
const loadBillList = ({ onSuccess }) => onSuccess(billList);
const updateReferenceId = ({ onSuccess }) => onSuccess(billPaymentReferenceId);
const createBillPayment = ({ onSuccess }) => onSuccess(successMessage);
const updateBillPayment = ({ onSuccess }) => onSuccess(successMessage);
const deleteBillPayment = ({ onSuccess }) => onSuccess(successMessage);

const BillPaymentMapping = {
  [LOAD_NEW_BILL_PAYMENT]: loadNewBillPayment,
  [LOAD_BILL_PAYMENT]: loadBillPayment,
  [LOAD_BILL_LIST]: loadBillList,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [CREATE_BILL_PAYMENT]: createBillPayment,
  [UPDATE_BILL_PAYMENT]: updateBillPayment,
  [DELETE_BILL_PAYMENT]: deleteBillPayment,
};

export default BillPaymentMapping;
