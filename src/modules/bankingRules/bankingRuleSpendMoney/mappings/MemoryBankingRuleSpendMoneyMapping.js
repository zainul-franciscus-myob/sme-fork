import {
  CREATE_BANKING_RULE_SPEND_MONEY,
  DELETE_BANKING_RULE_SPEND_MONEY,
  LOAD_BANKING_RULE_SPEND_MONEY,
  LOAD_NEW_BANKING_RULE_SPEND_MONEY,
  UPDATE_BANKING_RULE_SPEND_MONEY,
} from '../BankingRuleSpendMoneyIntents';
import loadBankingRuleSpendMoney from './data/loadBankingRuleSpendMoney.json';
import loadNewBankingRuleSpendMoney from './data/loadNewBankingRuleSpendMoney.json';
import successMessage from './data/success.json';

const MemoryBankingRuleSpendMoneyMapping = {
  [LOAD_NEW_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(loadNewBankingRuleSpendMoney),
  [LOAD_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(loadBankingRuleSpendMoney),
  [CREATE_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [UPDATE_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [DELETE_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
};

export default MemoryBankingRuleSpendMoneyMapping;
