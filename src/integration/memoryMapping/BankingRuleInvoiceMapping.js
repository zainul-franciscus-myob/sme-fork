import {
  CREATE_BANKING_RULE_INVOICE,
  DELETE_BANKING_RULE_INVOICE,
  LOAD_BANKING_RULE_INVOICE,
  LOAD_NEW_BANKING_RULE_INVOICE,
  UPDATE_BANKING_RULE_INVOICE,
} from '../../bankingRules/bankingRuleInvoice/BankingRuleInvoiceIntents';
import loadBankingRuleInvoice from '../data/bankingRule/loadBankingRuleInvoice.json';
import loadNewBankingRuleInvoice from '../data/bankingRule/loadNewBankingRuleInvoice.json';
import successMessage from '../data/success.json';

const BankingRuleInvoice = {
  [LOAD_NEW_BANKING_RULE_INVOICE]: ({ onSuccess }) => onSuccess(loadNewBankingRuleInvoice),
  [LOAD_BANKING_RULE_INVOICE]: ({ onSuccess }) => onSuccess(loadBankingRuleInvoice),
  [CREATE_BANKING_RULE_INVOICE]: ({ onSuccess }) => onSuccess(successMessage),
  [UPDATE_BANKING_RULE_INVOICE]: ({ onSuccess }) => onSuccess(successMessage),
  [DELETE_BANKING_RULE_INVOICE]: ({ onSuccess }) => onSuccess(successMessage),
};

export default BankingRuleInvoice;
