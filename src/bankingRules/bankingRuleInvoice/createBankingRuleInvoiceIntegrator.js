import {
  CREATE_BANKING_RULE_INVOICE,
  DELETE_BANKING_RULE_INVOICE,
  LOAD_BANKING_RULE_INVOICE,
  LOAD_NEW_BANKING_RULE_INVOICE,
  UPDATE_BANKING_RULE_INVOICE,
} from './BankingRuleInvoiceIntents';
import {
  getBankingRuleParams,
  getIsCreating,
  getNewBankingRuleParams,
  getSaveBankingRuleContent,
} from './bankingRuleInvoiceSelectors';

const createBankingRuleInvoiceIntegrator = (store, integration) => ({
  loadBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_BANKING_RULE_INVOICE : LOAD_BANKING_RULE_INVOICE;
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
    const intent = isCreating ? CREATE_BANKING_RULE_INVOICE : UPDATE_BANKING_RULE_INVOICE;

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
      intent: DELETE_BANKING_RULE_INVOICE,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleInvoiceIntegrator;
