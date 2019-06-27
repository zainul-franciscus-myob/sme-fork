import {
  CREATE_PURCHASE_RETURN,
  DELETE_PURCHASE_RETURN,
  LOAD_NEW_PURCHASE_RETURN,
  LOAD_PURCHASES,
  LOAD_PURCHASE_RETURN,
} from '../../supplierReturnPurchase/SupplierReturnPurchaseIntents';

const SupplierReturnPurchaseMapping = {
  [LOAD_NEW_PURCHASE_RETURN]: {
    method: 'GET',
    getPath: ({ businessId, supplierReturnId }) => `/${businessId}/settlePurchaseReturn/load_new_settle_purchase_return/${supplierReturnId}`,
  },
  [LOAD_PURCHASE_RETURN]: {
    method: 'GET',
    getPath: ({ businessId, purchaseReturnId }) => `/${businessId}/settlePurchaseReturn/load_settle_purchase_return/${purchaseReturnId}`,
  },
  [LOAD_PURCHASES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/settlePurchaseReturn/load_purchases_list`,
  },
  [CREATE_PURCHASE_RETURN]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/settlePurchaseReturn/save_settle_purchase_return`,
  },
  [DELETE_PURCHASE_RETURN]: {
    method: 'DELETE',
    getPath: ({ businessId, purchaseReturnId }) => `/${businessId}/settlePurchaseReturn/delete_settle_purchase_return/${purchaseReturnId}`,
  },
};

export default SupplierReturnPurchaseMapping;
