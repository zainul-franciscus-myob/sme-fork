import {
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  DELETE_BANKING_RULE_RECEIVE_MONEY,
  LOAD_BANKING_RULE_RECEIVE_MONEY,
  LOAD_NEW_BANKING_RULE_RECEIVE_MONEY,
  UPDATE_BANKING_RULE_RECEIVE_MONEY,
} from '../../modules/bankingRules/bankingRuleReceiveMoney/BankingRuleReceiveMoneyIntents';
import loadBankingRuleReceiveMoney from '../data/bankingRule/loadBankingRuleReceiveMoney.json';
import loadNewBankingRuleReceiveMoney from '../data/bankingRule/loadNewBankingRuleReceiveMoney.json';
import successMessage from '../data/success.json';

const BankingRuleReceiveMoney = {
  [LOAD_NEW_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(
    loadNewBankingRuleReceiveMoney,
  ),
  [LOAD_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(loadBankingRuleReceiveMoney),
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [UPDATE_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [DELETE_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
};

export default BankingRuleReceiveMoney;
