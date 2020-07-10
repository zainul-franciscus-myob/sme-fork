import {
  CREATE_TRANSFER_MONEY,
  DELETE_TRANSFER_MONEY,
  LOAD_NEW_DUPLICATE_TRANSFER_MONEY,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
} from '../TransferMoneyIntents';
import successResponse from './data/success.json';
import transferMoneyDetailEntry from './data/transferMoneyDetailEntry';
import transferMoneyDetailNewDuplicateEntry from './data/transferMoneyDetailNewDuplicateEntry';
import transferMoneyDetailNewEntry from './data/transferMoneyDetailNewEntry';

const loadNewTransferMoney = ({ onSuccess }) =>
  onSuccess(transferMoneyDetailNewEntry);
const loadNewDuplicateTransferMoney = ({ onSuccess }) =>
  onSuccess(transferMoneyDetailNewDuplicateEntry);
const createTransferMoney = ({ onSuccess }) => onSuccess(successResponse);
const loadTransferMoneyDetail = ({ onSuccess }) =>
  onSuccess(transferMoneyDetailEntry);
const deleteTransferMoney = ({ onSuccess }) => onSuccess(successResponse);

const MemoryTransferMoneyMapping = {
  [LOAD_NEW_TRANSFER_MONEY]: loadNewTransferMoney,
  [CREATE_TRANSFER_MONEY]: createTransferMoney,
  [LOAD_TRANSFER_MONEY_DETAIL]: loadTransferMoneyDetail,
  [LOAD_NEW_DUPLICATE_TRANSFER_MONEY]: loadNewDuplicateTransferMoney,
  [DELETE_TRANSFER_MONEY]: deleteTransferMoney,
};

export default MemoryTransferMoneyMapping;
