import {
  CREATE_BANKING_RULE_SPEND_MONEY,
  DELETE_BANKING_RULE_SPEND_MONEY,
  LOAD_BANKING_RULE_SPEND_MONEY,
  LOAD_NEW_BANKING_RULE_SPEND_MONEY,
  UPDATE_BANKING_RULE_SPEND_MONEY,
} from './BankingRuleSpendMoneyIntents';
import {
  getBankingRuleParams,
  getIsCreating,
  getNewBankingRuleParams,
  getSaveBankingRuleContent,
} from './bankingRuleSpendMoneySelectors';

const createBankingRuleSpendMoneyIntegrator = (store, integration) => ({
  loadBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_BANKING_RULE_SPEND_MONEY : LOAD_BANKING_RULE_SPEND_MONEY;
    const urlParams = isCreating ? getNewBankingRuleParams(state) : getBankingRuleParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess: onSuccess(intent),
      onFailure,
    });
  },

  saveBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const content = getSaveBankingRuleContent(state);
    const urlParams = isCreating ? getNewBankingRuleParams(state) : getBankingRuleParams(state);
    const intent = isCreating ? CREATE_BANKING_RULE_SPEND_MONEY : UPDATE_BANKING_RULE_SPEND_MONEY;

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();

    const urlParams = getBankingRuleParams(state);

    integration.write({
      intent: DELETE_BANKING_RULE_SPEND_MONEY,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleSpendMoneyIntegrator;
