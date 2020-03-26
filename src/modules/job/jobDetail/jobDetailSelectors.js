import { createStructuredSelector } from 'reselect';

export const getJobId = state => state.jobId;

export const getIsCreating = state => state.jobId === 'new';

export const getAlertMessage = state => state.alertMessage;

export const getModal = state => state.modal;

export const getLoadingState = state => state.loadingState;

export const getPageTitle = state => state.pageTitle;

export const getCustomerOptions = state => state.customerOptions;

export const getRegion = state => state.region;

export const getJobDetails = createStructuredSelector({
  name: state => state.job.name,
  number: state => state.job.number,
  description: state => state.job.description,
  isInactive: state => state.job.isInactive,
  customerId: state => state.job.customerId,
  isHeader: state => state.job.isHeader,
});

export const getJobHeaderDetails = createStructuredSelector({
  isCreating: getIsCreating,
  title: state => state.readonly.title,
  status: state => state.readonly.status,
});

export const getIsActionsDisabled = state => state.isSubmitting;

export const isPageEdited = state => state.isPageEdited;

export const getBusinessId = state => state.businessId;
