import { createSelector } from 'reselect';
import { isPast } from 'date-fns';

import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import formatCurrency from '../../common/valueFormatters/formatCurrency';

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

const isOverdue = ({ dateDue, status, dateDueDisplay }) => (
  !['COD', 'Prepaid'].includes(dateDueDisplay) && isPast(dateDue) && status === 'Open'
);

const getDueDateColor = entry => (
  isOverdue(entry) ? 'red' : 'black'
);

const getStatusColor = entry => (
  isOverdue(entry) ? 'red' : {
    Closed: 'green', Open: 'light-grey', Credit: 'blue',
  }[entry.status]
);

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
      dueDateColor: getDueDateColor(entry),
      statusColor: getStatusColor(entry),
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

export const getTotalOverdue = createSelector(
  getEntries,
  entries => formatCurrency(entries
    .filter(entry => isOverdue(entry))
    .reduce((total, entry) => (total + entry.invoiceDue), 0)),
);

export const getHasOverdue = createSelector(
  getTotalOverdue,
  totalOverdue => totalOverdue !== '$0.00',
);

export const getDefaultFilterOptions = ({ defaultFilterOptions }) => defaultFilterOptions;

export const getIsDefaultFilters = createSelector(
  getAppliedFilterOptions,
  getDefaultFilterOptions,
  (appliedFilterOptions, defaultFilterOptions) => (
    !Object.keys(appliedFilterOptions)
      .map(key => defaultFilterOptions[key] === appliedFilterOptions[key])
      .includes(false)
  ),
);

export const getSettings = createSelector(
  getAppliedFilterOptions,
  getSortOrder,
  getOrderBy,
  (filterOptions, sortOrder, orderBy) => ({
    filterOptions,
    sortOrder,
    orderBy,
  }),
);

export const getLoadMoreButtonStatus = (state) => {
  const isLastPage = !state.pagination.hasNextPage;
  const { isTableLoading } = state;

  if (isLastPage || isTableLoading) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (state.isNextPageLoading) {
    return LoadMoreButtonStatuses.LOADING;
  }

  return LoadMoreButtonStatuses.SHOWN;
};

export const getOffset = state => state.pagination.offset;

export const getLoadNextPageParams = (state) => {
  const filterOptions = getFilterOptions(state);
  const sortOrder = getSortOrder(state);
  const orderBy = getOrderBy(state);
  const offset = getOffset(state);

  return {
    ...filterOptions,
    sortOrder,
    orderBy,
    offset,
  };
};
