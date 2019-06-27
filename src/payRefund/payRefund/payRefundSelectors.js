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

export const getAccounts = state => state.accounts;

export const getRefund = state => state.refund;
