import { createSelector } from 'reselect';

import BankingRuleTypes from './BankingRuleTypes';

export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getSortOrder = state => state.sortOrder;
export const getOrderBy = state => state.orderBy;
export const getAppliedFilterOptions = state => state.appliedFilterOptions;
export const getFilterOptions = state => state.filterOptions;
export const getIsTableLoading = state => state.isTableLoading;
export const getAlert = state => state.alert;
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

const mapBankingRuleType = type => ({
  'Spend money': BankingRuleTypes.SPEND_MONEY,
  'Receive money': BankingRuleTypes.RECEIVE_MONEY,
}[type]);

export const getSelectedBankingRuleUrl = (state, bankingRuleType) => `/#/${getRegion(state)}/${getBusinessId(state)}/bankingRule/${bankingRuleType}/new`;

export const getTableEntries = createSelector(
  getEntries,
  getRegion,
  getBusinessId,
  (entries, region, businessId) => entries.map((entry) => {
    const bankingType = mapBankingRuleType(entry.displayTransactionType);
    return {
      ...entry,
      link: `/#/${region}/${businessId}/bankingRule/${bankingType}/${entry.id}`,
    };
  }),
);
