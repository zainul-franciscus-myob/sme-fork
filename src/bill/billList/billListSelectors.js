import { createSelector } from 'reselect';

export const getEntries = state => state.entries;

export const getRegion = state => state.region;

export const getBusinessId = state => state.businessId;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getAlert = ({ alert }) => alert;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getSupplierFilterOptions = state => state.supplierFilters.map(supplier => (
  { displayName: supplier.name, id: supplier.value }));

export const getStatusFilterOptions = state => state.statusFilters;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrderBy = ({ orderBy }) => orderBy;

export const getTotal = state => state.total;

export const getTotalDue = state => state.totalDue;

export const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

const getDefaultLayout = state => state.layout;

export const getNewBillUrlParam = createSelector(
  getDefaultLayout,
  layout => (layout === 'service' ? 'newService' : 'newItem'),
);

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/bill/${id}`;
};

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
    }),
  ),
);
