import { createSelector } from 'reselect';

import TableBodyType from './TableBodyType';

export const getBusinessId = (state) => state.businessId;

export const getRegion = (state) => state.region;

export const getLoadingState = (state) => state.loadingState;

export const getFilterOptions = (state) => state.filterOptions;

export const getTotalAmount = (state) => state.totalAmount;

export const getTotalCreditAmount = (state) => state.totalCreditAmount;

export const getCustomerFilterOptions = (state) => state.customerFilterOptions;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getIsTableEmpty = (state) => state.entries.length === 0;

export const getOrderBy = (state) => state.orderBy;

export const getSortOrder = (state) => state.sortOrder;

export const getSettings = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (filterOptions, sortOrder, orderBy) => ({
    filterOptions,
    sortOrder,
    orderBy,
  })
);

export const getOrder = (state) => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const getEntries = (state) => state.entries;

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/invoice/${id}`;
};

export const isDefaultFilters = (
  { customerId, keywords },
  defaultFilterOptions
) => customerId === defaultFilterOptions.customerId && keywords === '';

const getDefaultFilterOptions = (state) => state.defaultFilterOptions;

export const getTableBodyState = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  getEntries,
  (filterOptions, defaultFilterOptions, entries) => {
    if (entries.length > 0) {
      return TableBodyType.TABLE;
    }
    if (isDefaultFilters(filterOptions, defaultFilterOptions)) {
      return TableBodyType.EMPTY;
    }
    return TableBodyType.NO_RESULTS;
  }
);

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

export const getAlert = (state) => state.alert;

const flipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getNewSortOrder = (orderBy) => (state) =>
  orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc';
