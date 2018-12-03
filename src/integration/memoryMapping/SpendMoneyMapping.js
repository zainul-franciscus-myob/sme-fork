import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';
import spendMoneyNewEntry from '../data/spendMoney/spendMoneyDetailNewEntry';
import successResponse from '../data/success.json';

const newSpendMoney = ({ onSuccess }) => {
  onSuccess(spendMoneyNewEntry);
};

const saveSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: newSpendMoney,
  [SpendMoneyIntents.CREATE_SPEND_MONEY]: saveSpendMoney,
};

export default SpendMoneyMapping;
