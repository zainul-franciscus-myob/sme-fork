import {
  LOAD_SUPPLIER_RETURN_LIST,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
} from '../SupplierReturnIntents';
import filterSupplierReturnListResponse from './data/filterSupplierReturnList';
import loadSupplierReturnListResponse from './data/loadSupplierReturnList';

const loadSupplierReturnList = ({ onSuccess }) =>
  onSuccess(loadSupplierReturnListResponse);

const sortAndFilterSupplierReturnList = ({ onSuccess }) =>
  onSuccess(filterSupplierReturnListResponse);

const MemorySupplierReturnMapping = {
  [LOAD_SUPPLIER_RETURN_LIST]: loadSupplierReturnList,
  [SORT_AND_FILTER_SUPPLIER_RETURN_LIST]: sortAndFilterSupplierReturnList,
};

export default MemorySupplierReturnMapping;
