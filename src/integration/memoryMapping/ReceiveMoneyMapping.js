import ReceiveMoneyIntents from '../../receiveMoney/ReceiveMoneyIntents';
import receiveMoneyDetailEntry from '../data/receiveMoney/receiveMoneyDetailEntry';
import receiveMoneyFilterResponse from '../data/receiveMoneyList/filterReceiveMoneyEntries';
import receiveMoneyLoadResponse from '../data/receiveMoneyList/loadReceiveMoneyEntries';


const loadReceiveMoneyDetail = ({ onSuccess }) => onSuccess(receiveMoneyDetailEntry);
const loadReceiveMoneyEntries = ({ onSuccess }) => onSuccess(receiveMoneyLoadResponse);
const sortReceiveMoneyEntries = ({ onSuccess }) => onSuccess(receiveMoneyFilterResponse);
const filterReceiveMoneyEntries = ({ onSuccess }) => onSuccess(receiveMoneyFilterResponse);


const ReceiveMoneyMapping = {
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_ENTRIES]: loadReceiveMoneyEntries,
  [ReceiveMoneyIntents.SORT_RECEIVE_MONEY_ENTRIES]: sortReceiveMoneyEntries,
  [ReceiveMoneyIntents.FILTER_RECEIVE_MONEY_ENTRIES]: filterReceiveMoneyEntries,
};

export default ReceiveMoneyMapping;
