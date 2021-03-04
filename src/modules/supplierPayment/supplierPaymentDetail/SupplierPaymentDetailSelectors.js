import { createSelector, createStructuredSelector } from 'reselect';
import { isBefore } from 'date-fns';

import {
  CREATE_SUPPLIER_PAYMENT,
  LOAD_NEW_SUPPLIER_PAYMENT,
  LOAD_SUPPLIER_PAYMENT,
  UPDATE_SUPPLIER_PAYMENT,
} from '../SupplierPaymentIntents';
import ContactType from '../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../contact/contactCombobox/types/DisplayMode';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import remittanceAdviceTypes from './remittanceAdviceTypes';
import supplierPaymentModalTypes from './supplierPaymentModalTypes';
import tableViewTypes from './tableViewTypes';

export const getAlertMessage = (state) => state.alertMessage;
export const getLoadingState = (state) => state.loadingState;
export const getIsSupplierLoading = (state) => state.isSupplierLoading;

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getSupplierPaymentId = (state) => state.supplierPaymentId;
export const getApplyPaymentToPurchaseId = (state) =>
  state.applyPaymentToPurchaseId;
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
export const getIsCreating = (state) => state.supplierPaymentId === 'new';
export const getAreEmailsEnabled = (state) => state.areEmailsEnabled !== false;
export const getShouldSendRemittanceAdvice = (state) =>
  state.shouldSendRemittanceAdvice;
export const getSendRemittanceAdviceNow = (state) =>
  state.sendRemittanceAdviceNow;
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
export const getIsPurchaseOrderFeatureEnabled = (state) =>
  state.isPurchaseOrderEnabled;

export const getTitle = createSelector(
  getIsCreating,
  getReferenceId,
  (isCreating, referenceId) =>
    isCreating
      ? 'Record payment to supplier'
      : `Payment to supplier ${referenceId}`
);

const calculateBalanceOwed = (purchaseAmount, discountAmount) =>
  Number(purchaseAmount) - Number(discountAmount);

const getEntries = (state) => state.entries;

const getEntryLink = (id, status, businessId, region) => {
  const url =
    status !== 'Order'
      ? `/#/${region}/${businessId}/bill/${id}`
      : `/#/${region}/${businessId}/purchaseOrder/${id}`;
  return url;
};

const getLabelColour = (status) =>
  ({
    Open: 'light-grey',
    Closed: 'green',
    Order: 'light-grey',
  }[status]);

const getOverAmount = (entry) => {
  if (!entry.paidAmount) return undefined;

  const balanceOwed = calculateBalanceOwed(
    entry.purchaseAmount,
    entry.discountAmount
  );
  const overAmount = Number(entry.paidAmount) - balanceOwed;
  return overAmount > 0 ? formatAmount(overAmount) : undefined;
};

export const getPurchaseEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      purchaseAmount: formatAmount(Number(entry.purchaseAmount)),
      balanceOwed: formatAmount(
        calculateBalanceOwed(entry.purchaseAmount, entry.discountAmount)
      ),
      overAmount: getOverAmount(entry),
      link: getEntryLink(entry.id, entry.status, businessId, region),
      labelColour: getLabelColour(entry.status),
    }))
);

export const getShouldDisableSupplier = createSelector(
  getIsCreating,
  getApplyPaymentToPurchaseId,
  (isCreating, applyPaymentToPurchaseId) => {
    return !isCreating || (isCreating && applyPaymentToPurchaseId);
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
    modalType !== supplierPaymentModalTypes.remittanceAdvice &&
    alertMessage.message
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
  (region) => region === 'au'
);

export const getSupplierLink = createSelector(
  getBusinessId,
  getRegion,
  getSupplierId,
  (businessId, region, supplierId) =>
    `/#/${region}/${businessId}/contact/${supplierId}`
);

// TODO Need add purchase order URL
export const getRedirectUrl = createSelector(
  (state) => state.redirectUrl,
  getBusinessId,
  getRegion,
  getApplyPaymentToPurchaseId,
  getIsCreating,
  (redirectUrl, businessId, region, purchaseId, isCreating) => {
    if (redirectUrl) return redirectUrl;
    if (purchaseId) return `/#/${region}/${businessId}/bill/${purchaseId}`;
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

export const getSupplierPaymentOptions = createStructuredSelector({
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

export const getLoadPaymentLinesParams = (state, paymentLineType) => ({
  showPaidBills: getShowPaidBills(state),
  paymentLineType,
});

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

const getPurchaseEntriesForCreatePayload = (state) =>
  state.entries
    .filter((entry) => hasAmountPaidApplied(entry.paidAmount))
    .map((entry) => {
      const entryPayload = {
        paidAmount: entry.paidAmount,
        discountAmount: entry.discountAmount,
      };

      if (entry.status === 'Order') {
        entryPayload.purchaseOrderId = entry.id;
      } else {
        entryPayload.billId = entry.id;
      }
      return entryPayload;
    });

const getOriginalReferenceId = (state) => state.originalReferenceId;

const getCreateSupplierPaymentPayload = (state) => {
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
    entries: getPurchaseEntriesForCreatePayload(state),
    sendRemittanceAdvice: getShouldSendRemittanceAdvice(state),
  };
};

const getUpdateSupplierPaymentPayload = (state) => ({
  date: getDate(state),
  referenceId: getReferenceId(state),
  bankStatementText: getIsElectronicPayment(state)
    ? getBankStatementText(state)
    : '',
  description: getDescription(state),
  accountId: getAccountId(state),
});

export const getSaveSupplierPaymentPayload = (state) =>
  getIsCreating(state)
    ? getCreateSupplierPaymentPayload(state)
    : getUpdateSupplierPaymentPayload(state);

export const getLoadSupplierPaymentIntent = createSelector(
  getIsCreating,
  (isCreating) =>
    isCreating ? LOAD_NEW_SUPPLIER_PAYMENT : LOAD_SUPPLIER_PAYMENT
);

export const getSaveSupplierPaymentIntent = createSelector(
  getIsCreating,
  (isCreating) =>
    isCreating ? CREATE_SUPPLIER_PAYMENT : UPDATE_SUPPLIER_PAYMENT
);

export const getLoadSupplierPaymentUrlParams = createSelector(
  getBusinessId,
  getSupplierPaymentId,
  (businessId, supplierPaymentId) => ({
    businessId,
    supplierPaymentId,
  })
);

export const getLoadSupplierPaymentParams = createSelector(
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
  getSupplierPaymentId,
  (businessId, supplierPaymentId) => ({
    businessId,
    supplierPaymentId,
  })
);

export const getRemittanceAdviceEmailContent = createSelector(
  getBusinessId,
  getSupplierPaymentId,
  getSupplierName,
  getRemittanceAdviceDetails,
  (businessId, supplierPaymentId, supplierName, remittanceAdviceDetails) => ({
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
