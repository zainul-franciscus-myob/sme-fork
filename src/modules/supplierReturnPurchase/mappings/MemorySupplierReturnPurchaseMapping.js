import {
  CREATE_PURCHASE_RETURN,
  DELETE_PURCHASE_RETURN,
  LOAD_NEW_PURCHASE_RETURN,
  LOAD_PURCHASE_RETURN,
} from '../SupplierReturnPurchaseIntents';
import newSupplierReturnPurchase from './data/loadNewSupplierReturnPurchase.json';
import successResponse from './data/success.json';
import supplierReturnPurchase from './data/loadSupplierReturnPurchase.json';

const loadNewSupplierReturnPurchase = ({ onSuccess }) => onSuccess(newSupplierReturnPurchase);
const loadSupplierReturnPurchase = ({ onSuccess }) => onSuccess(supplierReturnPurchase);
const createPurchaseReturn = ({ onSuccess }) => onSuccess(successResponse);
const deletePurchaseReturn = ({ onSuccess }) => onSuccess(successResponse);

const MemorySupplierReturnPurchaseMapping = {
  [LOAD_NEW_PURCHASE_RETURN]: loadNewSupplierReturnPurchase,
  [LOAD_PURCHASE_RETURN]: loadSupplierReturnPurchase,
  [CREATE_PURCHASE_RETURN]: createPurchaseReturn,
  [DELETE_PURCHASE_RETURN]: deletePurchaseReturn,
};

export default MemorySupplierReturnPurchaseMapping;
