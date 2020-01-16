import { createSelector, createStructuredSelector } from 'reselect';

import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import tableViewTypes from './tableViewTypes';

export const getLoadingState = state => state.loadingState;
export const getIsTableLoading = state => state.isTableLoading;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getBillPaymentId = state => state.billPaymentId;
const getSuppliers = state => state.suppliers;
const getAccounts = state => state.accounts;
const getAccountId = state => state.accountId;
export const getSupplierId = state => state.supplierId;
const getReferenceId = state => state.referenceId;
const getDate = state => state.date;
export const getShowPaidBills = state => state.showPaidBills;
const getDescription = state => state.description;
export const getIsPageEdited = state => state.isPageEdited;
export const getModalType = state => state.modalType;

export const getIsCreating = state => state.billPaymentId === 'new';
export const getShouldDisableFields = state => state.billPaymentId !== 'new';

export const getIsActionsDisabled = state => state.isSubmitting;

export const getTitle = createSelector(
  getIsCreating,
  getReferenceId,
  (isCreating, referenceId) => (
    isCreating
      ? 'Record payment to supplier'
      : `Payment to supplier ${referenceId}`
  ),
);

const formatAmount = amount => Intl
  .NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  })
  .format(amount);

const calculateBalanceOwed = (billAmount, discountAmount) => (
  formatAmount(Number(billAmount) - Number(discountAmount))
);

const getEntries = state => state.entries;

const getEntryLink = (id, businessId, region) => `/#/${region}/${businessId}/bill/${id}`;

const getLabelColour = status => ({
  Open: 'light-grey',
  Closed: 'green',
}[status]);

export const getBillEntries = createSelector(
  getEntries, getBusinessId, getRegion,
  (
    entries, businessId, region,
  ) => entries.map(
    entry => ({
      ...entry,
      billAmount: formatAmount(Number(entry.billAmount)),
      balanceOwed: calculateBalanceOwed(entry.billAmount, entry.discountAmount),
      link: getEntryLink(entry.id, businessId, region),
      labelColour: getLabelColour(entry.status),
    }),
  ),
);

export const getBillPaymentOptions = createStructuredSelector({
  suppliers: getSuppliers,
  accounts: getAccounts,
  accountId: getAccountId,
  supplierId: getSupplierId,
  referenceId: getReferenceId,
  date: getDate,
  description: getDescription,
  shouldDisableFields: getShouldDisableFields,
  isCreating: getIsCreating,
});

export const getShouldLoadBillList = (key, value, state) => {
  const supplierId = getSupplierId(state);

  if (key === 'supplierId' && value.length > 0) {
    return true;
  }
  if (key === 'showPaidBills' && supplierId.length > 0) {
    return true;
  }
  return false;
};

export const getLoadBillListParams = createSelector(
  getBusinessId,
  getSupplierId,
  getShowPaidBills,
  (businessId, supplierId, showPaidBills) => ({
    urlParams: {
      businessId,
      supplierId,
    },
    params: {
      showPaidBills,
    },
  }),
);

export const getIsTableEmpty = state => state.entries.length === 0;

export const getEmptyViewType = createSelector(
  getIsCreating, getSupplierId,
  (isCreating, supplierId) => (
    isCreating && !supplierId ? tableViewTypes.emptySupplier : tableViewTypes.emptyTable
  ),
);

export const getTotalAmount = createSelector(
  getEntries,
  entries => `${
    formatCurrency(
      entries.reduce((total, currentEntry) => total + (Number(currentEntry.paidAmount) || 0), 0),
    )
  }`,
);

export const getIsReferenceIdDirty = ({ referenceId, originalReferenceId }) => (
  referenceId !== originalReferenceId
);

const hasAmountPaidApplied = paidAmount => paidAmount && paidAmount.length > 0 && paidAmount !== '0.00';

const getBillEntriesForCreatePayload = state => (
  state.entries.filter(entry => hasAmountPaidApplied(entry.paidAmount))
    .map(entry => ({
      paidAmount: entry.paidAmount,
      id: entry.id,
      discountAmount: entry.discountAmount,
    })));

const getOriginalReferenceId = state => state.originalReferenceId;
const getSupplierName = createSelector(
  getSuppliers,
  getSupplierId,
  (suppliers, supplierId) => {
    const selectedSupplier = suppliers.find(({ id }) => supplierId === id) || {};

    return selectedSupplier.displayName;
  },
);
const getCreateBillPaymentPayload = (state) => {
  const originalReferenceId = getOriginalReferenceId(state);
  const referenceId = getReferenceId(state);

  return {
    date: getDate(state),
    referenceId: referenceId === originalReferenceId ? undefined : referenceId,
    description: getDescription(state),
    accountId: getAccountId(state),
    supplierId: getSupplierId(state),
    supplierName: getSupplierName(state),
    entries: getBillEntriesForCreatePayload(state),
  };
};

const getUpdateBillPaymentPayload = state => ({
  date: getDate(state),
  referenceId: getReferenceId(state),
  description: getDescription(state),
  accountId: getAccountId(state),
});

export const getSaveBillPaymentPayload = state => (getIsCreating(state)
  ? getCreateBillPaymentPayload(state) : getUpdateBillPaymentPayload(state));

export const getAlertMessage = state => state.alertMessage;
