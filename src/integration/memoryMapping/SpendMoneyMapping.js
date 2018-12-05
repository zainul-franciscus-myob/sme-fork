import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';
import spendMoneyNewEntry from '../data/spendMoney/spendMoneyDetailNewEntry';
import spendMoneyReferenceId from '../data/spendMoney/spendMoneyDetailReferenceId';
import successResponse from '../data/success.json';

const newSpendMoney = ({ onSuccess }) => onSuccess(spendMoneyNewEntry);

const saveSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const getSpendMoneyNextReferenceId = ({ onSuccess }) => onSuccess(spendMoneyReferenceId);

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: newSpendMoney,
  [SpendMoneyIntents.CREATE_SPEND_MONEY]: saveSpendMoney,
  [SpendMoneyIntents.LOAD_REFERENCE_ID]: getSpendMoneyNextReferenceId,
};

export default SpendMoneyMapping;
