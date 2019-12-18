import { createSelector, createStructuredSelector } from 'reselect';

import formatCurrency from '../../../common/valueFormatters/formatCurrency';

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

export const getIsTableEmpty = state => state.entries.length === 0;

export const getTableEmptyMessage = createSelector(
  getSupplierId,
  (supplierId) => {
    if (supplierId === '') {
      return 'Please select a supplier';
    }
    return 'There are no bills';
  },
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
