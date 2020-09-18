import {
  CREATE_BANKING_RULE_BILL,
  CREATE_BANKING_RULE_INVOICE,
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  CREATE_BANKING_RULE_SPEND_MONEY,
} from '../BankingRuleIntents';
import createBankingRuleResponse from './data/createBankingRuleResponse';

const createBankingRule = ({ onSuccess }) =>
  onSuccess(createBankingRuleResponse);

const MemoryBankingRuleMapping = {
  [CREATE_BANKING_RULE_SPEND_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_INVOICE]: createBankingRule,
  [CREATE_BANKING_RULE_BILL]: createBankingRule,
};

export default MemoryBankingRuleMapping;
