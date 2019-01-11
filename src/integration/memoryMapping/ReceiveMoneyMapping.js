import ReceiveMoneyIntents from '../../receiveMoney/ReceiveMoneyIntents';
import receiveMoneyDetailEntry from '../data/receiveMoney/receiveMoneyDetailEntry';
import receiveMoneyFilterResponse from '../data/receiveMoneyList/filterReceiveMoneyEntries';
import receiveMoneyLoadResponse from '../data/receiveMoneyList/loadReceiveMoneyEntries';
import spendMoneyCalculatedTotals from '../data/spendMoney/spendMoneyDetailTotalsResponse';
import successResponse from '../data/success';

const loadReceiveMoneyDetail = ({ onSuccess }) => onSuccess(receiveMoneyDetailEntry);
const loadReceiveMoneyEntries = ({ onSuccess }) => onSuccess(receiveMoneyLoadResponse);
const sortReceiveMoneyEntries = ({ onSuccess }) => onSuccess(receiveMoneyFilterResponse);
const filterReceiveMoneyEntries = ({ onSuccess }) => onSuccess(receiveMoneyFilterResponse);
const deleteReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const newReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const saveReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const updateReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const getCalculatedTotals = ({ onSuccess }) => onSuccess(spendMoneyCalculatedTotals);

const ReceiveMoneyMapping = {
  [ReceiveMoneyIntents.LOAD_NEW_SPEND_MONEY]: newReceiveMoney,
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_ENTRIES]: loadReceiveMoneyEntries,
  [ReceiveMoneyIntents.SORT_RECEIVE_MONEY_ENTRIES]: sortReceiveMoneyEntries,
  [ReceiveMoneyIntents.FILTER_RECEIVE_MONEY_ENTRIES]: filterReceiveMoneyEntries,
  [ReceiveMoneyIntents.DELETE_RECEIVE_MONEY]: deleteReceiveMoney,
  [ReceiveMoneyIntents.CREATE_SPEND_MONEY]: saveReceiveMoney,
  [ReceiveMoneyIntents.UPDATE_SPEND_MONEY]: updateReceiveMoney,
  [ReceiveMoneyIntents.GET_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default ReceiveMoneyMapping;
