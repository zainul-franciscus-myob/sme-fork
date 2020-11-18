import { createSelector, createStructuredSelector } from 'reselect';
import { isBefore } from 'date-fns';

import {
  getAmountDue,
  getBillId,
  getBillNumber,
  getBusinessId,
  getRegion,
  getSupplierId,
} from './billSelectors';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatDate from '../../../../common/valueFormatters/formatDate/formatDate';

const getAccounts = (state) => state.recordBillPayment.accounts;
const getAccountId = (state) => state.recordBillPayment.accountId;
const getBankStatementText = (state) =>
  state.recordBillPayment.bankStatementText;
const getDescription = (state) => state.recordBillPayment.description;
const getElectronicClearingAccountId = (state) =>
  state.recordBillPayment.electronicClearingAccountId;
export const getBillPaymentId = (state) =>
  state.recordBillPayment.billPaymentId;

export const getIsBeforeStartOfFinancialYear = (state) => {
  const { startOfFinancialYearDate, paymentDate } = state.recordBillPayment;
  const issueDate = new Date(paymentDate);
  return (
    issueDate &&
    startOfFinancialYearDate &&
    isBefore(issueDate, new Date(startOfFinancialYearDate))
  );
};

export const getIsElectronicPayment = createSelector(
  getAccountId,
  getElectronicClearingAccountId,
  (accountId, electronicClearingAccountId) =>
    accountId === electronicClearingAccountId
);

export const getArePaymentDetailsComplete = (state) =>
  state.recordBillPayment.arePaymentDetailsComplete;

const getPaymentDate = (state) => state.recordBillPayment.paymentDate;

const getReferenceId = (state) => state.recordBillPayment.referenceId;

const getPaidAmount = (state) => state.recordBillPayment.paidAmount;

const getDiscountAmount = (state) => state.recordBillPayment.discountAmount;

export const getIsActionsDisabled = (state) =>
  state.recordBillPayment.isSubmitting;

export const getRedirectUrl = (state) => state.redirectUrl;

const calculateDiscountedBalance = (billAmount, discountAmount) =>
  Number(billAmount) - Number(discountAmount);

const getOverAmount = createSelector(
  getAmountDue,
  getPaidAmount,
  getDiscountAmount,
  (billAmount, paidAmount, discountAmount) => {
    if (!paidAmount) return undefined;

    const discountedBalance = calculateDiscountedBalance(
      billAmount,
      discountAmount
    );
    const overAmount = Number(paidAmount) - discountedBalance;
    return overAmount > 0 ? formatAmount(overAmount) : undefined;
  }
);

const getDiscountedBalance = createSelector(
  getAmountDue,
  getDiscountAmount,
  (billAmount, discountAmount) =>
    calculateDiscountedBalance(billAmount, discountAmount)
);

const getShowElectronicPayments = createSelector(
  getRegion,
  (region) => region === 'au'
);

export const getShouldShowSupplierPopover = createSelector(
  getSupplierId,
  getShowElectronicPayments,
  getIsElectronicPayment,
  (supplierId, showElectronicPayments, isElectronicPayment) =>
    supplierId && showElectronicPayments && isElectronicPayment
);

const getSupplierName = (state) => state.recordBillPayment.supplierName;

const getIssueDate = (state) => formatDate(state.bill.issueDate, 'dd/MM/yyyy');

export const getAlert = (state) => state.recordBillPayment.alert;
export const getIsPaymentModalLoading = (state) =>
  state.recordBillPayment.isModalLoading;

export const getIsAmountPaidApplied = createSelector(
  getPaidAmount,
  (paidAmount) => {
    return paidAmount && paidAmount.length > 0 && paidAmount !== '0.00';
  }
);

const getBillEntriesForCreatePayload = createSelector(
  getBillId,
  getPaidAmount,
  getDiscountAmount,
  getIsAmountPaidApplied,
  (billId, paidAmount, discountAmount, isAmountPaidApplied) => {
    if (!isAmountPaidApplied) {
      return [];
    }
    return [
      {
        paidAmount,
        id: billId,
        discountAmount,
      },
    ];
  }
);

const getOriginalReferenceId = (state) =>
  state.recordBillPayment.originalReferenceId;

export const getCreateBillPaymentPayload = (state) => {
  const originalReferenceId = getOriginalReferenceId(state);
  const referenceId = getReferenceId(state);

  return {
    date: getPaymentDate(state),
    referenceId: referenceId === originalReferenceId ? undefined : referenceId,
    description: getDescription(state),
    bankStatementText: getIsElectronicPayment(state)
      ? getBankStatementText(state)
      : '',
    accountId: getAccountId(state),
    supplierId: getSupplierId(state),
    entries: getBillEntriesForCreatePayload(state),
    sendRemittanceAdvice: false,
  };
};

export const getBillPaymentOptions = createStructuredSelector({
  accounts: getAccounts,
  accountId: getAccountId,
  balanceDue: getAmountDue,
  billNumber: getBillNumber,
  description: getDescription,
  issueDate: getIssueDate,
  supplierId: getSupplierId,
  referenceId: getReferenceId,
  paidAmount: getPaidAmount,
  discountedBalance: getDiscountedBalance,
  overAmount: getOverAmount,
  discountAmount: getDiscountAmount,
  paymentDate: getPaymentDate,
  isElectronicPayment: getIsElectronicPayment,
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear,
  showElectronicPayments: getShowElectronicPayments,
  shouldShowSupplierPopover: getShouldShowSupplierPopover,
  supplierName: getSupplierName,
});

export const getDefaultAccountId = createSelector(
  (state) => state.recordBillPayment.defaultAccountId,
  getElectronicClearingAccountId,
  getAccounts,
  (accountId, electronicClearingAccountId, accounts) =>
    accountId !== electronicClearingAccountId
      ? accountId
      : accounts.map((a) => a.id).find((id) => id !== accountId)
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

export const getLoadBillPaymentUrlParams = createSelector(
  getBusinessId,
  getBillPaymentId,
  (businessId, billPaymentId) => ({
    businessId,
    billPaymentId,
  })
);

export const getLoadBillPaymentParams = createSelector(
  getSupplierId,
  (supplierId) => (supplierId ? { supplierId } : {})
);
