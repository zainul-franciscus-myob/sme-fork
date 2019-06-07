import {
  CALCULATE_LINE,
  CREATE_BILL,
  DELETE_BILL,
  REMOVE_LINE,
  SET_ADDRESS,
  UPDATE_BILL, UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
  UPDATE_TAX_INCLUSIVE,
} from '../../bill/billItem/BillItemIntents';
import billItemChangeItem from '../data/bill/billItemChangeItem';
import billItemSupplierAddress from '../data/bill/billItemSupplierAddress';
import successResponse from '../data/success';

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
const deleteBill = ({ onSuccess }) => onSuccess(successResponse);
const setAddress = ({ onSuccess }) => onSuccess(billItemSupplierAddress);
const createBill = ({ onSuccess }) => onSuccess(successResponse);
const updateBill = ({ onSuccess }) => onSuccess(successResponse);

const BillItemMapping = {
  [UPDATE_LINE_ITEM]: changeLineItem,
  [UPDATE_LINE_TAX_CODE]: changeLineTaxCode,
  [UPDATE_TAX_INCLUSIVE]: changeTaxInclusive,
  [CALCULATE_LINE]: calculateLine,
  [REMOVE_LINE]: removeLine,
  [SET_ADDRESS]: setAddress,
  [CREATE_BILL]: createBill,
  [UPDATE_BILL]: updateBill,
  [DELETE_BILL]: deleteBill,
};

export default BillItemMapping;
