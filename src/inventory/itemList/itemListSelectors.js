import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getTableEntries = ({ entries }) => entries;

export const getRegion = state => state.region;

const getEntryLink = (entry, businessId, region) => {
  const {
    id,
  } = entry;
  return `/#/${region}/${businessId}/inventory/${id}`;
};

export const getFormattedTableEntries = createSelector(
  getTableEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(entry => ({
    ...entry,
    link: getEntryLink(entry, businessId, region),
  })),
);

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

export const getAlert = state => state.alert;

export const getTypeFilters = state => state.typeFilters;

export const getTypeOptions = createSelector(
  getTypeFilters,
  typeFilters => typeFilters.map(filter => ({
    label: filter.name,
    value: filter.value,
  })),
);
