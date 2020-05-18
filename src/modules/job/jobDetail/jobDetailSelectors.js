import { createStructuredSelector } from 'reselect';

export const getBusinessId = state => state.businessId;

export const getJobId = state => state.jobId;

export const getIsCreating = state => state.jobId === 'new';

export const getAlertMessage = state => state.alertMessage;

export const getModal = state => state.modal;

export const getLoadingState = state => state.loadingState;

export const getPageTitle = state => state.pageTitle;

export const getIsCustomerLoading = state => state.isCustomerLoading;

export const getCustomerOptions = state => state.customerOptions;

export const getRegion = state => state.region;

export const getIsJobEnabled = state => state.isJobEnabled;

export const getJobDetails = createStructuredSelector({
  name: state => state.job.name,
  number: state => state.job.number,
  description: state => state.job.description,
  isInactive: state => state.job.isInactive,
  customerId: state => state.job.customerId,
  isCustomerDisabled: getIsCustomerLoading,
  isHeader: state => state.job.isHeader,
});

export const getJobHeaderDetails = createStructuredSelector({
  isCreating: getIsCreating,
  title: state => state.readonly.title,
  status: state => state.readonly.status,
});

export const getCustomerModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region, contactType: 'Customer' };
};

export const getLoadAddedCustomerUrlParams = (state, customerId) => {
  const businessId = getBusinessId(state);

  return { businessId, customerId };
};

export const getUpdatedCustomerOptions = (state, updatedOption) => {
  const customerOptions = getCustomerOptions(state);

  return [updatedOption, ...customerOptions];
};

export const getIsActionsDisabled = state => state.isSubmitting;

export const isPageEdited = state => state.isPageEdited;
