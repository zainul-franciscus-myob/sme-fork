import { createSelector } from 'reselect';

import getQueryFromParams from '../../../common/getQueryFromParams/getQueryFromParams';

export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getSortOrder = state => state.sortOrder;
export const getOrderBy = state => state.orderBy;
export const getAppliedFilterOptions = state => state.appliedFilterOptions;
export const getFilterOptions = state => state.filterOptions;
export const getIsTableLoading = state => state.isTableLoading;
export const getAlert = state => state.alert;
export const getIsFilterStateChanged = state => state.appliedFilterOptions.keywords !== '';
const getEntries = state => state.entries;

export const getOrder = createSelector(
  getSortOrder,
  getOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

export const getIsTableEmpty = state => state.entries.length === 0;
export const getFlipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getIsStatusDisplayed = state => state.appliedFilterOptions.showInactive;

export const getSelectedBankingRuleUrl = (state, bankingRuleType) => {
  const params = getQueryFromParams({
    ruleType: bankingRuleType,
  });
  return `/#/${getRegion(state)}/${getBusinessId(state)}/bankingRule/new${params}`;
};

export const getTableEntries = createSelector(
  getEntries,
  getRegion,
  getBusinessId,
  (entries, region, businessId) => entries.map(entry => ({
    ...entry,
    link: `/#/${region}/${businessId}/bankingRule/${entry.id}`,
  })),
);
