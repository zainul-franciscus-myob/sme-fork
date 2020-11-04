import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from './components/Pagination/LoadMoreButtonStatuses';

const getEntries = (state) => state.entries;
const getPagination = (state) => state.pagination;

export const getRegion = (state) => state.region;
export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getIsTableEmpty = (state) => state.entries.length === 0;
export const getAlert = (state) => state.alert;
export const getSortOrder = (state) => state.sortOrder;
export const getOrderBy = (state) => state.orderBy;
export const getFilterOptions = (state) => state.filterOptions;
export const getOffset = (state) => state.pagination.offset;

export const getLoadEmployeeListNextPageParams = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  getOffset,
  (filterOptions, sortOrder, orderBy, offset) => {
    return {
      ...filterOptions,
      sortOrder,
      orderBy,
      offset,
    };
  }
);

export const getLoadMoreButtonStatus = createSelector(
  getLoadingState,
  getPagination,
  (loadingState, pagination) => {
    const isLastPage = !pagination.hasNextPage;

    if (isLastPage) {
      return LoadMoreButtonStatuses.HIDDEN;
    }

    if (loadingState.LOADING) {
      return LoadMoreButtonStatuses.LOADING;
    }

    return LoadMoreButtonStatuses.SHOWN;
  }
);

export const getEmployeeList = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) =>
    entries.map((entry) => {
      const link = `/#/${region}/${businessId}/employee/${entry.id}`;
      return { ...entry, link };
    })
);
