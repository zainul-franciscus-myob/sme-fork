import {
  LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
  LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
  SEARCH_COMBOBOX_BANKING_RULE,
} from '../BankingRuleComboboxIntents';

const HttpBankingRuleComboboxMapping = {
  [LOAD_BANKING_RULE_COMBOBOX_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/bankingRule/load_banking_rule_options`,
  },
  [LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID]: {
    method: 'GET',
    getPath: ({ businessId, bankingRuleId }) =>
      `/${businessId}/bankingRule/load_banking_rule_options/${bankingRuleId}`,
  },
  [SEARCH_COMBOBOX_BANKING_RULE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/bankingRule/load_banking_rule_options`,
  },
};

export default HttpBankingRuleComboboxMapping;
