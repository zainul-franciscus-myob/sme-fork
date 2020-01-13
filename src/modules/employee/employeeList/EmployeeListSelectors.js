import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from './components/Pagination/LoadMoreButtonStatuses';

export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getRegion = state => state.region;
export const getFilterOptions = state => state.filterOptions;
export const getSortOrder = state => state.sortOrder;
export const getOrderBy = state => state.orderBy;
export const getAlert = state => state.alert;
export const getIsTableLoading = state => state.isTableLoading;

const getEntries = state => state.entries;

export const getTableEntries = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) => entries.map((entry) => {
    const link = `/#/${region}/${businessId}/employee/${entry.id}`;
    return { ...entry, link, isInactive: !entry.isActive };
  }),
);

export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');

export const getAppliedFilterOptions = state => state.appliedFilterOptions;
export const getIsTableEmpty = state => state.entries.length === 0;

export const getLoadMoreButtonStatus = (state) => {
  const isLastPage = !state.pagination.hasNextPage;
  const { isTableLoading } = state;

  if (isLastPage || isTableLoading) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (state.isMoreLoading) {
    return LoadMoreButtonStatuses.LOADING;
  }

  return LoadMoreButtonStatuses.SHOWN;
};

export const getOffset = state => state.pagination.offset;

export const getFilterEmployeeListNextPageParams = (state) => {
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

export const getLoadEmployeeListNextPageParams = (state) => {
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
