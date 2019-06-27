export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getIsLoading = state => state.isLoading;

export const getFilterOptions = state => state.filterOptions;

export const getTotalAmount = state => state.totalAmount;

export const getTotalCreditAmount = state => state.totalCreditAmount;

export const getCustomerFilterOptions = state => state.customerFilterOptions;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsTableEmpty = state => state.entries.length === 0;

export const getOrderBy = state => state.orderBy;

export const getSortOrder = state => state.sortOrder;

export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

export const getTableEntries = state => state.entries;

export const getAlert = state => state.alert;

const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');

export const getAppliedFilterOptions = state => state.appliedFilterOptions;
