
export const getBusinessId = ({ businessId }) => businessId;

export const convertToUnixTime = date => new Date(date).getTime().toString();

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getTableEntries = ({ entries }) => entries;

export const getIsTableEmpty = state => state.entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getFlipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getOrderBy = state => state.orderBy;

export const getCustomerFilterOptions = state => state.customerFilterOptions;

export const getStatusFilterOptions = state => state.statusFilterOptions;

export const getAlert = state => state.alert;

export const getTotal = state => state.total;

export const getTotalDue = state => state.totalDue;
