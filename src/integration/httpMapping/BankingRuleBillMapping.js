import {
  CREATE_BANKING_RULE_BILL,
  DELETE_BANKING_RULE_BILL,
  LOAD_BANKING_RULE_BILL,
  LOAD_NEW_BANKING_RULE_BILL,
  UPDATE_BANKING_RULE_BILL,
} from '../../modules/bankingRules/bankingRuleBill/BankingRuleBillIntents';

const BankingRuleBillMapping = {
  [LOAD_NEW_BANKING_RULE_BILL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/load_new_banking_rule_bill`,
  },
  [LOAD_BANKING_RULE_BILL]: {
    method: 'GET',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/load_banking_rule_bill/${bankingRuleId}`,
  },
  [CREATE_BANKING_RULE_BILL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/create_banking_rule_bill`,
  },
  [UPDATE_BANKING_RULE_BILL]: {
    method: 'PUT',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/update_banking_rule_bill/${bankingRuleId}`,
  },
  [DELETE_BANKING_RULE_BILL]: {
    method: 'DELETE',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/delete_banking_rule_bill/${bankingRuleId}`,
  },
};

export default BankingRuleBillMapping;
