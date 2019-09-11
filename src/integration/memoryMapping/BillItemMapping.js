import {
  CALCULATE_LINE,
  CREATE_BILL,
  LOAD_NEW_BILL_ITEM_DETAIL,
  REMOVE_LINE,
  UPDATE_BILL, UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
  UPDATE_TAX_INCLUSIVE,
} from '../../bill/billDetail/billItem/BillItemIntents';
import billItemChangeItem from '../data/bill/billItemChangeItem';
import billItemNewDetail from '../data/bill/billItemNewDetail.json';
import successResponse from '../data/success';

const loadNewItemBillDetail = ({ onSuccess }) => onSuccess(billItemNewDetail);
const changeLineItem = ({ onSuccess }) => onSuccess(billItemChangeItem);
const changeLineTaxCode = ({ onSuccess }) => onSuccess(billItemChangeItem);
const changeTaxInclusive = ({ onSuccess }) => onSuccess(billItemChangeItem);
const calculateLine = ({ onSuccess, content }) => onSuccess({
  bill: {
    lines: content.lines,
  },
  totals: {
    subTotal: '2000.00',
    totalTax: '200.05',
    totalAmount: '2200.05',
  },
});
const removeLine = ({ onSuccess }) => onSuccess(billItemChangeItem);
const createBill = ({ onSuccess }) => onSuccess(successResponse);
const updateBill = ({ onSuccess }) => onSuccess(successResponse);

const BillItemMapping = {
  [LOAD_NEW_BILL_ITEM_DETAIL]: loadNewItemBillDetail,
  [UPDATE_LINE_ITEM]: changeLineItem,
  [UPDATE_LINE_TAX_CODE]: changeLineTaxCode,
  [UPDATE_TAX_INCLUSIVE]: changeTaxInclusive,
  [CALCULATE_LINE]: calculateLine,
  [REMOVE_LINE]: removeLine,
  [CREATE_BILL]: createBill,
  [UPDATE_BILL]: updateBill,
};

export default BillItemMapping;
