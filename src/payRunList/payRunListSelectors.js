import { createSelector } from 'reselect';

export const getAlert = ({ alert }) => alert;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getCreatePayRunUrl = state => `/#/${state.region}/${state.businessId}/payRun`;
export const getSortOrder = ({ sortOrder }) => sortOrder;
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;
export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getOrder = ({ sortOrder }) => ({
  column: 'date',
  descending: sortOrder === 'desc',
});
export const getFiltersTouched = ({ filtersTouched }) => filtersTouched;
export const getIsTableLoading = state => state.isTableLoading;

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
