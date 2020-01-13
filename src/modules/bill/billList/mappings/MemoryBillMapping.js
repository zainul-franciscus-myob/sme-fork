import {
  LOAD_BILL_LIST,
  LOAD_BILL_LIST_NEXT_PAGE,
  SORT_AND_FILTER_BILL_LIST,
} from '../../BillIntents';
import filterBillList from './data/filterBillList';
import loadBillList from './data/loadBillList';
import loadBillListNextPage from './data/loadBillListNextPage.json';

const MemoryBillMapping = {
  [LOAD_BILL_LIST]: ({ onSuccess }) => onSuccess(loadBillList),
  [SORT_AND_FILTER_BILL_LIST]: ({ onSuccess }) => onSuccess(filterBillList),
  [LOAD_BILL_LIST_NEXT_PAGE]: ({ onSuccess }) => onSuccess(loadBillListNextPage),
};

export default MemoryBillMapping;
