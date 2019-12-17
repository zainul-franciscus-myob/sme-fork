import { LOAD_BANKING_RULE_LIST, SORT_AND_FILTER_BANKING_RULE_LIST } from '../../modules/bankingRules/bankingRuleList/BankingRuleListIntents';

const BankingRuleMapping = {
  [LOAD_BANKING_RULE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/load_banking_rule_list`,
  },
  [SORT_AND_FILTER_BANKING_RULE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/filter_banking_rule_list`,
  },
};

export default BankingRuleMapping;
