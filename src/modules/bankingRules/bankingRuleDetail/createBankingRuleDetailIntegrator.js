import {
  CREATE_BANKING_RULE,
  DELETE_BANKING_RULE,
  LOAD_BANKING_RULE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_BANKING_RULE,
  UPDATE_BANKING_RULE,
} from './BankingRuleDetailIntents';
import {
  getBankingRuleUrlParams,
  getBusinessId,
  getIsCreating,
  getNewBankingRuleUrlParams,
  getSaveBankingRuleContent,
} from './bankingRuleDetailSelectors';

const createBankingRuleDetailIntegrator = (store, integration) => ({
  loadBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_BANKING_RULE : LOAD_BANKING_RULE;
    const urlParams = isCreating
      ? getNewBankingRuleUrlParams(state)
      : getBankingRuleUrlParams(state);

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
    const urlParams = isCreating
      ? getNewBankingRuleUrlParams(state)
      : getBankingRuleUrlParams(state);

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

    const urlParams = getBankingRuleUrlParams(state);

    integration.write({
      intent: DELETE_BANKING_RULE,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadJobAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_JOB_AFTER_CREATE;
    const urlParams = {
      jobId: id,
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleDetailIntegrator;
