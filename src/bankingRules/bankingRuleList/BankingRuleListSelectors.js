import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getSortOrder = state => state.sortOrder;
export const getOrderBy = state => state.orderBy;
export const getAppliedFilterOptions = state => state.appliedFilterOptions;
export const getFilterOptions = state => state.filterOptions;
export const getIsTableLoading = state => state.isTableLoading;
export const getEntries = state => state.entries;

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
