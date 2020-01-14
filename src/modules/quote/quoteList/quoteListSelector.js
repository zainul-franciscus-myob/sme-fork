import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from '../../employee/employeeList/components/Pagination/LoadMoreButtonStatuses';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

export const getAlert = ({ alert }) => alert;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getBusinessId = ({ businessId }) => businessId;

export const getCustomerFilterOptions = ({ customerFilters }) => customerFilters;

export const getEntries = state => state.entries;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getLoadingState = state => state.loadingState;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getOrderBy = ({ orderBy }) => orderBy;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getRegion = state => state.region;

export const getTableEntries = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) => entries.map(entry => ({
    ...entry,
    link: `/#/${region}/${businessId}/quote/${entry.id}`,
  })),
);

export const getTotal = state => state.total;

export const getLoadMoreButtonStatus = (state) => {
  const isLastPage = !state.pagination.hasNextPage;
  const { isTableLoading } = state;

  if (isLastPage || isTableLoading) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (state.isLoadingMore) {
    return LoadMoreButtonStatuses.LOADING;
  }

  return LoadMoreButtonStatuses.SHOWN;
};

const getOffset = state => state.pagination.offset;

export const getLoadNextPageParams = createSelector(
  getAppliedFilterOptions,
  getSortOrder,
  getOrderBy,
  getOffset,
  (appliedFilterOptions, sortOrder, orderBy, offset) => ({
    ...appliedFilterOptions,
    sortOrder,
    orderBy,
    offset,
  }),
);

const getSettingsVersion = state => state.settingsVersion;

export const getSettings = createSelector(
  getAppliedFilterOptions,
  getSortOrder,
  getOrderBy,
  getSettingsVersion,
  (filterOptions, sortOrder, orderBy, settingsVersion) => ({
    filterOptions,
    sortOrder,
    orderBy,
    settingsVersion,
  }),
);

export const getDefaultFilterOptions = ({ defaultFilterOptions }) => defaultFilterOptions;

export const getIsDefaultFilter = createSelector(
  getAppliedFilterOptions,
  getDefaultFilterOptions,
  (appliedFilterOptions, defaultFilterOptions) => shallowCompare(
    appliedFilterOptions,
    defaultFilterOptions,
  ),
);
