import {
  CREATE_APPLY_TO_SALE,
  DELETE_APPLY_TO_SALE,
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
} from '../../applyToSale/ApplyToSaleIntents';

const ApplyToSaleMapping = {
  [LOAD_NEW_APPLY_TO_SALE]: {
    method: 'GET',
    getPath: ({ businessId, customerReturnId }) => (
      `/${businessId}/applyToSale/load_new_apply_to_sale/${customerReturnId}`
    ),
  },
  [LOAD_APPLY_TO_SALE]: {
    method: 'GET',
    getPath: ({ businessId, applyToSaleId }) => (
      `/${businessId}/applyToSale/load_apply_to_sale/${applyToSaleId}`
    ),
  },
  [CREATE_APPLY_TO_SALE]: {
    method: 'POST',
    getPath: ({ businessId }) => (
      `/${businessId}/applyToSale/create_apply_to_sale`
    ),
  },
  [DELETE_APPLY_TO_SALE]: {
    method: 'DELETE',
    getPath: ({ businessId, applyToSaleId }) => (
      `/${businessId}/applyToSale/delete_apply_to_sale/${applyToSaleId}`
    ),
  },
};

export default ApplyToSaleMapping;
