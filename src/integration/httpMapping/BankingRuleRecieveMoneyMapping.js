import {
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  DELETE_BANKING_RULE_RECEIVE_MONEY,
  LOAD_BANKING_RULE_RECEIVE_MONEY,
  LOAD_NEW_BANKING_RULE_RECEIVE_MONEY,
  UPDATE_BANKING_RULE_RECEIVE_MONEY,
} from '../../modules/bankingRules/bankingRuleReceiveMoney/BankingRuleReceiveMoneyIntents';

const BankingRuleReceiveMoneyMapping = {
  [LOAD_NEW_BANKING_RULE_RECEIVE_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/load_new_banking_rule_receive_money`,
  },
  [LOAD_BANKING_RULE_RECEIVE_MONEY]: {
    method: 'GET',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/load_banking_rule_receive_money/${bankingRuleId}`,
  },
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankingRule/create_banking_rule_receive_money`,
  },
  [UPDATE_BANKING_RULE_RECEIVE_MONEY]: {
    method: 'PUT',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/update_banking_rule_receive_money/${bankingRuleId}`,
  },
  [DELETE_BANKING_RULE_RECEIVE_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, bankingRuleId }) => `/${businessId}/bankingRule/delete_banking_rule_receive_money/${bankingRuleId}`,
  },
};

export default BankingRuleReceiveMoneyMapping;
