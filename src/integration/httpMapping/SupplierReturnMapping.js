import {
  LOAD_SUPPLIER_RETURN_LIST,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
} from '../../modules/supplierReturn/SupplierReturnIntents';

const SupplierReturnMapping = {
  [LOAD_SUPPLIER_RETURN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/supplierReturn/load_supplier_return_list`,
  },
  [SORT_AND_FILTER_SUPPLIER_RETURN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/supplierReturn/filter_supplier_return_list`,
  },
};

export default SupplierReturnMapping;
