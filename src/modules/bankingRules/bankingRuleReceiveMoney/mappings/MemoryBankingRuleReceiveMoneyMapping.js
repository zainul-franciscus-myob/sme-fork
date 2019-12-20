import {
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  DELETE_BANKING_RULE_RECEIVE_MONEY,
  LOAD_BANKING_RULE_RECEIVE_MONEY,
  LOAD_NEW_BANKING_RULE_RECEIVE_MONEY,
  UPDATE_BANKING_RULE_RECEIVE_MONEY,
} from '../BankingRuleReceiveMoneyIntents';
import loadBankingRuleReceiveMoney from './data/loadBankingRuleReceiveMoney.json';
import loadNewBankingRuleReceiveMoney from './data/loadNewBankingRuleReceiveMoney.json';
import successMessage from './data/success.json';

const MemoryBankingRuleReceiveMoneyMapping = {
  [LOAD_NEW_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(
    loadNewBankingRuleReceiveMoney,
  ),
  [LOAD_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(loadBankingRuleReceiveMoney),
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [UPDATE_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
  [DELETE_BANKING_RULE_RECEIVE_MONEY]: ({ onSuccess }) => onSuccess(successMessage),
};

export default MemoryBankingRuleReceiveMoneyMapping;
