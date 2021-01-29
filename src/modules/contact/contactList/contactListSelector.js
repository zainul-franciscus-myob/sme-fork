import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getAlert = (state) => state.alert;
export const getLoadingState = (state) => state.loadingState;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getShowHiddenColumns = (state) => state.showHiddenColumns;
export const getFilterOptions = (state) => state.filterOptions;
export const getDefaultFilterOptions = (state) => state.defaultFilterOptions;
export const getOrderBy = (state) => state.orderBy;
export const getSortOrder = (state) => state.sortOrder;
export const getEntries = (state) => state.entries;
export const getOffset = (state) => state.pagination.offset;

export const getIsTableEmpty = (state) => state.entries.length === 0;

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/contact/${id}`;
};

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
    }))
);

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getFlipSortOrder = (state) =>
  state.sortOrder === 'desc' ? 'asc' : 'desc';

export const getIsDefaultFilters = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  (filterOptions, defaultFilterOptions) =>
    shallowCompare(filterOptions, defaultFilterOptions)
);

export const getTypeFilterOptions = ({ typeFilters }) =>
  typeFilters.map((filter) => ({ label: filter.name, value: filter.value }));

export const getFilterContactListParams = (state) => {
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

export const getLoadMoreButtonStatus = (state) => {
  const noNextPage = state.pagination && !state.pagination.hasNextPage;

  if (state.isTableLoading || noNextPage) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (state.isNextPageLoading) {
    return LoadMoreButtonStatuses.LOADING;
  }

  return LoadMoreButtonStatuses.SHOWN;
};

export const getLoadContactListNextPageParams = (state) => {
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

export const getContactCreateLink = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/contact/new`;
};

export const getContactsImportLink = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/dataImportExport?importType=contacts`;
};

export const getContactListUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};
