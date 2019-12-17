import {
  CREATE_BANKING_RULE_INVOICE,
  DELETE_BANKING_RULE_INVOICE,
  LOAD_BANKING_RULE_INVOICE,
  LOAD_NEW_BANKING_RULE_INVOICE,
  UPDATE_BANKING_RULE_INVOICE,
} from '../../modules/bankingRules/bankingRuleInvoice/BankingRuleInvoiceIntents';

const BankingRuleInvoiceMapping = {
  [LOAD_NEW_BANKING_RULE_INVOICE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/load_new_banking_rule_invoice`,
  },
  [LOAD_BANKING_RULE_INVOICE]: {
    method: 'GET',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/load_banking_rule_invoice/${bankingRuleId}`,
  },
  [CREATE_BANKING_RULE_INVOICE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/create_banking_rule_invoice`,
  },
  [UPDATE_BANKING_RULE_INVOICE]: {
    method: 'PUT',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/update_banking_rule_invoice/${bankingRuleId}`,
  },
  [DELETE_BANKING_RULE_INVOICE]: {
    method: 'DELETE',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/delete_banking_rule_invoice/${bankingRuleId}`,
  },
};

export default BankingRuleInvoiceMapping;
