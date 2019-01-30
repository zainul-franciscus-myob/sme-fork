import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  UPDATE_RECEIVE_MONEY,
} from '../../receiveMoney/ReceiveMoneyIntents';
import receiveMoneyCalculatedTotals from '../data/receiveMoney/receiveMoneyDetailTotalsResponse';
import receiveMoneyDetailEntry from '../data/receiveMoney/receiveMoneyDetailEntry';
import receiveMoneyDetailNewEntry from '../data/receiveMoney/receiveMoneyDetailNewEntry';
import successResponse from '../data/success';

const loadReceiveMoneyDetail = ({ onSuccess }) => onSuccess(receiveMoneyDetailEntry);
const loadNewReceiveMoney = ({ onSuccess }) => onSuccess(receiveMoneyDetailNewEntry);
const deleteReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const saveReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const updateReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const getCalculatedTotals = ({ onSuccess }) => onSuccess(receiveMoneyCalculatedTotals);

const ReceiveMoneyMapping = {
  [LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [DELETE_RECEIVE_MONEY]: deleteReceiveMoney,
  [CREATE_RECEIVE_MONEY]: saveReceiveMoney,
  [UPDATE_RECEIVE_MONEY]: updateReceiveMoney,
  [GET_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default ReceiveMoneyMapping;
