import {
  DELETE_BILL_DETAIL,
  LOAD_BILL_DETAIL,
  LOAD_BILL_LIST,
  LOAD_DEFAULT_BILL_LAYOUT,
  LOAD_SUPPLIER_ADDRESS,
  SORT_AND_FILTER_BILL_LIST,
} from '../../bill/BillIntents';
import billAddress from '../data/bill/contactAddress';
import billItemDetail from '../data/bill/billItemDetail.json';
import billServiceDetail from '../data/bill/billServiceDetail.json';
import defaultBillLayout from '../data/bill/defaultBillLayout';
import filterBillList from '../data/bill/filterBillList';
import loadBillList from '../data/bill/loadBillList';
import successResponse from '../data/success';

const loadBillDetail = ({ onSuccess, urlParams }) => (urlParams.billId === 'service'
  ? onSuccess(billServiceDetail)
  : onSuccess(billItemDetail));
const loadBills = ({ onSuccess }) => onSuccess(loadBillList);
const loadDefaultBillLayout = ({ onSuccess }) => onSuccess(defaultBillLayout);
const filterBills = ({ onSuccess }) => onSuccess(filterBillList);
const deleteServiceBill = ({ onSuccess }) => onSuccess(successResponse);
const setAddress = ({ onSuccess }) => onSuccess(billAddress);

const BillMapping = {
  [LOAD_BILL_DETAIL]: loadBillDetail,
  [LOAD_BILL_LIST]: loadBills,
  [LOAD_DEFAULT_BILL_LAYOUT]: loadDefaultBillLayout,
  [SORT_AND_FILTER_BILL_LIST]: filterBills,
  [DELETE_BILL_DETAIL]: deleteServiceBill,
  [LOAD_SUPPLIER_ADDRESS]: setAddress,
};

export default BillMapping;
