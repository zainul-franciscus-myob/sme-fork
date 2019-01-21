import ReceiveMoneyIntents from '../../receiveMoney/ReceiveMoneyIntents';
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
  [ReceiveMoneyIntents.LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [ReceiveMoneyIntents.DELETE_RECEIVE_MONEY]: deleteReceiveMoney,
  [ReceiveMoneyIntents.CREATE_RECEIVE_MONEY]: saveReceiveMoney,
  [ReceiveMoneyIntents.UPDATE_RECEIVE_MONEY]: updateReceiveMoney,
  [ReceiveMoneyIntents.GET_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default ReceiveMoneyMapping;
