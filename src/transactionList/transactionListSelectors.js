import { createSelector } from 'reselect';

export const getOrder = ({ sortOrder }) => ({
  column: 'date',
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getAlert = ({ alert }) => alert;

export const convertToUnixTime = date => new Date(date).getTime().toString();

export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

export const getFormattedFilterOptions = ({ filterOptions }) => ({
  ...filterOptions,
  dateFrom: convertToUnixTime(filterOptions.dateFrom),
  dateTo: convertToUnixTime(filterOptions.dateTo),
});

export const getSourceJournalFilterOptions = ({ sourceJournalFilters }) => sourceJournalFilters.map(
  filter => ({
    label: filter.name,
    value: filter.value,
  }),
);

export const getEntries = state => state.entries;

const BUSINESS_EVENT_TYPE_TO_FEATURE_MAP = {
  GeneralAccounting: 'generalJournal',
  CashPayment: 'spendMoney',
  CashReceipt: 'receiveMoney',
  TransferMoney: 'transferMoney',
};

const getEntryLink = (entry, businessId) => {
  const {
    id,
    businessEventType,
  } = entry;
  const feature = BUSINESS_EVENT_TYPE_TO_FEATURE_MAP[businessEventType];

  return `/#/${businessId}/${feature}/${id}`;
};

export const getTableEntries = createSelector(
  getEntries,
  (state, props) => props.businessId,
  (entries, businessId) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId),
    }),
  ),
);

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;
