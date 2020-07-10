import { createSelector } from 'reselect';

export const getAlert = ({ alert }) => alert;

export const getBusinessId = ({ businessId }) => businessId;

export const getEntries = (state) => state.entries;

export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getLoadingState = (state) => state.loadingState;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getIsCurrentUserOnlineAdmin = (state) =>
  state.isCurrentUserOnlineAdmin;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getOrderBy = (state) => state.orderBy;

export const getRegion = (state) => state.region;

export const getSortOrder = (state) => state.sortOrder;

export const getTableEntries = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) =>
    entries.map((entry) => ({
      ...entry,
      link: `/#/${region}/${businessId}/user/${entry.id}`,
    }))
);
