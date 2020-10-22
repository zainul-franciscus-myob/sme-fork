import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_CONTACT_OPTIONS,
  LOAD_DUPLICATE_RECEIVE_MONEY,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  SEARCH_CONTACT,
  UPDATE_RECEIVE_MONEY,
} from '../ReceiveMoneyIntents';
import createReceiveMoneyResponse from './data/createReceiveMoney';
import duplicateReceiveMoneyEntry from './data/duplicateReceiveMoneyEntry';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedContactResponse from './data/loadAddedContactResponse';
import loadContactOptionsResponse from './data/loadContactOptionsResponse';
import loadContactSearchResponse from './data/loadContactSearchResponse';
import receiveMoneyDetailEntry from './data/receiveMoneyDetailEntry';
import receiveMoneyDetailNewEntry from './data/receiveMoneyDetailNewEntry';
import successResponse from './data/success';

const loadReceiveMoneyDetail = ({ onSuccess }) =>
  onSuccess(receiveMoneyDetailEntry);
const loadNewReceiveMoney = ({ onSuccess }) =>
  onSuccess(receiveMoneyDetailNewEntry);
const deleteReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const createReceiveMoney = ({ onSuccess }) =>
  onSuccess(createReceiveMoneyResponse);
const updateReceiveMoney = ({ onSuccess }) => onSuccess(successResponse);
const loadAccountAfterCreate = ({ onSuccess }) =>
  onSuccess(loadAddedAccountResponse);
const loadContactAfterCreate = ({ onSuccess }) =>
  onSuccess(loadAddedContactResponse);
const loadContactOptions = ({ onSuccess }) =>
  onSuccess(loadContactOptionsResponse);
const searchContact = ({ onSuccess }) => onSuccess(loadContactSearchResponse);
const loadDuplicateReceiveMoney = ({ onSuccess }) =>
  onSuccess(duplicateReceiveMoneyEntry);

const MemoryReceiveMoneyMapping = {
  [LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [DELETE_RECEIVE_MONEY]: deleteReceiveMoney,
  [CREATE_RECEIVE_MONEY]: createReceiveMoney,
  [UPDATE_RECEIVE_MONEY]: updateReceiveMoney,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [LOAD_CONTACT_AFTER_CREATE]: loadContactAfterCreate,
  [LOAD_CONTACT_OPTIONS]: loadContactOptions,
  [SEARCH_CONTACT]: searchContact,
  [LOAD_DUPLICATE_RECEIVE_MONEY]: loadDuplicateReceiveMoney,
};

export default MemoryReceiveMoneyMapping;
