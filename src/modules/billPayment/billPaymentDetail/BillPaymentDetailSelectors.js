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
import billPaymentModalTypes from './billPaymentModalTypes';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import remittanceAdviceTypes from './remittanceAdviceTypes';
import tableViewTypes from './tableViewTypes';

export const getIsRemittanceAdviceEnabled = (state) =>
  state.isRemittanceAdviceEnabled;
export const getAlertMessage = (state) => state.alertMessage;
export const getLoadingState = (state) => state.loadingState;
export const getIsSupplierLoading = (state) => state.isSupplierLoading;

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getBillPaymentId = (state) => state.billPaymentId;
export const getApplyPaymentToBillId = (state) => state.applyPaymentToBillId;
export const getAreEmailSettingsSet = (state) => state.areEmailSettingsSet;
const getAccounts = (state) => state.accounts;
const getAccountId = (state) => state.accountId;
const getElectronicClearingAccountId = (state) =>
  state.electronicClearingAccountId;
const getIsElectronicallyProcessed = (state) => state.isElectronicallyProcessed;
const getElectronicPaymentId = (state) => state.electronicPaymentId;
export const getElectronicPaymentReference = (state) =>
  state.electronicPaymentReference;
export const getSupplierId = (state) => state.supplierId;
export const getSupplierName = (state) => state.supplierName;
export const getReferenceId = (state) => state.referenceId;
const getDate = (state) => state.date;
export const getShowPaidBills = (state) => state.showPaidBills;
const getDescription = (state) => state.description;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getModalType = (state) => state.modalType;
export const getArePaymentDetailsComplete = (state) =>
  state.arePaymentDetailsComplete;
export const getIsCreating = (state) => state.billPaymentId === 'new';
export const getAreEmailsEnabled = (state) => state.areEmailsEnabled !== false;
export const getShouldSendRemittanceAdvice = (state) =>
  state.shouldSendRemittanceAdvice;
export const getRemittanceAdviceDetails = (state) =>
  state.remittanceAdviceDetails;
export const getRemittanceAdviceType = createSelector(
  (state) => state.remittanceAdviceType,
  getAreEmailsEnabled,
  (remittanceAdviceType, areEmailsEnabled) =>
    areEmailsEnabled ? remittanceAdviceType : remittanceAdviceTypes.export
);
export const getTemplateOptions = (state) => state.templateOptions;
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

export const getShouldDisableSupplier = createSelector(
  getIsCreating,
  getApplyPaymentToBillId,
  (isCreating, applyPaymentToBillId) => {
    return !isCreating || (isCreating && applyPaymentToBillId);
  }
);

export const getDefaultAccountId = createSelector(
  (state) => state.defaultAccountId,
  getElectronicClearingAccountId,
  getAccounts,
  (accountId, electronicClearingAccountId, accounts) =>
    accountId !== electronicClearingAccountId
      ? accountId
      : accounts.map((a) => a.id).find((id) => id !== accountId)
);

export const getElectronicPaymentUrl = createSelector(
  getRegion,
  getBusinessId,
  getElectronicPaymentId,
  (region, businessId, paymentId) =>
    `/#/${region}/${businessId}/electronicPayments/${paymentId}`
);

export const getIsElectronicPayment = createSelector(
  getAccountId,
  getElectronicClearingAccountId,
  (accountId, electronicClearingAccountId) =>
    accountId === electronicClearingAccountId
);

export const getCanDelete = createSelector(
  getIsCreating,
  getIsElectronicallyProcessed,
  (isCreating, isElectronicallyProcessed) =>
    !isCreating && !isElectronicallyProcessed
);

export const getShouldShowRemittanceAdviceModal = createSelector(
  getIsCreating,
  getShouldSendRemittanceAdvice,
  (isCreating, shouldSendRemittance) => !isCreating && shouldSendRemittance
);

export const getShouldShowAlertMessage = createSelector(
  getModalType,
  getAlertMessage,
  (modalType, alertMessage) =>
    modalType !== billPaymentModalTypes.remittanceAdvice && alertMessage.message
);

export const getBankStatementText = (state) => state.bankStatementText;

export const getIsBeforeStartOfFinancialYear = (state) => {
  const { startOfFinancialYearDate, date } = state;
  const issueDate = new Date(date);
  return (
    issueDate &&
    startOfFinancialYearDate &&
    isBefore(issueDate, new Date(startOfFinancialYearDate))
  );
};

const getShowElectronicPayments = createSelector(
  getRegion,
  (state) => state.isElectronicPaymentEnabled,
  (region, isElectronicPaymentEnabled) =>
    region === 'au' && isElectronicPaymentEnabled
);

export const getSupplierLink = createSelector(
  getBusinessId,
  getRegion,
  getSupplierId,
  (businessId, region, supplierId) =>
    `/#/${region}/${businessId}/contact/${supplierId}`
);

