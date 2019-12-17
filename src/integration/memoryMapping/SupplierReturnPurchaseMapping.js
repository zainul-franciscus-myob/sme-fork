import {
  CREATE_PURCHASE_RETURN,
  DELETE_PURCHASE_RETURN,
  LOAD_NEW_PURCHASE_RETURN,
  LOAD_PURCHASE_RETURN,
} from '../../modules/supplierReturnPurchase/SupplierReturnPurchaseIntents';
import newSupplierReturnPurchase from '../data/supplierReturn/loadNewSupplierReturnPurchase.json';
import successResponse from '../data/success.json';
import supplierReturnPurchase from '../data/supplierReturn/loadSupplierReturnPurchase.json';

const loadNewSupplierReturnPurchase = ({ onSuccess }) => onSuccess(newSupplierReturnPurchase);
const loadSupplierReturnPurchase = ({ onSuccess }) => onSuccess(supplierReturnPurchase);
const createPurchaseReturn = ({ onSuccess }) => onSuccess(successResponse);
const deletePurchaseReturn = ({ onSuccess }) => onSuccess(successResponse);

const SupplierReturnPurchaseMapping = {
  [LOAD_NEW_PURCHASE_RETURN]: loadNewSupplierReturnPurchase,
  [LOAD_PURCHASE_RETURN]: loadSupplierReturnPurchase,
  [CREATE_PURCHASE_RETURN]: createPurchaseReturn,
  [DELETE_PURCHASE_RETURN]: deletePurchaseReturn,
};

export default SupplierReturnPurchaseMapping;
