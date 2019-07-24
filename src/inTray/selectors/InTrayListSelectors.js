export const getIsLoading = state => state.inTrayList.isLoading;

export const getIsTableLoading = state => state.inTrayList.isTableLoading;

export const getFilterOptions = state => state.inTrayList.filterOptions;

export const getAppliedFilterOptions = state => state.inTrayList.appliedFilterOptions;

export const getSortOrder = state => state.inTrayList.sortOrder;

export const getOrderBy = state => state.inTrayList.orderBy;

export const getEntries = state => state.inTrayList.entries;

export const getIsTableEmpty = state => (state.inTrayList.entries || []).length === 0;

export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const flipSortOrder = ({ inTrayList: { sortOrder } }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');
