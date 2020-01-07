import { createSelector } from 'reselect';

import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import TableBodyType from './TableBodyType';
import formatAmount from '../../common/valueFormatters/formatAmount';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';
import formatSlashDate from '../../common/valueFormatters/formatDate/formatSlashDate';
import shallowCompare from '../../common/shallowCompare/shallowCompare';

export const getEntries = state => state.entries;

export const getRegion = state => state.region;

export const getBusinessId = state => state.businessId;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getAlert = ({ alert }) => alert;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const getDefaultFilterOptions = ({ defaultFilterOptions }) => defaultFilterOptions;

export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

const getSettingsVersion = state => state.settingsVersion;

export const getSupplierFilterOptions = state => state.supplierFilters;

export const getStatusFilterOptions = state => state.statusFilters;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrderBy = ({ orderBy }) => orderBy;

export const getTotal = state => state.total;

export const getTotalDue = state => state.totalDue;

export const getTotalOverdue = state => state.totalOverdue;

export const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

const getEntryLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/bill/${id}`;
};

const getBadgeColor = (status, isOverdue) => ({
  Open: isOverdue ? 'red' : 'light-grey',
  Closed: 'green',
  Debit: 'blue',
}[status]);

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => {
    const today = new Date(formatIsoDate(new Date())); // Get the start of today ignoring time zone

    return entries.map(
      (entry) => {
        const parsedDateDue = new Date(entry.dateDue);
        const isOverdue = entry.status === 'Open'
          && !!parsedDateDue.getDate()
          && parsedDateDue < today
          && entry.balanceDue > 0;

        return {
          ...entry,
          link: getEntryLink(entry, businessId, region),
          balanceDueDisplayValue: formatAmount(entry.balanceDue),
          // dateDue could be 'COD' or 'Prepaid'
          dateDue: parsedDateDue.getDate() ? formatSlashDate(parsedDateDue) : entry.dateDue,
          isOverdue,
          badgeColor: getBadgeColor(entry.status, isOverdue),
        };
      },
    );
  },
);

export const getHasOverdue = createSelector(
  getTotalOverdue,
  totalOverdue => totalOverdue !== '$0.00',
);

export const getSettings = createSelector(
  getSettingsVersion,
  getAppliedFilterOptions,
  getSortOrder,
  getOrderBy,
  (settingsVersion, filterOptions, sortOrder, orderBy) => ({
    settingsVersion,
    filterOptions,
    sortOrder,
    orderBy,
  }),
);


const getIsDefaultFilters = createSelector(
  getAppliedFilterOptions,
  getDefaultFilterOptions,
  (appliedFilterOptions, defaultFilterOptions) => shallowCompare(
    appliedFilterOptions,
    defaultFilterOptions,
  ),
);

export const getTableBodyState = createSelector(
  getIsDefaultFilters,
  getEntries,
  (isDefaultFilters, entries) => {
    if (entries.length > 0) {
      return TableBodyType.TABLE;
    }

    if (isDefaultFilters) {
      return TableBodyType.EMPTY;
    }

    return TableBodyType.NO_RESULTS;
  },
);

export const getOffset = state => state.pagination.offset;

export const getLoadMoreButtonStatus = (state) => {
  const isTableLoading = getIsTableLoading(state);
  const { isLoadingMore } = state;
  const isLastPage = state.pagination && !state.pagination.hasNextPage;

  if (isLastPage || isTableLoading) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (isLoadingMore) {
    return LoadMoreButtonStatuses.LOADING;
  }
  return LoadMoreButtonStatuses.SHOWN;
};
