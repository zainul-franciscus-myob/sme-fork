import {
  CREATE_TRANSFER_MONEY,
  DELETE_TRANSFER_MONEY,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
} from '../../transferMoney/TransferMoneyIntents';
import successResponse from '../data/success';
import transferMoneyDetailEntry from '../data/transferMoney/transferMoneyDetailEntry';
import transferMoneyDetailNewEntry from '../data/transferMoney/transferMoneyDetailNewEntry';

const loadNewTransferMoney = ({ onSuccess }) => onSuccess(transferMoneyDetailNewEntry);
const createTransferMoney = ({ onSuccess }) => onSuccess(successResponse);
const loadTransferMoneyDetail = ({ onSuccess }) => onSuccess(transferMoneyDetailEntry);
const deleteTransferMoney = ({ onSuccess }) => onSuccess(successResponse);

const ReceiveMoneyMapping = {
  [LOAD_NEW_TRANSFER_MONEY]: loadNewTransferMoney,
  [CREATE_TRANSFER_MONEY]: createTransferMoney,
  [LOAD_TRANSFER_MONEY_DETAIL]: loadTransferMoneyDetail,
  [DELETE_TRANSFER_MONEY]: deleteTransferMoney,
};

export default ReceiveMoneyMapping;
