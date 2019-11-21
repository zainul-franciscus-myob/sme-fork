import { createSelector } from 'reselect';

import emptyViewTypes from './emptyViewTypes';

export const getAlert = ({ alert }) => alert;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getCreatePayRunUrl = state => `/#/${state.region}/${state.businessId}/payRun/new`;
export const getSortOrder = ({ sortOrder }) => sortOrder;
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;
export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getOrder = ({ sortOrder }) => ({
  column: 'date',
  descending: sortOrder === 'desc',
});
export const getIsTableLoading = state => state.isTableLoading;
export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsLoading = state => state.isLoading;
export const getEntries = state => state.entries;
const getEntryLink = (entry, businessId, region) => `/#/${region}/${businessId}/payrun/${entry.id}`;
export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      payPeriod: `${entry.payPeriodStart} - ${entry.payPeriodEnd}`,
      link: getEntryLink(entry, businessId, region),
    }),
  ),
);

export const getEmptyState = (state) => {
  switch (state.stpRegistrationStatus) {
    case 'notRegistered':
      return emptyViewTypes.notStpRegistered;
    case 'lostConnection':
      return emptyViewTypes.stpConnectionLost;
    default:
      return state.filtersTouched ? emptyViewTypes.noPayRunsFiltered : emptyViewTypes.noPayRuns;
  }
};
