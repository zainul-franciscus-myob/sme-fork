import {
  CREATE_BILL_SERVICE_DETAIL,
  DELETE_BILL_DETAIL,
  GET_CALCULATED_BILL_DETAIL_TOTALS,
  LOAD_BILL_DETAIL,
  LOAD_BILL_LIST,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_NEW_BILL_ITEM_DETAIL,
  LOAD_NEW_BILL_SERVICE_DETAIL,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_BILL_SERVICE_DETAIL,
} from '../../bill/BillIntents';
import billItemDetail from '../data/bill/billItemDetail.json';
import billItemNewDetail from '../data/bill/billItemNewDetail.json';
import billServiceDetail from '../data/bill/billServiceDetail.json';
import billServiceNewDetail from '../data/bill/billServiceNewDetail.json';
import customerAddress from '../data/bill/contactAddress';
import filterBillList from '../data/bill/filterBillList';
import loadBillList from '../data/bill/loadBillList';
import successResponse from '../data/success';
import totalsResponse from '../data/bill/totalsResponse';

const loadNewItemBillDetail = ({ onSuccess }) => onSuccess(billItemNewDetail);
const loadNewBillServiceDetail = ({ onSuccess }) => onSuccess(billServiceNewDetail);
const loadBillDetail = ({ onSuccess, urlParams }) => (urlParams.billId === 'service'
  ? onSuccess(billServiceDetail)
  : onSuccess(billItemDetail));
const loadCustomerAddress = ({ onSuccess }) => onSuccess(customerAddress);
const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);
const createServiceBill = ({ onSuccess }) => onSuccess(successResponse);
const updateServiceBill = ({ onSuccess }) => onSuccess(successResponse);
const deleteServiceBill = ({ onSuccess }) => onSuccess(successResponse);
const loadBills = ({ onSuccess }) => onSuccess(loadBillList);
const filterBills = ({ onSuccess }) => onSuccess(filterBillList);

const BillMapping = {
  [LOAD_NEW_BILL_ITEM_DETAIL]: loadNewItemBillDetail,
  [LOAD_NEW_BILL_SERVICE_DETAIL]: loadNewBillServiceDetail,
  [LOAD_BILL_DETAIL]: loadBillDetail,
  [LOAD_CUSTOMER_ADDRESS]: loadCustomerAddress,
  [GET_CALCULATED_BILL_DETAIL_TOTALS]: getCalculatedTotals,
  [CREATE_BILL_SERVICE_DETAIL]: createServiceBill,
  [UPDATE_BILL_SERVICE_DETAIL]: updateServiceBill,
  [DELETE_BILL_DETAIL]: deleteServiceBill,
  [LOAD_BILL_LIST]: loadBills,
  [SORT_AND_FILTER_BILL_LIST]: filterBills,
};

export default BillMapping;
