import { createSelector } from 'reselect';

const getEntries = state => state.entries;

export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getIsTableEmpty = state => state.entries.length === 0;

export const getEmployeeList = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) => entries.map((entry) => {
    const link = `/#/${region}/${businessId}/employee/${entry.id}`;
    return { ...entry, link };
  }),
);
