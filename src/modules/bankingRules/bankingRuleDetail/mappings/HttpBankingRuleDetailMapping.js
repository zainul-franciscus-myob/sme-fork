import {
  CREATE_BANKING_RULE,
  DELETE_BANKING_RULE,
  LOAD_BANKING_RULE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_BANKING_RULE,
  UPDATE_BANKING_RULE,
} from '../BankingRuleDetailIntents';

const HttpBankingRuleDetailMapping = {
  [LOAD_NEW_BANKING_RULE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/bankingRule/load_new_banking_rule`,
  },
  [LOAD_BANKING_RULE]: {
    method: 'GET',
    getPath: ({ businessId, bankingRuleId }) =>
      `/${businessId}/bankingRule/load_banking_rule/${bankingRuleId}`,
  },
  [CREATE_BANKING_RULE]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/bankingRule/create_banking_rule`,
  },
  [UPDATE_BANKING_RULE]: {
    method: 'PUT',
    getPath: ({ businessId, bankingRuleId }) =>
      `/${businessId}/bankingRule/update_banking_rule/${bankingRuleId}`,
  },
  [DELETE_BANKING_RULE]: {
    method: 'DELETE',
    getPath: ({ businessId, bankingRuleId }) =>
      `/${businessId}/bankingRule/delete_banking_rule/${bankingRuleId}`,
  },
  [LOAD_JOB_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, jobId }) =>
      `/${businessId}/bankingRule/load_job/${jobId}`,
  },
};

export default HttpBankingRuleDetailMapping;
