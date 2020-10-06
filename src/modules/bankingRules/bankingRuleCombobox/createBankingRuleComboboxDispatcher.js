import {
  LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
  LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
  SET_BANKING_RULE_COMBOBOX_LOADING_STATE,
  SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
  UPDATE_BANKING_RULE_COMBOBOX_OPTIONS,
} from './BankingRuleComboboxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createBankingRuleComboboxDispatcher = ({ store }) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setBankingRuleLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_BANKING_RULE_COMBOBOX_LOADING_STATE,
      isLoading,
    }),
  setBankingRuleOptionsLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
      isLoading,
    }),
  loadBankingRuleOptions: (payload) =>
    store.dispatch({
      intent: LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
      ...payload,
    }),
  loadBankingRuleOptionById: (bankingRule) =>
    store.dispatch({
      intent: LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
      bankingRule,
    }),
  updateBankingRuleOptions: (bankingRule) =>
    store.dispatch({
      intent: UPDATE_BANKING_RULE_COMBOBOX_OPTIONS,
      bankingRule,
    }),
});

export default createBankingRuleComboboxDispatcher;
