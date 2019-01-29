import TransferMoneyIntents from '../../transferMoney/TransferMoneyIntents';
import successResponse from '../data/success';
import transferMoneyDetailEntry from '../data/transferMoney/transferMoneyDetailEntry';
import transferMoneyDetailNewEntry from '../data/transferMoney/transferMoneyDetailNewEntry';

const loadNewTransferMoney = ({ onSuccess }) => onSuccess(transferMoneyDetailNewEntry);
const createTransferMoney = ({ onSuccess }) => onSuccess(successResponse);
const loadTransferMoneyDetail = ({ onSuccess }) => onSuccess(transferMoneyDetailEntry);
const deleteTransferMoney = ({ onSuccess }) => onSuccess(successResponse);

const ReceiveMoneyMapping = {
  [TransferMoneyIntents.LOAD_NEW_TRANSFER_MONEY]: loadNewTransferMoney,
  [TransferMoneyIntents.CREATE_TRANSFER_MONEY]: createTransferMoney,
  [TransferMoneyIntents.LOAD_TRANSFER_MONEY_DETAIL]: loadTransferMoneyDetail,
  [TransferMoneyIntents.DELETE_TRANSFER_MONEY]: deleteTransferMoney,
};

export default ReceiveMoneyMapping;
