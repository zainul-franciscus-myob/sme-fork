import { createSelector } from 'reselect';

const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getAlert = state => state.alert;
export const getIsOpen = state => state.isOpen;
export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getDisplayId = state => state.displayId;

export const getTitle = () => 'a title';

export const getJob = state => state.job;

export const getIsActionDisabled = createSelector(
  getIsSubmitting,
  getIsLoading,
  (isSubmitting, isLoading) => isSubmitting || isLoading,
);

export const getLoadNewJobModalUrlParams = state => ({
  businessId: getBusinessId(state),
});

export const getLoadNewJobModalQueryParams = state => ({
  region: getRegion(state),
});

export const getCreateJobModalUrlParams = state => ({
  businessId: getBusinessId(state),
});
