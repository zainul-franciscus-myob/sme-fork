import { createSelector, createStructuredSelector } from 'reselect';

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getFlipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getOrderBy = ({ orderBy }) => orderBy;

export const getAlert = ({ alert }) => alert;

export const getFilterOptions = ({ filterOptions }) => filterOptions;
export const getAppliedFilterOptions = ({ appliedFilterOptions }) => appliedFilterOptions;

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

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLoading;

const getAppliedSourceJournal = state => state.appliedFilterOptions.sourceJournal;

export const getURLParams = createStructuredSelector({
  sourceJournal: getAppliedSourceJournal,
});
