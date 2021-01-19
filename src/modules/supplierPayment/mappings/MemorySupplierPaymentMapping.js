import {
  CREATE_SUPPLIER_PAYMENT,
  DELETE_SUPPLIER_PAYMENT,
  EXPORT_PDF,
  LOAD_NEW_SUPPLIER_PAYMENT,
  LOAD_PURCHASE_LIST,
  LOAD_SUPPLIER_PAYMENT,
  LOAD_SUPPLIER_PURCHASE_LIST,
  SEND_EMAIL,
  UPDATE_REFERENCE_ID,
  UPDATE_SUPPLIER_PAYMENT,
} from '../SupplierPaymentIntents';
import purchaseList from './data/purchaseList.json';
import successMessage from './data/success.json';
import supplierDetails from './data/supplierDetails.json';
import supplierPaymentEntry from './data/supplierPaymentEntry';
import supplierPaymentNewEntry from './data/supplierPaymentNewEntry';
import supplierPaymentNewEntryWithSupplier from './data/supplierPaymentNewEntryWithSupplier';
import supplierPaymentReferenceId from './data/supplierPaymentReferenceId';

const loadSupplierPayment = ({ onSuccess }) => onSuccess(supplierPaymentEntry);
const loadNewSupplierPayment = ({ onSuccess, params }) =>
  onSuccess(
    params?.supplierId
      ? supplierPaymentNewEntryWithSupplier
      : supplierPaymentNewEntry
  );
const loadSupplierDetails = ({ onSuccess }) => onSuccess(supplierDetails);
const loadPurchaseList = ({ onSuccess }) => onSuccess(purchaseList);
const updateReferenceId = ({ onSuccess }) =>
  onSuccess(supplierPaymentReferenceId);
const createSupplierPayment = ({ onSuccess }) => onSuccess(successMessage);
const updateSupplierPayment = ({ onSuccess }) => onSuccess(successMessage);
const deleteSupplierPayment = ({ onSuccess }) => onSuccess(successMessage);
const sendRemittanceAdviceEmail = ({ onSuccess }) => onSuccess(successMessage);
const exportRemittanceAdvicePdf = ({ onSuccess }) =>
  onSuccess(new Blob([], { type: 'application/pdf' }));

const MemorySupplierPaymentMapping = {
  [LOAD_NEW_SUPPLIER_PAYMENT]: loadNewSupplierPayment,
  [LOAD_SUPPLIER_PAYMENT]: loadSupplierPayment,
  [LOAD_SUPPLIER_PURCHASE_LIST]: loadSupplierDetails,
  [LOAD_PURCHASE_LIST]: loadPurchaseList,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [CREATE_SUPPLIER_PAYMENT]: createSupplierPayment,
  [UPDATE_SUPPLIER_PAYMENT]: updateSupplierPayment,
  [DELETE_SUPPLIER_PAYMENT]: deleteSupplierPayment,
  [SEND_EMAIL]: sendRemittanceAdviceEmail,
  [EXPORT_PDF]: exportRemittanceAdvicePdf,
};

export default MemorySupplierPaymentMapping;
