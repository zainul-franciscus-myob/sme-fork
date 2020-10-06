import {
  LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
  LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
  SET_BANKING_RULE_COMBOBOX_LOADING_STATE,
  SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
  UPDATE_BANKING_RULE_COMBOBOX_OPTIONS,
} from './BankingRuleComboboxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  bankingRuleType: '',
  bankingRuleOptions: [],
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
  isLoading: false,
  isOptionsLoading: true,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setBankingRuleComboboxLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setBankingRuleOptionsLoadingState = (state, { isLoading }) => ({
  ...state,
  isOptionsLoading: isLoading,
});

const getUniqueSetOfBankingRuleOptions = (topOptions, bottomOptions) => {
  const topOptionIds = new Set(topOptions.map(({ id }) => id));
  return [
    ...topOptions,
    ...bottomOptions.filter(({ id }) => !topOptionIds.has(id)),
  ];
};

const loadBankingRuleComboboxOptions = (
  state,
  { bankingRuleOptions, pagination }
) => ({
  ...state,
  bankingRuleOptions: getUniqueSetOfBankingRuleOptions(
    state.bankingRuleOptions,
    bankingRuleOptions
  ),
  pagination: {
    ...state.pagination,
    ...pagination,
  },
});

const isOptionExisted = (stateOptions, updatedOption) =>
  stateOptions.some((stateOption) => stateOption.id === updatedOption.id);
const getUpdatedBankingRuleOptions = (stateOptions, updatedOption) =>
  isOptionExisted(stateOptions, updatedOption)
    ? stateOptions.map((option) =>
        option.id === updatedOption.id ? updatedOption : option
      )
    : [updatedOption, ...stateOptions];

const loadBankingRuleOptionById = (state, { bankingRule }) => ({
  ...state,
  bankingRuleOptions: getUpdatedBankingRuleOptions(
    state.bankingRuleOptions,
    bankingRule
  ),
});

const updateBankingRuleComboboxOptions = (state, { bankingRule }) => ({
  ...state,
  bankingRuleOptions: getUpdatedBankingRuleOptions(
    state.bankingRuleOptions,
    bankingRule
  ),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_BANKING_RULE_COMBOBOX_LOADING_STATE]: setBankingRuleComboboxLoadingState,
  [SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE]: setBankingRuleOptionsLoadingState,
  [LOAD_BANKING_RULE_COMBOBOX_OPTIONS]: loadBankingRuleComboboxOptions,
  [LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID]: loadBankingRuleOptionById,
  [UPDATE_BANKING_RULE_COMBOBOX_OPTIONS]: updateBankingRuleComboboxOptions,
};

export default createReducer(getDefaultState(), handlers);
