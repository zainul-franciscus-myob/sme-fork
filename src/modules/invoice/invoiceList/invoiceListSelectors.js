import { createSelector } from 'reselect';
import { isPast } from 'date-fns';

import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

export const getBusinessId = ({ businessId }) => businessId;

export const getRegion = (state) => state.region;

export const getOrderBy = (state) => state.orderBy;

export const getCustomerFilterOptions = (state) => state.customerFilterOptions;

export const getStatusFilterOptions = (state) => state.statusFilterOptions;

export const getAlert = (state) => state.alert;

export const getTotal = (state) => state.total;

export const getTotalDue = (state) => state.totalDue;

export const getTotalOverdue = (state) => state.totalOverdue;

export const convertToUnixTime = (date) => new Date(date).getTime().toString();

export const getFilterOptions = (state) => {
  const customerOptions = getCustomerFilterOptions(state);
  const statusOptions = getStatusFilterOptions(state);
  const { filterOptions } = state;
  const selectedCustomer = customerOptions.find(
    ({ id }) => id === filterOptions.customerId
  );
  const selectedStatus = statusOptions.find(
    ({ value }) => value === filterOptions.status
  );
  return {
    ...filterOptions,
    customerId: selectedCustomer && selectedCustomer.id,
    status: selectedStatus ? selectedStatus.value : 'All',
  };
};

const getSettingsVersion = (state) => state.settingsVersion;

const getEntries = ({ entries }) => entries;

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/invoice/${id}`;
};

const isOverdue = ({ dateDue, status, dateDueDisplay }) =>
  !['COD', 'Prepaid'].includes(dateDueDisplay) &&
  isPast(new Date(dateDue)) &&
  status === 'Open';

const getDueDateColor = (entry) => (isOverdue(entry) ? 'red' : 'black');

const getStatusColor = (entry) =>
  isOverdue(entry)
    ? 'red'
    : {
        Closed: 'green',
        Open: 'light-grey',
        Credit: 'blue',
      }[entry.status];

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
      dueDateColor: getDueDateColor(entry),
      statusColor: getStatusColor(entry),
    }))
);

export const getIsTableEmpty = (state) => state.entries.length === 0;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getLoadingState = (state) => state.loadingState;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getHasOverdue = createSelector(
  getTotalOverdue,
  (totalOverdue) => totalOverdue !== '$0.00'
);

export const getDefaultFilterOptions = ({ defaultFilterOptions }) =>
  defaultFilterOptions;

export const getIsDefaultFilters = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  (filterOptions, defaultFilterOptions) =>
    shallowCompare(filterOptions, defaultFilterOptions)
);

export const getSettings = createSelector(
  getSettingsVersion,
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (settingsVersion, filterOptions, sortOrder, orderBy) => ({
    settingsVersion,
    filterOptions,
    sortOrder,
    orderBy,
  })
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

export const getOffset = (state) => state.pagination.offset;

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

export const getLoadInvoiceListRequest = createSelector(
  getBusinessId,
  getOrderBy,
  getSortOrder,
  getFilterOptions,
  (businessId, orderBy, sortOrder, filterOptions) => ({
    params: {
      ...filterOptions,
      orderBy,
      sortOrder,
    },
    urlParams: {
      businessId,
    },
  })
);

export const getSortAndFilterInvoiceListRequest = createSelector(
  getBusinessId,
  getOrderBy,
  getSortOrder,
  getFilterOptions,
  (businessId, orderBy, sortOrder, filterOptions) => ({
    urlParams: {
      businessId,
    },
    params: {
      ...filterOptions,
      sortOrder,
      orderBy,
      offset: 0,
    },
  })
);
