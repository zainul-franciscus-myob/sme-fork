import {
  CREATE_BANKING_RULE_BILL,
  CREATE_BANKING_RULE_INVOICE,
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  CREATE_BANKING_RULE_SPEND_MONEY,
  LOAD_CONTACT,
} from '../BankingRuleIntents';

const HttpBankingRuleMapping = {
  [LOAD_CONTACT]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/banking/banking_rule/load_contact/${contactId}`,
  },
  [CREATE_BANKING_RULE_BILL]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/banking_rule/create_bill`,
  },
  [CREATE_BANKING_RULE_SPEND_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/banking_rule/create_spend_money`,
  },
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/banking_rule/create_receive_money`,
  },
  [CREATE_BANKING_RULE_INVOICE]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/banking_rule/create_invoice`,
  },
};

export default HttpBankingRuleMapping;
