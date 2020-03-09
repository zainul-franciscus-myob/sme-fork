import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  UPDATE_RECEIVE_MONEY,
} from '../ReceiveMoneyIntents';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedContactResponse from './data/loadAddedContactResponse';
import receiveMoneyDetailEntry from './data/receiveMoneyDetailEntry';
import receiveMoneyDetailNewEntry from './data/receiveMoneyDetailNewEntry';
import successResponse from './data/success.json';

const loadReceiveMoneyDetail = ({ onSuccess }) => onSuccess(receiveMoneyDetailEntry);
const loadNewReceiveMoney = ({ onSuccess }) => onSuccess(receiveMoneyDetailNewEntry);
const deleteReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const saveReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const updateReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const loadAccountAfterCreate = ({ onSuccess }) => onSuccess(loadAddedAccountResponse);
const loadContactAfterCreate = ({ onSuccess }) => onSuccess(loadAddedContactResponse);

const MemoryReceiveMoneyMapping = {
  [LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [DELETE_RECEIVE_MONEY]: deleteReceiveMoney,
  [CREATE_RECEIVE_MONEY]: saveReceiveMoney,
  [UPDATE_RECEIVE_MONEY]: updateReceiveMoney,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [LOAD_CONTACT_AFTER_CREATE]: loadContactAfterCreate,
};

export default MemoryReceiveMoneyMapping;
