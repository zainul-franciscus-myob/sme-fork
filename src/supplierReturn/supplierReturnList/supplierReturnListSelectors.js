const DESC = 'desc';
const ASC = 'asc';

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getIsLoading = state => state.isLoading;

export const getFilterOptions = state => state.filterOptions;

export const getTotalAmount = state => state.totalAmount;

export const getTotalDebitAmount = state => state.totalDebitAmount;

export const getSupplierFilterOptions = state => state.supplierFilterOptions;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsTableEmpty = state => state.entries.length === 0;

export const getOrderBy = state => state.orderBy;

export const getSortOrder = state => state.sortOrder;

export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === DESC,
});

const getLink = (state, id) => `/#/${state.region}/${state.businessId}/bill/${id}`;

export const getTableEntries = state => state.entries.map(entry => ({
  ...entry,
  link: getLink(state, entry),
}));

export const getAlert = state => state.alert;

const flipSortOrder = ({ sortOrder }) => (sortOrder === DESC ? ASC : DESC);

export const getNewSortOrder = (state, orderBy) => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : ASC);

export const getAppliedFilterOptions = state => state.appliedFilterOptions;
