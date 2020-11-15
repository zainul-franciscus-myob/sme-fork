import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import TableBodyType from './TableBodyType';
import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

export const getEntries = (state) => state.entries;

export const getRegion = (state) => state.region;

export const getBusinessId = (state) => state.businessId;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getLoadingState = (state) => state.loadingState;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getAlert = ({ alert }) => alert;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getDefaultFilterOptions = ({ defaultFilterOptions }) =>
  defaultFilterOptions;

const getSettingsVersion = (state) => state.settingsVersion;

export const getSupplierFilterOptions = (state) => state.supplierFilters;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrderBy = ({ orderBy }) => orderBy;

export const getTotal = (state) => state.total;

export const flipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/bill/${id}`; // TODO link it to PO details page
};

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => {
    return entries.map((entry) => {
      const parsedPromisedDate = new Date(entry.promisedDate);

      return {
        ...entry,
        link: getEntryLink(entry, businessId, region),
        // PromisedDate could be 'COD' or 'Prepaid'
        promisedDate: parsedPromisedDate.getDate()
          ? formatSlashDate(parsedPromisedDate)
          : entry.promisedDate,
      };
    });
  }
);

export const getSettings = createSelector(
  getSettingsVersion,
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (settingsVersion, filterOptions, sortOrder, orderBy) => ({
    settingsVersion,
    filterOptions,
    sortOrder,
    orderBy,
  })
);

const getIsDefaultFilters = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  (filterOptions, defaultFilterOptions) =>
    shallowCompare(filterOptions, defaultFilterOptions)
);

export const getTableBodyState = createSelector(
  getIsDefaultFilters,
  getEntries,
  (isDefaultFilters, entries) => {
    if (entries.length > 0) {
      return TableBodyType.TABLE;
    }

    if (isDefaultFilters) {
      return TableBodyType.EMPTY;
    }

    return TableBodyType.NO_RESULTS;
  }
);

export const getOffset = (state) => state.pagination.offset;

export const getLoadMoreButtonStatus = (state) => {
  const isTableLoading = getIsTableLoading(state);
  const { isLoadingMore } = state;
  const isLastPage = state.pagination && !state.pagination.hasNextPage;

  if (isLastPage || isTableLoading) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (isLoadingMore) {
    return LoadMoreButtonStatuses.LOADING;
  }
  return LoadMoreButtonStatuses.SHOWN;
};
