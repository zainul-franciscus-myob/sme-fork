import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getRecurringTransactionId = (state) =>
  state.recurringTransactionId;
export const getShowTransactionType = (state) => state.showTransactionType;

export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getEntries = ({ entries }) => entries;
export const getOrderBy = (state) => state.orderBy;
export const getSortOrder = (state) => state.sortOrder;

export const getIsOpen = (state) => state.isOpen;
export const getAlert = (state) => state.alert;
export const getIsLoading = (state) => state.isLoading;
export const getIsTableLoading = (state) => state.isTableLoading;

export const getIsTableEmpty = createSelector(
  getEntries,
  (entries) => !entries.length
);

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getLoadRecurringTransactionListUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getSortRecurringTransactionListParams = (state) => {
  const filterOptions = getFilterOptions(state);
  const sortOrder = getSortOrder(state);
  const orderBy = getOrderBy(state);

  return {
    ...filterOptions,
    sortOrder,
    orderBy,
  };
};

export const getIsActionDisabled = createSelector(
  getIsLoading,
  getIsTableLoading,
  (isLoading, isTableLoading) => isLoading || isTableLoading
);

export const getIsPrimaryActionDisabled = createSelector(
  getIsActionDisabled,
  getEntries,
  getRecurringTransactionId,
  (isActionDisabled, entries, recurringTransactionId) =>
    isActionDisabled || !entries.some(({ id }) => id === recurringTransactionId)
);

export const getSelectedEntry = (state) => {
  const entries = getEntries(state);
  const recurringTransactionId = getRecurringTransactionId(state);

  return entries.find(({ id }) => id === recurringTransactionId);
};
