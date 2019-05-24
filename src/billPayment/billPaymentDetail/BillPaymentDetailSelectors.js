import { createSelector, createStructuredSelector } from 'reselect';

import tableViewTypes from './tableViewTypes';

export const getIsLoading = state => state.isLoading;
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

export const getBillEntries = createSelector(
  getEntries,
  entries => entries.map(
    entry => ({
      ...entry,
      billAmount: formatAmount(Number(entry.billAmount)),
      balanceOwed: calculateBalanceOwed(entry.billAmount, entry.discountAmount),
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
  showPaidBills: getShowPaidBills,
  description: getDescription,
  shouldDisableFields: getShouldDisableFields,
});

export const getShouldLoadBillList = ({ key, value }) => createSelector(
  getSupplierId,
  (supplierId) => {
    if (key === 'supplierId' && value.length > 0) {
      return true;
    }
    if (key === 'showPaidBills' && supplierId.length > 0) {
      return true;
    }
    return false;
  },
);

export const getLoadBillListParams = ({ key, value }) => createSelector(
  getBusinessId,
  getSupplierId,
  getShowPaidBills,
  (businessId, supplierId, showPaidBills) => {
    if (key === 'supplierId') {
      return {
        urlParams: {
          businessId,
          supplierId: value,
        },
        params: {
          showPaidBills,
        },
      };
    }

    return {
      urlParams: {
        businessId,
        supplierId,
      },
      params: {
        showPaidBills: value,
      },
    };
  },
);

export const getTableViewType = createSelector(
  getSupplierId,
  getEntries,
  getIsTableLoading,
  (supplierId, entries, isTableLoading) => {
    if (supplierId === '') {
      return tableViewTypes.emptySupplier;
    }
    if (entries.length === 0) {
      return tableViewTypes.emptyTable;
    }
    if (isTableLoading) {
      return tableViewTypes.spinner;
    }
    return tableViewTypes.default;
  },
);

export const getTotalAmount = createSelector(
  getEntries,
  entries => `$${
    formatAmount(
      entries.reduce((total, currentEntry) => total + Number(currentEntry.paidAmount || '0.00'), 0),
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
      billId: entry.billId,
      discountAmount: entry.discountAmount,
    })));

const getOriginalReferenceId = state => state.originalReferenceId;
const getCreateBillPaymentPayload = (state) => {
  const originalReferenceId = getOriginalReferenceId(state);
  const referenceId = getReferenceId(state);

  return {
    date: getDate(state),
    referenceId: referenceId === originalReferenceId ? undefined : referenceId,
    description: getDescription(state),
    accountId: getAccountId(state),
    supplierId: getSupplierId(state),
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
