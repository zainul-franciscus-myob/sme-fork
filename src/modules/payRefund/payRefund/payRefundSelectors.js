import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getCustomerReturnId = state => state.customerReturnId;

export const getRefundId = state => state.refundId;

export const getAlert = state => state.alert;

export const getIsCreating = state => (state.customerReturnId && !state.refundId);

export const getIsLoading = state => state.isLoading;

export const getIsSubmitting = state => state.isSubmitting;

export const getIsPageEdited = state => state.isPageEdited;

export const getModalType = state => state.modalType;

export const getContactOptions = state => state.contactOptions;

export const getAccountOptions = state => state.accountOptions;

export const getRefund = state => state.refund;

const getReferenceId = state => state.refund.referenceId;

export const getTitle = createSelector(
  getIsCreating, getReferenceId,
  (isCreating, referenceId) => (
    isCreating
      ? 'Record customer credit as refund'
      : `Customer credit recorded as refund ${referenceId}`
  ),
);

export const isReferenceIdDirty = (state) => {
  const { referenceId, originalReferenceId } = getRefund(state);
  return referenceId !== originalReferenceId;
};
