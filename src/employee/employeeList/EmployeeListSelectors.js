export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getRegion = state => state.region;
export const getFilterOptions = state => state.filterOptions;
export const getSortOrder = state => state.sortOrder;
export const getOrderBy = state => state.orderBy;
export const getAlert = state => state.alert;
export const getIsTableLoading = state => state.isTableLoading;
export const getEntries = (state) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);
  return state.entries.map((entry) => {
    const link = `/#/${region}/${businessId}/employee/${entry.id}`;
    return { ...entry, link, isInactive: !entry.isActive };
  });
};
export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});
const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');
export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');
export const getAppliedFilterOptions = state => state.appliedFilterOptions;
export const getIsTableEmpty = state => state.entries.length === 0;
