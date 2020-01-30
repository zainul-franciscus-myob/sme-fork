import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  UPDATE_RECEIVE_MONEY,
} from '../ReceiveMoneyIntents';
import receiveMoneyDetailEntry from './data/receiveMoneyDetailEntry';
import receiveMoneyDetailNewEntry from './data/receiveMoneyDetailNewEntry';
import successResponse from './data/success.json';

const loadReceiveMoneyDetail = ({ onSuccess }) => onSuccess(receiveMoneyDetailEntry);
const loadNewReceiveMoney = ({ onSuccess }) => onSuccess(receiveMoneyDetailNewEntry);
const deleteReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const saveReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const updateReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);

const MemoryReceiveMoneyMapping = {
  [LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [DELETE_RECEIVE_MONEY]: deleteReceiveMoney,
  [CREATE_RECEIVE_MONEY]: saveReceiveMoney,
  [UPDATE_RECEIVE_MONEY]: updateReceiveMoney,
};

export default MemoryReceiveMoneyMapping;
