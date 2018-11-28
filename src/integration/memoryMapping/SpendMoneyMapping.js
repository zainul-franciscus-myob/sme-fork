import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';
import spendMoneyNewEntry from '../data/spendMoneyNewEntry';

const newSpendMoney = ({ onSuccess }) => {
  onSuccess(spendMoneyNewEntry);
};

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: newSpendMoney,
};

export default SpendMoneyMapping;
