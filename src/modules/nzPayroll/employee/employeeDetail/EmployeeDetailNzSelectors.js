import { createSelector } from 'reselect';

const getPersonalDetail = (state) => state.personalDetail;
const getPayrollDetails = ({ payrollDetails }) => payrollDetails;

export const getAlert = (state) => state.alert;
export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getEmployeeId = (state) => state.employeeId;
export const getRegion = (state) => state.region;
export const isPageEdited = (state) => state.isPageEdited;
export const getModal = (state) => state.modal;
export const getModalUrl = createSelector(getModal, (modal = {}) => modal.url);
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsCreating = (state) => state.employeeId === 'new';

export const getEmployeeFullName = createSelector(
  getPersonalDetail,
  getIsCreating,
  (personalDetail, isCreating) =>
    isCreating
      ? 'Create employee'
      : `${personalDetail.firstName} ${personalDetail.lastName}`
);

export const getEmployeePayload = createSelector(
  getPersonalDetail,
  getPayrollDetails,
  (personalDetail, payrollDetails) => ({ personalDetail, payrollDetails })
);

export const getEmployeeListUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/employee`
);

export const getMainTab = (state) => state.tabs.main;

export const getURLParams = createSelector(getMainTab, (mainTab) => ({
  mainTab,
}));
