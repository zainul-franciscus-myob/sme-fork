import {
  CREATE_PURCHASE_RETURN,
  DELETE_PURCHASE_RETURN,
  LOAD_NEW_PURCHASE_RETURN,
  LOAD_PURCHASES,
  LOAD_PURCHASE_RETURN,
} from '../../supplierReturnPurchase/SupplierReturnPurchaseIntents';
import newSupplierReturnPurchase from '../data/supplierReturn/loadNewSupplierReturnPurchase.json';
import purchases from '../data/supplierReturn/loadPurchaseList.json';
import successResponse from '../data/success.json';
import supplierReturnPurchase from '../data/supplierReturn/loadSupplierReturnPurchase.json';

const loadNewSupplierReturnPurchase = ({ onSuccess }) => onSuccess(newSupplierReturnPurchase);
const loadSupplierReturnPurchase = ({ onSuccess }) => onSuccess(supplierReturnPurchase);
const loadPurchases = ({ onSuccess }) => onSuccess(purchases);
const createPurchaseReturn = ({ onSuccess }) => onSuccess(successResponse);
const deletePurchaseReturn = ({ onSuccess }) => onSuccess(successResponse);

const SupplierReturnPurchaseMapping = {
  [LOAD_NEW_PURCHASE_RETURN]: loadNewSupplierReturnPurchase,
  [LOAD_PURCHASE_RETURN]: loadSupplierReturnPurchase,
  [LOAD_PURCHASES]: loadPurchases,
  [CREATE_PURCHASE_RETURN]: createPurchaseReturn,
  [DELETE_PURCHASE_RETURN]: deletePurchaseReturn,
};

export default SupplierReturnPurchaseMapping;
