import ReceiveMoneyIntents from '../../receiveMoney/ReceiveMoneyIntents';
import receiveMoneyDetailEntry from '../data/receiveMoney/receiveMoneyDetailEntry';

const loadReceiveMoneyDetail = ({ onSuccess }) => onSuccess(receiveMoneyDetailEntry);

const ReceiveMoneyMapping = {
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
};

export default ReceiveMoneyMapping;
