import {
  LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
  LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
  SEARCH_COMBOBOX_BANKING_RULE,
} from './BankingRuleComboboxIntents';
import {
  getLoadBankingRuleOptionByIdUrlParams,
  getLoadBankingRuleOptionsParams,
  getLoadBankingRuleOptionsUrlParams,
  getSearchBankingRuleParams,
} from './BankingRuleComboboxSelectors';

const createBankingRuleComboboxIntegrator = ({ store, integration }) => ({
  loadBankingRuleOptions: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_BANKING_RULE_COMBOBOX_OPTIONS;
    const urlParams = getLoadBankingRuleOptionsUrlParams(state);
    const params = getLoadBankingRuleOptionsParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      allowParallelRequests: true,
      onSuccess,
      onFailure,
    });
  },
  searchBankingRule: ({ keywords, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SEARCH_COMBOBOX_BANKING_RULE;
    const urlParams = getLoadBankingRuleOptionsUrlParams(state);
    const params = getSearchBankingRuleParams(keywords, state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  loadBankingRuleOptionById: ({ onSuccess, onFailure, id }) => {
    const state = store.getState();
    const intent = LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID;
    const urlParams = getLoadBankingRuleOptionByIdUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleComboboxIntegrator;
