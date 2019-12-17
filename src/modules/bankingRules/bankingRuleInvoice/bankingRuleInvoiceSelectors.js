import { createSelector, createStructuredSelector } from 'reselect';

const getApplyToAllAccounts = state => state.applyToAllAccounts;
const getAccountId = state => state.accountId;
const getConditions = state => state.conditions;

export const getIsCreating = state => state.bankingRuleId === 'new';
export const getBusinessId = state => state.businessId;
export const getBankingRuleId = state => state.bankingRuleId;
export const getRegion = state => state.region;
export const getIsLoading = state => state.isLoading;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);
export const getIsPagedEdited = state => state.isPageEdited;
export const getAlertMessage = state => state.alertMessage;
export const getIsAlertShown = createSelector(
  getAlertMessage,
  message => Boolean(message),
);

export const getIsInactiveRule = state => state.isInactiveRule;
export const getName = state => state.name;
export const getPageTitle = state => state.title;
export const getBankAccounts = state => state.bankAccounts;
export const getTaxCodes = state => state.taxCodes;
export const getCustomerId = state => state.customerId;
export const getCustomers = state => state.customers;

const getContainsWordsValue = createSelector(
  getConditions,
  conditions => conditions.containsWords.value,
);
const getExactWordsValue = createSelector(
  getConditions,
  conditions => conditions.exactWords.value,
);
const getEqualAmountsValue = createSelector(
  getConditions,
  conditions => conditions.equalAmounts.value,
);
export const getDescriptionSection = createStructuredSelector({
  applyToAllAccounts: getApplyToAllAccounts,
  accountId: getAccountId,
  bankAccounts: getBankAccounts,
  containsWords: getContainsWordsValue,
  exactWords: getExactWordsValue,
  equalAmounts: getEqualAmountsValue,
});

export const getSaveBankingRuleContent = createStructuredSelector({
  name: getName,
  isInactiveRule: getIsInactiveRule,
  applyToAllAccounts: getApplyToAllAccounts,
  accountId: getAccountId,
  customerId: getCustomerId,
  conditions: getConditions,
});

export const getNewBankingRuleParams = state => ({
  businessId: getBusinessId(state),
});

export const getBankingRuleParams = state => ({
  businessId: getBusinessId(state),
  bankingRuleId: getBankingRuleId(state),
});

export const getBankingRuleListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/bankingRule`;
};

export const getSaveUrl = (state) => {
  const modalUrl = getModalUrl(state);
  const bankingRuleListUrl = getBankingRuleListUrl(state);

  return modalUrl || bankingRuleListUrl;
};
