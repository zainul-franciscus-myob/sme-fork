import { createSelector, createStructuredSelector } from 'reselect';
import { isBefore } from 'date-fns';

import {
  CREATE_BILL_PAYMENT,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  UPDATE_BILL_PAYMENT,
} from '../BillPaymentIntents';
import ContactType from '../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../contact/contactCombobox/types/DisplayMode';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import tableViewTypes from './tableViewTypes';

export const getLoadingState = (state) => state.loadingState;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getBillPaymentId = (state) => state.billPaymentId;
export const getApplyPaymentToBillId = (state) => state.applyPaymentToBillId;
const getAccounts = (state) => state.accounts;
const getAccountId = (state) => state.accountId;
const getElectronicClearingAccountId = (state) =>
  state.electronicClearingAccountId;
export const getSupplierId = (state) => state.supplierId;
const getReferenceId = (state) => state.referenceId;
const getDate = (state) => state.date;
export const getShowPaidBills = (state) => state.showPaidBills;
const getDescription = (state) => state.description;
const getBankStatementText = (state) => state.bankStatementText;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getModalType = (state) => state.modalType;
export const getRedirectUrl = (state) => state.redirectUrl;

export const getIsCreating = (state) => state.billPaymentId === 'new';
export const getShouldDisableFields = (state) => state.billPaymentId !== 'new';

export const getIsActionsDisabled = (state) => state.isSubmitting;

export const getTitle = createSelector(
  getIsCreating,
  getReferenceId,
  (isCreating, referenceId) =>
    isCreating
      ? 'Record payment to supplier'
      : `Payment to supplier ${referenceId}`
);

const calculateBalanceOwed = (billAmount, discountAmount) =>
  Number(billAmount) - Number(discountAmount);

const getEntries = (state) => state.entries;

const getEntryLink = (id, businessId, region) =>
  `/#/${region}/${businessId}/bill/${id}`;

const getLabelColour = (status) =>
  ({
    Open: 'light-grey',
    Closed: 'green',
  }[status]);

const getOverAmount = (entry) => {
  if (!entry.paidAmount) return undefined;

  const balanceOwed = calculateBalanceOwed(
    entry.billAmount,
    entry.discountAmount
  );
  const overAmount = Number(entry.paidAmount) - balanceOwed;
  return overAmount > 0 ? formatAmount(overAmount) : undefined;
};

export const getBillEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      billAmount: formatAmount(Number(entry.billAmount)),
      balanceOwed: formatAmount(
        calculateBalanceOwed(entry.billAmount, entry.discountAmount)
      ),
      overAmount: getOverAmount(entry),
      link: getEntryLink(entry.id, businessId, region),
      labelColour: getLabelColour(entry.status),
    }))
);

export const getShowBankStatementText = createSelector(
  getAccountId,
  getElectronicClearingAccountId,
  (accountId, electronicClearingAccountId) =>
    accountId === electronicClearingAccountId
);

export const getBillPaymentOptions = createStructuredSelector({
  accounts: getAccounts,
  accountId: getAccountId,
  supplierId: getSupplierId,
  referenceId: getReferenceId,
  date: getDate,
  description: getDescription,
  shouldDisableFields: getShouldDisableFields,
  isCreating: getIsCreating,
  bankStatementText: getBankStatementText,
  showBankStatementText: getShowBankStatementText,
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
  })
);

export const getIsTableEmpty = (state) => state.entries.length === 0;

export const getEmptyViewType = createSelector(
  getIsCreating,
  getSupplierId,
  (isCreating, supplierId) =>
    isCreating && !supplierId
      ? tableViewTypes.emptySupplier
      : tableViewTypes.emptyTable
);

export const getTotalAmount = createSelector(
  getEntries,
  (entries) =>
    `${formatCurrency(
      entries.reduce(
        (total, currentEntry) => total + (Number(currentEntry.paidAmount) || 0),
        0
      )
    )}`
);

export const getIsReferenceIdDirty = ({ referenceId, originalReferenceId }) =>
  referenceId !== originalReferenceId;

const hasAmountPaidApplied = (paidAmount) =>
  paidAmount && paidAmount.length > 0 && paidAmount !== '0.00';

const getBillEntriesForCreatePayload = (state) =>
  state.entries
    .filter((entry) => hasAmountPaidApplied(entry.paidAmount))
    .map((entry) => ({
      paidAmount: entry.paidAmount,
      id: entry.id,
      discountAmount: entry.discountAmount,
    }));

const getOriginalReferenceId = (state) => state.originalReferenceId;

const getCreateBillPaymentPayload = (state) => {
  const originalReferenceId = getOriginalReferenceId(state);
  const referenceId = getReferenceId(state);

  return {
    date: getDate(state),
    referenceId: referenceId === originalReferenceId ? undefined : referenceId,
    description: getDescription(state),
    bankStatementText: getShowBankStatementText(state)
      ? getBankStatementText(state)
      : '',
    accountId: getAccountId(state),
    supplierId: getSupplierId(state),
    entries: getBillEntriesForCreatePayload(state),
  };
};

const getUpdateBillPaymentPayload = (state) => ({
  date: getDate(state),
  referenceId: getReferenceId(state),
  bankStatementText: getShowBankStatementText(state)
    ? getBankStatementText(state)
    : '',
  description: getDescription(state),
  accountId: getAccountId(state),
});

export const getSaveBillPaymentPayload = (state) =>
  getIsCreating(state)
    ? getCreateBillPaymentPayload(state)
    : getUpdateBillPaymentPayload(state);

export const getAlertMessage = (state) => state.alertMessage;

export const getLoadBillPaymentIntent = createSelector(
  getIsCreating,
  (isCreating) => (isCreating ? LOAD_NEW_BILL_PAYMENT : LOAD_BILL_PAYMENT)
);

export const getSaveBillPaymentIntent = createSelector(
  getIsCreating,
  (isCreating) => (isCreating ? CREATE_BILL_PAYMENT : UPDATE_BILL_PAYMENT)
);

export const getBillPaymentUrlParams = createSelector(
  getBusinessId,
  getBillPaymentId,
  (businessId, billPaymentId) => ({
    businessId,
    billPaymentId,
  })
);

export const getUpdateReferenceIdUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({
    businessId,
  })
);

export const getUpdateReferenceIdParams = createSelector(
  getAccountId,
  (accountId) => ({
    accountId,
  })
);

export const getIsBeforeStartOfFinancialYear = (state) => {
  const { startOfFinancialYearDate, date } = state;
  const issueDate = new Date(date);
  return (
    issueDate &&
    startOfFinancialYearDate &&
    isBefore(issueDate, new Date(startOfFinancialYearDate))
  );
};

export const getContactComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const supplierId = getSupplierId(state);

  return {
    businessId,
    region,
    contactId: supplierId,
    contactType: ContactType.SUPPLIER,
    displayMode: DisplayMode.NAME_AND_TYPE,
  };
};
