import { createSelector } from 'reselect';

export const getAlert = (state) => state.alert;

export const getIsLoading = (state) => state.isLoading;

export const getTableEntries = ({ entries }) => entries;

export const getBusinessId = (state) => state.businessId;

export const getTransactionTypeOptions = (state) =>
  state.transactionTypeOptions;

export const getOrderBy = (state) => state.orderBy;

export const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getUrlParams = createSelector(getFilterOptions, ({ type }) => ({
  type,
}));

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getTransactionTypeFilters = createSelector(
  getTransactionTypeOptions,
  (typeOptions) =>
    typeOptions.map((option) => ({
      label: option.displayName,
      value: option.name,
    }))
);