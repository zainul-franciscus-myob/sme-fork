import {
  LOAD_BILL_DETAIL,
  LOAD_NEW_BILL_ITEM_DETAIL,
  LOAD_NEW_BILL_SERVICE_DETAIL,
} from '../../bill/BillIntents';
import billItemDetail from '../data/bill/billItemDetail.json';
import billItemNewDetail from '../data/bill/billItemNewDetail.json';
import billServiceDetail from '../data/bill/billServiceDetail.json';
import billServiceNewDetail from '../data/bill/billServiceNewDetail.json';

const loadNewItemBillDetail = ({ onSuccess }) => onSuccess(billItemNewDetail);
const loadNewServiceBillDetail = ({ onSuccess }) => onSuccess(billServiceNewDetail);
const loadBillDetail = ({ onSuccess, urlParams }) => (urlParams.billId === 'service'
  ? onSuccess(billServiceDetail)
  : onSuccess(billItemDetail));

const BillMapping = {
  [LOAD_NEW_BILL_ITEM_DETAIL]: loadNewItemBillDetail,
  [LOAD_NEW_BILL_SERVICE_DETAIL]: loadNewServiceBillDetail,
  [LOAD_BILL_DETAIL]: loadBillDetail,
};

export default BillMapping;
