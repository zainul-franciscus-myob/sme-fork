import { createSelector } from 'reselect';
import { isPast } from 'date-fns';

export const getBusinessId = ({ businessId }) => businessId;

export const getRegion = state => state.region;

export const convertToUnixTime = date => new Date(date).getTime().toString();

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

const getEntries = ({ entries }) => entries;

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/invoice/${id}`;
};

const getEntryBadgeColour = status => (
  { Closed: 'green', Open: 'light-grey', Overdue: 'red' }[status]
);

const getEntryStatus = ({ dateDue, status }) => ((status === 'Open' && isPast(dateDue))
  ? 'Overdue'
  : status);

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
      displayStatus: getEntryStatus(entry),
      badgeColour: getEntryBadgeColour(getEntryStatus(entry)),
    }),
  ),
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

export const getCustomerFilterOptions = state => state.customerFilterOptions;

export const getStatusFilterOptions = state => state.statusFilterOptions;

export const getAlert = state => state.alert;

export const getTotal = state => state.total;

export const getTotalDue = state => state.totalDue;
