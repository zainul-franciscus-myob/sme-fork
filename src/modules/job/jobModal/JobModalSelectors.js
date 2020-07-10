import { createSelector } from 'reselect';

export const getAlertMessage = (state) => state.alertMessage;

export const getIsLoading = (state) => state.isLoading;

export const getJob = (state) => state.detail;
export const getJobNumber = (state) => state.detail.number;
export const getJobName = (state) => state.detail.name;
export const getCustomerOptions = (state) => state.customerOptions;
export const getIsInactive = (state) => state.detail.isInactive;
export const getJobDescription = (state) => state.detail.jobDescription;

export const getCustomerId = (state) => state.detail.customerId;

export const getBusinessId = (state) => state.businessId;

export const getIsOpen = (state) => state.isOpen;

export const getIsSubmitting = (state) => state.isSubmitting;

export const getIsActionDisabled = createSelector(
  getIsSubmitting,
  getIsLoading,
  (isSubmitting, isLoading) => isSubmitting || isLoading
);
