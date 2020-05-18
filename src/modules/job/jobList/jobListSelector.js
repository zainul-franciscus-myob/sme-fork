import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getAlert = state => state.alert;
export const getLoadingState = state => state.loadingState;
export const getIsTableLoading = state => state.isTableLoading;
export const getShowStatusColumn = state => state.showStatusColumn;
export const getFilterOptions = state => state.filterOptions;
export const getIsDefaultFilter = state => state.isDefaultFilter;
export const getEntries = state => state.entries;
export const getIsJobEnabled = state => state.isJobEnabled;

export const getIsTableEmpty = state => state.entries.length === 0;

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/job/${id}`;
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

export const getFilterJobListParams = (state) => {
  const filterOptions = getFilterOptions(state);

  return {
    ...filterOptions,
  };
};

export const getJobListUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getJobCreateLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/job/new`,
);
