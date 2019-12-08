import {
  LOAD_BILL_LIST,
  SORT_AND_FILTER_BILL_LIST,
} from '../../bill/BillIntents';
import { LOAD_BILL_LIST_NEXT_PAGE } from '../../bill/billDetail/BillIntents';
import filterBillList from '../data/bill/filterBillList';
import loadBillList from '../data/bill/loadBillList';
import loadBillListNextPage from '../data/bill/loadBillListNextPage.json';

const BillMapping = {
  [LOAD_BILL_LIST]: ({ onSuccess }) => onSuccess(loadBillList),
  [SORT_AND_FILTER_BILL_LIST]: ({ onSuccess }) => onSuccess(filterBillList),
  [LOAD_BILL_LIST_NEXT_PAGE]: ({ onSuccess }) => onSuccess(loadBillListNextPage),
};

export default BillMapping;
