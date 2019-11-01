import {
  LOAD_BILL_LIST,
  SORT_AND_FILTER_BILL_LIST,
} from '../../bill/BillIntents';
import filterBillList from '../data/bill/filterBillList';
import loadBillList from '../data/bill/loadBillList';

const BillMapping = {
  [LOAD_BILL_LIST]: ({ onSuccess }) => onSuccess(loadBillList),
  [SORT_AND_FILTER_BILL_LIST]: ({ onSuccess }) => onSuccess(filterBillList),
};

export default BillMapping;
