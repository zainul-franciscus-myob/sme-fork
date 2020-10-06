import { createSelector } from 'reselect';

import getLoadMoreButtonStatus from '../../../components/AutoComplete/helpers/getLoadMoreButtonStatus';

const getBusinessId = (state) => state.businessId;
const getRegion = (state) => state.region;
export const getBankingRuleId = (state) => state.bankingRuleId;
export const getIsBankingRuleLoading = (state) => state.isLoading;
const getIsBankingRuleOptionsLoading = (state) => state.isOptionsLoading;
export const getBankingRuleOptions = (state) => state.bankingRuleOptions;
const getHasMoreBankingRuleOptions = (state) => state.pagination.hasNextPage;
const getBankingRuleOptionsOffset = (state) => state.pagination.offset;
const getBankingRuleType = (state) => state.bankingRuleType;

export const getLoadBankingRuleOptionsStatus = createSelector(
  getIsBankingRuleOptionsLoading,
  getHasMoreBankingRuleOptions,
  (isOptionsLoading, hasMore) =>
    getLoadMoreButtonStatus(isOptionsLoading, hasMore)
);

export const getLoadBankingRuleOptionsParams = (state) => {
  const offset = getBankingRuleOptionsOffset(state);
  const ruleType = getBankingRuleType(state);

  return { offset, ruleType };
};

export const getLoadBankingRuleOptionsUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getLoadBankingRuleOptionByIdUrlParams = (state, bankingRuleId) => {
  const businessId = getBusinessId(state);

  return { businessId, bankingRuleId };
};

export const getSearchBankingRuleParams = (keywords, state) => ({
  offset: 0,
  keywords,
  ruleType: getBankingRuleType(state),
});

export const getBankingRuleModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getShouldLoadBankingRuleOptionById = (state, bankingRuleId) => {
  const bankingRuleOptions = getBankingRuleOptions(state);

  return (
    bankingRuleId && !bankingRuleOptions.some(({ id }) => id === bankingRuleId)
  );
};
