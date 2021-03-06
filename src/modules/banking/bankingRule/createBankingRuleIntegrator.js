import {
  CREATE_BANKING_RULE_BILL,
  CREATE_BANKING_RULE_INVOICE,
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  CREATE_BANKING_RULE_SPEND_MONEY,
} from './BankingRuleIntents';
import {
  getBankingRuleSaveContent,
  getBusinessId,
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
  createBankingRule: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const ruleType = getRuleType(state);
    const content = getBankingRuleSaveContent(state);
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
