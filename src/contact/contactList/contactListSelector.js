import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import shallowCompare from '../../common/shallowCompare/shallowCompare';

export const getAlert = ({ alert }) => alert;
export const getEntries = state => state.entries;

const getEntryLink = (entry, businessId, region) => {
  const {
    id,
  } = entry;
  return `/#/${region}/${businessId}/contact/${id}`;
};

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
    }),
  ),
);

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrderBy = ({ orderBy }) => orderBy;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getDefaultFilterOptions = ({ defaultFilterOptions }) => defaultFilterOptions;

export const getIsDefaultFilters = createSelector(
  getAppliedFilterOptions,
  getDefaultFilterOptions,
  (appliedFilterOptions, defaultFilterOptions) => shallowCompare(
    appliedFilterOptions, defaultFilterOptions,
  ),
);

export const getTypeFilterOptions = ({ typeFilters }) => typeFilters.map(
  filter => ({
    label: filter.name,
    value: filter.value,
  }),
);

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getisNextPageLoading = state => state.isNextPageLoading;

export const getIsLoading = state => state.isLoading;

export const getShowHiddenColumns = state => state.showHiddenColumns;

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

export const getOffset = state => state.pagination.offset;

export const getLoadContactListParams = () => ({
  offset: 0,
});

export const getSortContactListParams = state => getAppliedFilterOptions(state);

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
