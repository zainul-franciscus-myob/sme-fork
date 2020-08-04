import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from '../../employee/employeeList/components/Pagination/LoadMoreButtonStatuses';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getAlert = (state) => state.alert;
export const getLoadingState = (state) => state.loadingState;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getFilterOptions = (state) => state.filterOptions;
export const getDefaultFilterOptions = (state) => state.defaultFilterOptions;
export const getCustomerFilterOptions = (state) => state.customerFilters;
export const getEntries = (state) => state.entries;
export const getOrderBy = (state) => state.orderBy;
export const getSortOrder = (state) => state.sortOrder;
export const getTotal = (state) => state.total;
const getOffset = (state) => state.pagination.offset;
const getSettingsVersion = (state) => state.settingsVersion;

export const getIsTableEmpty = (state) => state.entries.length === 0;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getTableEntries = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) =>
    entries.map((entry) => ({
      ...entry,
      link: `/#/${region}/${businessId}/quoteWithStatus/${entry.id}`,
    }))
);

export const getLoadMoreButtonStatus = (state) => {
  const isLastPage = !state.pagination.hasNextPage;
  const { isTableLoading } = state;

  if (isLastPage || isTableLoading) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (state.isNextPageLoading) {
    return LoadMoreButtonStatuses.LOADING;
  }

  return LoadMoreButtonStatuses.SHOWN;
};

export const getSettings = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  getSettingsVersion,
  (filterOptions, sortOrder, orderBy, settingsVersion) => ({
    filterOptions,
    sortOrder,
    orderBy,
    settingsVersion,
  })
);

export const getIsDefaultFilter = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  (filterOptions, defaultFilterOptions) =>
    shallowCompare(filterOptions, defaultFilterOptions)
);

export const getQuoteCreateUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/quoteWithStatus/new`;
};

export const getQuoteListUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getLoadQuoteListParams = (state) => {
  const filterOptions = getFilterOptions(state);
  const sortOrder = getSortOrder(state);
  const orderBy = getOrderBy(state);

  return {
    ...filterOptions,
    sortOrder,
    orderBy,
  };
};

export const getFilterQuoteListParams = (state) => {
  const filterOptions = getFilterOptions(state);
  const sortOrder = getSortOrder(state);
  const orderBy = getOrderBy(state);

  return {
    ...filterOptions,
    sortOrder,
    orderBy,
    offset: 0,
  };
};

export const getLoadNextPageParams = (state) => {
  const filterOptions = getFilterOptions(state);
  const sortOrder = getSortOrder(state);
  const orderBy = getOrderBy(state);
  const offset = getOffset(state);

  return {
    ...filterOptions,
    sortOrder,
    orderBy,
    offset,
  };
};
