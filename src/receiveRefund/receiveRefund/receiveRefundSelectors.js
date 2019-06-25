export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getSupplierReturnId = state => state.supplierReturnId;

export const getRefundId = state => state.refundId;

export const getAlert = state => state.alert;

export const getIsCreating = state => (state.supplierReturnId && !state.refundId);

export const getIsLoading = state => state.isLoading;

export const getIsSubmitting = state => state.isSubmitting;

export const getIsPageEdited = state => state.isPageEdited;

export const getModalType = state => state.modalType;

export const getAccounts = state => state.accounts;

export const getRefund = state => state.refund;
