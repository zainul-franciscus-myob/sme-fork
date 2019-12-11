import {
  LOAD_SUPPLIER_RETURN_LIST,
  LOAD_SUPPLIER_RETURN_LIST_NEXT_PAGE,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
} from '../../supplierReturn/SupplierReturnIntents';
import filterSupplierReturnListResponse from '../data/supplierReturn/filterSupplierReturnList';
import loadSupplierReturnListNextPageResponse from '../data/supplierReturn/loadSupplierReturnListNextPage';
import loadSupplierReturnListResponse from '../data/supplierReturn/loadSupplierReturnList';

const loadSupplierReturnList = ({ onSuccess }) => onSuccess(loadSupplierReturnListResponse);

const sortAndFilterSupplierReturnList = ({ onSuccess }) => onSuccess(
  filterSupplierReturnListResponse,
);

const loadSupplierReturnListNextPage = ({ onSuccess }) => onSuccess(
  loadSupplierReturnListNextPageResponse,
);

const SupplierReturnMapping = {
  [LOAD_SUPPLIER_RETURN_LIST]: loadSupplierReturnList,
  [SORT_AND_FILTER_SUPPLIER_RETURN_LIST]: sortAndFilterSupplierReturnList,
  [LOAD_SUPPLIER_RETURN_LIST_NEXT_PAGE]: loadSupplierReturnListNextPage,
};

export default SupplierReturnMapping;
