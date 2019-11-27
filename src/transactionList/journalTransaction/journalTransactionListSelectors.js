import { createSelector, createStructuredSelector } from 'reselect';

const getJournalState = state => state.journalTransactions;

export const getOrder = createSelector(
  getJournalState,
  ({ sortOrder, orderBy }) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

export const getSortOrder = createSelector(
  getJournalState,
  ({ sortOrder }) => sortOrder,
);

export const getFlipSortOrder = createSelector(
  getJournalState,
  ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc'),
);

export const getOrderBy = createSelector(
  getJournalState,
  ({ orderBy }) => orderBy,
);

export const getFilterOptions = createSelector(
  getJournalState,
  ({ filterOptions }) => filterOptions,
);
export const getAppliedFilterOptions = createSelector(
  getJournalState,
  ({ appliedFilterOptions }) => appliedFilterOptions,
);

export const getSourceJournalFilterOptions = createSelector(
  getJournalState,
  ({ sourceJournalFilters }) => sourceJournalFilters.map(
    filter => ({
      label: filter.name,
      value: filter.value,
    }),
  ),
);

export const getEntries = createSelector(
  getJournalState,
  state => state.entries,
);

const BUSINESS_EVENT_TYPE_TO_FEATURE_MAP = {
  GeneralAccounting: 'generalJournal',
  CashPayment: 'spendMoney',
  CashReceipt: 'receiveMoney',
  TransferMoney: 'transferMoney',
  ReceivePayment: 'invoicePayment',
  PayBill: 'billPayment',
  ReceiveRefund: 'receiveRefund',
  SettlePurchaseReturn: 'appliedPurchaseReturn',
  PayRefund: 'payRefund',
  SettleSaleReturn: 'applyToSale',
  Purchase: 'bill',
  Sale: 'invoice',
};

const getEntryLink = (entry, businessId, region) => {
  const {
    id,
    businessEventType,
  } = entry;
  const feature = BUSINESS_EVENT_TYPE_TO_FEATURE_MAP[businessEventType];

  return `/#/${region}/${businessId}/${feature}/${id}`;
};

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
    }),
  ),
);

export const getIsTableEmpty = createSelector(
  getJournalState,
  ({ entries }) => entries.length === 0,
);

export const getIsTableLoading = createSelector(
  getJournalState,
  state => state.isTableLoading,
);

export const getIsLoading = createSelector(
  getJournalState,
  state => state.isLoading,
);

const getAppliedSourceJournal = createSelector(
  getJournalState,
  state => state.appliedFilterOptions.sourceJournal,
);

export const getURLParams = createStructuredSelector({
  sourceJournal: getAppliedSourceJournal,
});