export const getRedirectUrl = createSelector(
  (state) => state.redirectUrl,
  getBusinessId,
  getRegion,
  getApplyPaymentToBillId,
  getIsCreating,
  (redirectUrl, businessId, region, billId, isCreating) => {
    if (redirectUrl) return redirectUrl;
    if (billId) return `/#/${region}/${businessId}/bill/${billId}`;
    if (isCreating) return `/#/${region}/${businessId}/bill`;
    return `/#/${region}/${businessId}/transactionList`;
  }
);

export const getShouldShowSupplierPopover = createSelector(
  getSupplierId,
  getShowElectronicPayments,
  getIsElectronicPayment,
  (supplierId, showElectronicPayments, isElectronicPayment) =>
    supplierId && showElectronicPayments && isElectronicPayment
);
export const getCanSendRemittanceAdvice = createSelector(
  getRemittanceAdviceDetails,
  getRemittanceAdviceType,
  (remittanceAdviceDetails, remittanceAdviceType) =>
    remittanceAdviceType !== remittanceAdviceTypes.email ||
    remittanceAdviceDetails.toAddresses.some((e) => e.includes('@'))
);

export const getBillPaymentOptions = createStructuredSelector({
  accounts: getAccounts,
  accountId: getAccountId,
  supplierId: getSupplierId,
  supplierName: getSupplierName,
  referenceId: getReferenceId,
  date: getDate,
  description: getDescription,
  shouldDisableSupplier: getShouldDisableSupplier,
  isCreating: getIsCreating,
  bankStatementText: getBankStatementText,
  isElectronicPayment: getIsElectronicPayment,
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear,
  showElectronicPayments: getShowElectronicPayments,
  shouldShowSupplierPopover: getShouldShowSupplierPopover,
  electronicPaymentReference: getElectronicPaymentReference,
  isSupplierLoading: getIsSupplierLoading,
});

export const getLoadSupplierDetailsUrlParams = createSelector(
  getBusinessId,
  getSupplierId,
  (businessId, supplierId) => ({
    businessId,
    supplierId,
  })
);

export const getLoadSupplierDetailsParams = createSelector(
  getShowPaidBills,
  (showPaidBills) => ({
    showPaidBills,
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

export const getIsTableLoading = createSelector(
  getIsSupplierLoading,
  (state) => state.isTableLoading,
  (isSupplierLoading, isTableLoading) => isSupplierLoading || isTableLoading
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
    bankStatementText: getIsElectronicPayment(state)
      ? getBankStatementText(state)
      : '',
    accountId: getAccountId(state),
    supplierId: getSupplierId(state),
    entries: getBillEntriesForCreatePayload(state),
    sendRemittanceAdvice: getShouldSendRemittanceAdvice(state),
  };
};

const getUpdateBillPaymentPayload = (state) => ({
  date: getDate(state),
  referenceId: getReferenceId(state),
  bankStatementText: getIsElectronicPayment(state)
    ? getBankStatementText(state)
    : '',
  description: getDescription(state),
  accountId: getAccountId(state),
});

export const getSaveBillPaymentPayload = (state) =>
  getIsCreating(state)
    ? getCreateBillPaymentPayload(state)
    : getUpdateBillPaymentPayload(state);

export const getLoadBillPaymentIntent = createSelector(
  getIsCreating,
  (isCreating) => (isCreating ? LOAD_NEW_BILL_PAYMENT : LOAD_BILL_PAYMENT)
);

export const getSaveBillPaymentIntent = createSelector(
  getIsCreating,
  (isCreating) => (isCreating ? CREATE_BILL_PAYMENT : UPDATE_BILL_PAYMENT)
);

export const getLoadBillPaymentUrlParams = createSelector(
  getBusinessId,
  getBillPaymentId,
  (businessId, billPaymentId) => ({
    businessId,
    billPaymentId,
  })
);

export const getLoadBillPaymentParams = createSelector(
  getIsCreating,
  getSupplierId,
  getShowPaidBills,
  (isCreating, supplierId, showPaidBills) => {
    if (supplierId && isCreating) return { supplierId, showPaidBills };
    if (supplierId) return { supplierId };
    return {};
  }
);

export const getRemittanceAdviceUrlParams = createSelector(
  getBusinessId,
  getBillPaymentId,
  (businessId, billPaymentId) => ({
    businessId,
    billPaymentId,
  })
);

export const getRemittanceAdviceEmailContent = createSelector(
  getBusinessId,
  getBillPaymentId,
  getSupplierName,
  getRemittanceAdviceDetails,
  (businessId, billPaymentId, supplierName, remittanceAdviceDetails) => ({
    ...remittanceAdviceDetails,
    supplierName,
    ccAddresses: remittanceAdviceDetails.ccAddresses.filter((e) => e.length),
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
