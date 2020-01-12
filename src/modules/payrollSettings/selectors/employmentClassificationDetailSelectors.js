import { getBusinessId } from './payrollSettingsSelectors';

export const getTitle = state => (state.employmentClassificationDetail.isCreating ? 'Create classification' : 'Edit classification');
export const getDescription = state => state.employmentClassificationDetail.description;
export const getAlert = state => state.employmentClassificationDetail.alert;
export const getIsCreating = state => state.employmentClassificationDetail.id === undefined;
export const getIsLoading = state => state.employmentClassificationDetail.isLoading;
export const getIsSubmitting = state => state.employmentClassificationDetail.isSubmitting;

export const getNewEmploymentClassificationUrlParams = state => ({
  businessId: getBusinessId(state),
});
export const getEmploymentClassificationUrlParams = state => ({
  businessId: getBusinessId(state),
  employmentClassificationId: state.employmentClassificationDetail.id,
});
export const getSaveEmploymentClassificationContent = state => ({
  description: state.employmentClassificationDetail.description,
});
