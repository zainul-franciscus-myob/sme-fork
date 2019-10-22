import { createSelector } from 'reselect';

export const getAlert = ({ alert }) => alert;
export const getEntries = state => state.entries;

const getEntryLink = (entry, businessId, region) => {
  const {
    id,
  } = entry;
  return `/#/${region}/${businessId}/contact/${id}`;
};

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

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

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrderBy = ({ orderBy }) => orderBy;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getDefaultFilterOptions = ({ defaultFilterOptions }) => defaultFilterOptions;

export const getIsDefaultFilters = createSelector(
  getAppliedFilterOptions,
  getDefaultFilterOptions,
  (appliedFlterOptions, defaultFilterOptions) => (
    !Object.keys(appliedFlterOptions)
      .map(key => defaultFilterOptions[key] === appliedFlterOptions[key])
      .includes(false)
  ),
);

export const getTypeFilterOptions = ({ typeFilters }) => typeFilters.map(
  filter => ({
    label: filter.name,
    value: filter.value,
  }),
);

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;

export const getShowHiddenColumns = state => state.showHiddenColumns;
