import { createStructuredSelector } from 'reselect';

export const getJobId = state => state.jobId;

export const getIsCreating = state => state.jobId === 'new';

export const getAlertMessage = state => state.alertMessage;

export const getModalType = state => state.modalType;

export const getLoadingState = state => state.loadingState;

export const getRegion = state => state.region;

export const getJobDetails = createStructuredSelector({
  name: state => state.job.name,
  displayId: state => state.job.displayId,
  description: state => state.job.description,
  isActive: state => state.job.isActive,
  customerId: state => state.job.customerId,
  region: getRegion,
});

export const getDisplayId = createStructuredSelector({
  displayId: state => state.job.displayId,
});

export const getJobHeaderDetails = createStructuredSelector({
  isCreating: getIsCreating,
  title: state => state.readonly.title,
  status: state => state.readonly.status,
});

export const getJob = ({ job }) => ({
  ...job,
});

export const getIsActionsDisabled = state => state.isSubmitting;

export const isPageEdited = state => state.isPageEdited;

export const getBusinessId = state => state.businessId;
