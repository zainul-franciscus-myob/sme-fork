import {
  CREATE_BANKING_RULE,
  DELETE_BANKING_RULE,
  LOAD_BANKING_RULE,
  LOAD_NEW_BANKING_RULE,
  UPDATE_BANKING_RULE,
} from './BankingRuleDetailIntents';
import {
  getBankingRuleParams,
  getIsCreating,
  getNewBankingRuleParams,
  getSaveBankingRuleContent,
} from './bankingRuleDetailSelectors';

const createBankingRuleDetailIntegrator = (store, integration) => ({
  loadBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_BANKING_RULE : LOAD_BANKING_RULE;
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
    const intent = isCreating ? CREATE_BANKING_RULE : UPDATE_BANKING_RULE;

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
      intent: DELETE_BANKING_RULE,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleDetailIntegrator;
