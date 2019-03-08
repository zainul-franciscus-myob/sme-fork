import { createSelector } from 'reselect';

export const convertToUnixTime = date => new Date(date).getTime().toString();

export const getAlert = ({ alert }) => alert;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getBusinessId = ({ businessId }) => businessId;

export const getCustomerFilterOptions = ({ customerFilters }) => customerFilters;

export const getEntries = state => state.entries;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getFormattedFilterOptions = ({ filterOptions }) => ({
  ...filterOptions,
  dateFrom: convertToUnixTime(filterOptions.dateFrom),
  dateTo: convertToUnixTime(filterOptions.dateTo),
});

export const getIsLoading = state => state.isLoading;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getOrderBy = ({ orderBy }) => orderBy;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getTableEntries = createSelector(
  getEntries,
  (state, props) => props.businessId,
  entries => entries,
);

export const getTotal = state => state.total;
