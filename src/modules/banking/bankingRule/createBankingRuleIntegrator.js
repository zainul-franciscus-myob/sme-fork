import {
  CREATE_BANKING_RULE_BILL,
  CREATE_BANKING_RULE_INVOICE,
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  CREATE_BANKING_RULE_SPEND_MONEY,
  LOAD_CONTACT,
} from './BankingRuleIntents';
import {
  getBankingRule,
  getBusinessId,
  getContactId,
  getRuleType,
} from './bankingRuleSelectors';
import RuleTypes from './RuleTypes';

const ruleIntentMap = {
  [RuleTypes.invoice]: CREATE_BANKING_RULE_INVOICE,
  [RuleTypes.bill]: CREATE_BANKING_RULE_BILL,
  [RuleTypes.spendMoney]: CREATE_BANKING_RULE_SPEND_MONEY,
  [RuleTypes.receiveMoney]: CREATE_BANKING_RULE_RECEIVE_MONEY,
};

const createBankingRuleIntegrator = (store, integration) => ({
  loadContact: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getContactId(state),
    };

    integration.read({
      intent: LOAD_CONTACT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  createBankingRule: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const ruleType = getRuleType(state);
    const content = getBankingRule(state);
    const intent = ruleIntentMap[ruleType];

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleIntegrator;
