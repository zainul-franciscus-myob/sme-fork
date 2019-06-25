import {
  LOAD_SUPPLIER_RETURN_LIST,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
} from '../../supplierReturn/SupplierReturnIntents';
import filterSupplierReturnListResponse from '../data/supplierReturn/filterSupplierReturnList';
import loadSupplierReturnListResponse from '../data/supplierReturn/loadSupplierReturnList';

const loadSupplierReturnList = ({ onSuccess }) => { onSuccess(loadSupplierReturnListResponse); };

const sortAndFilterSupplierReturnList = ({ onSuccess }) => {
  onSuccess(filterSupplierReturnListResponse);
};

const SupplierReturnMapping = {
  [LOAD_SUPPLIER_RETURN_LIST]: loadSupplierReturnList,
  [SORT_AND_FILTER_SUPPLIER_RETURN_LIST]: sortAndFilterSupplierReturnList,
};

export default SupplierReturnMapping;
