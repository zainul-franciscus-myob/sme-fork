import { createSelector } from 'reselect';
import { isBefore } from 'date-fns';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getSupplierReturnId = (state) => state.supplierReturnId;
export const getRefundId = (state) => state.refundId;
export const getAlert = (state) => state.alert;
export const getIsCreating = (state) =>
  state.supplierReturnId && !state.refundId;
export const getLoadingState = (state) => state.loadingState;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getModalType = (state) => state.modalType;
export const getContactOptions = (state) => state.contactOptions;
export const getAccountOptions = (state) => state.accountOptions;
export const getRefund = (state) => state.refund;
const getReferenceId = (state) => state.refund.referenceId;
const getOriginalReferenceId = (state) => state.originalReferenceId;
const getStartOfFinancialYearDate = (state) => state.startOfFinancialYearDate;
const getDate = (state) => state.refund.date;

export const getTitle = createSelector(
  getIsCreating,
  getReferenceId,
  (isCreating, referenceId) =>
    isCreating
      ? 'Record supplier debit as refund'
      : `Supplier debit recorded as refund ${referenceId}`
);

export const getRefundForCreate = (state) => {
  const originalReferenceId = getOriginalReferenceId(state);
  const refund = getRefund(state);
  const { referenceId } = refund;

  return {
    ...refund,
    referenceId: referenceId !== originalReferenceId ? referenceId : undefined,
  };
};

export const getIsBeforeStartOfFinancialYear = createSelector(
  getDate,
  getStartOfFinancialYearDate,
  (date, startOfFinancialYearDate) =>
    date &&
    startOfFinancialYearDate &&
    isBefore(new Date(date), new Date(startOfFinancialYearDate))
);
