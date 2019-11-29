import { addMonths } from 'date-fns';
import { createSelector } from 'reselect';

import TableBodyType from './TableBodyType';
import formatAmount from '../../common/valueFormatters/formatAmount';
import formatCurrency from '../../common/valueFormatters/formatCurrency';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';
import formatSlashDate from '../../common/valueFormatters/formatDate/formatSlashDate';

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

export const getSupplierFilterOptions = state => state.supplierFilters.map(supplier => (
  { displayName: supplier.name, id: supplier.value }));

export const getStatusFilterOptions = state => state.statusFilters;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrderBy = ({ orderBy }) => orderBy;

export const getTotal = state => state.total;

export const getTotalDue = state => state.totalDue;

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

export const getTotalOverdue = createSelector(
  getTableEntries,
  tableEntries => formatCurrency(tableEntries
    .filter(entry => entry.isOverdue)
    .reduce((total, entry) => (total + entry.balanceDue), 0)),
);

export const getHasOverdue = createSelector(
  getTotalOverdue,
  totalOverdue => totalOverdue !== '$0.00',
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

export const getDefaultDateRange = () => addMonths(new Date(), -3);

const isDefaultFilters = ({
  status,
  supplierId,
  dateFrom,
  dateTo,
  keywords,
}, defaultFilterOptions) => (
  status === defaultFilterOptions.status
  && supplierId === defaultFilterOptions.supplierId
  && dateFrom === formatIsoDate(getDefaultDateRange())
  && dateTo === formatIsoDate(new Date())
  && keywords === ''
);

export const getTableBodyState = createSelector(
  getAppliedFilterOptions,
  getDefaultFilterOptions,
  getEntries,
  (filterOptions, defaultFilterOptions, entries) => {
    if (entries.length > 0) {
      return TableBodyType.TABLE;
    }

    if (isDefaultFilters(filterOptions, defaultFilterOptions)) {
      return TableBodyType.EMPTY;
    }

    return TableBodyType.NO_RESULTS;
  },
);
