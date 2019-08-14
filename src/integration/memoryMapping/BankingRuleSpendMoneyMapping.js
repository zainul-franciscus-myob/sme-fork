import {
  CREATE_BANKING_RULE_SPEND_MONEY,
  DELETE_BANKING_RULE_SPEND_MONEY,
  LOAD_BANKING_RULE_SPEND_MONEY,
  LOAD_NEW_BANKING_RULE_SPEND_MONEY,
  UPDATE_BANKING_RULE_SPEND_MONEY,
} from '../../bankingRules/bankingRuleSpendMoney/BankingRuleSpendMoneyIntents';
import loadBankingRuleSpendMoney from '../data/bankingRule/loadBankingRuleSpendMoney.json';
import loadNewBankingRuleSpendMoney from '../data/bankingRule/loadNewBankingRuleSpendMoney.json';
import successMessage from '../data/success.json';

const BankingRuleSpendMoney = {
  [LOAD_NEW_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(loadNewBankingRuleSpendMoney),
  [LOAD_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(loadBankingRuleSpendMoney),
  [CREATE_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [UPDATE_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [DELETE_BANKING_RULE_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
};

export default BankingRuleSpendMoney;
