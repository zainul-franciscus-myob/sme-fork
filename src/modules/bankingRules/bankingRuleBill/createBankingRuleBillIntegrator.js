import {
  CREATE_BANKING_RULE_BILL,
  DELETE_BANKING_RULE_BILL,
  LOAD_BANKING_RULE_BILL,
  LOAD_NEW_BANKING_RULE_BILL,
  UPDATE_BANKING_RULE_BILL,
} from './BankingRuleBillIntents';
import {
  getBankingRuleParams,
  getIsCreating,
  getNewBankingRuleParams,
  getSaveBankingRuleContent,
} from './bankingRuleBillSelectors';

const createBankingRuleBillIntegrator = (store, integration) => ({
  loadBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_BANKING_RULE_BILL : LOAD_BANKING_RULE_BILL;
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
    const intent = isCreating ? CREATE_BANKING_RULE_BILL : UPDATE_BANKING_RULE_BILL;

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
      intent: DELETE_BANKING_RULE_BILL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleBillIntegrator;
