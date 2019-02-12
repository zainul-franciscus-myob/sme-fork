import { createSelector } from 'reselect';

export const getAlert = ({ alert }) => alert;

export const getEntries = state => state.entries;

const getEntryLink = (entry, businessId) => {
  const {
    id,
  } = entry;
  return `/#/${businessId}/contact/${id}`;
};

export const getTableEntries = createSelector(
  getEntries,
  (state, props) => props.businessId,
  (entries, businessId) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId),
    }),
  ),
);

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrderBy = ({ orderBy }) => orderBy;

export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getContactTypeFilterOptions = ({ contactTypeFilters }) => contactTypeFilters.map(
  filter => ({
    label: filter.name,
    value: filter.value,
  }),
);

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;
