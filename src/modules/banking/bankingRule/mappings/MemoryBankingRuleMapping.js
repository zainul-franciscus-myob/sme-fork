import {
  CREATE_BANKING_RULE_BILL,
  CREATE_BANKING_RULE_INVOICE,
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  CREATE_BANKING_RULE_SPEND_MONEY,
  LOAD_CONTACT,
} from '../BankingRuleIntents';
import contactResponse from './data/loadContactResponse.json';
import createBankingRuleResponse from './data/createBankingRuleResponse';

const loadContact = ({ onSuccess }) => onSuccess(contactResponse);
const createBankingRule = ({ onSuccess }) =>
  onSuccess(createBankingRuleResponse);

const MemoryBankingRuleMapping = {
  [LOAD_CONTACT]: loadContact,
  [CREATE_BANKING_RULE_SPEND_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_INVOICE]: createBankingRule,
  [CREATE_BANKING_RULE_BILL]: createBankingRule,
};

export default MemoryBankingRuleMapping;
