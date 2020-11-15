import {
  LOAD_PURCHASE_ORDER_LIST,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST,
} from '../../PurchaseOrderIntents';
import filterPurchaseOrderList from './data/filterPurchaseOrderList';
import loadPurchaseOrderList from './data/loadPurchaseOrderList.json';
import loadPurchaseOrderListNextPage from './data/loadPurchaseOrderListNextPage.json';

const MemoryPurchaseOrderMapping = {
  [LOAD_PURCHASE_ORDER_LIST]: ({ onSuccess }) =>
    onSuccess(loadPurchaseOrderList),
  [SORT_AND_FILTER_PURCHASE_ORDER_LIST]: ({ onSuccess }) =>
    onSuccess(filterPurchaseOrderList),
  [LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE]: ({ onSuccess }) =>
    onSuccess(loadPurchaseOrderListNextPage),
};

export default MemoryPurchaseOrderMapping;
