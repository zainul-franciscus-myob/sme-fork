import { createSelector } from 'reselect';

const getContactDetail = state => state.contactDetail;
const getPayrollDetails = ({ payrollDetails }) => payrollDetails;

export const getAlert = state => state.alert;
export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getEmployeeId = state => state.employeeId;
export const getRegion = state => state.region;
export const isPageEdited = state => state.isPageEdited;
export const getModal = state => state.modal;
export const getModalUrl = createSelector(getModal, (modal = {}) => modal.url);
export const getIsSubmitting = state => state.isSubmitting;
export const getIsCreating = state => state.employeeId === 'new';


export const getEmployeeFullName = createSelector(
  getContactDetail,
  getIsCreating,
  (contactDetail, isCreating) => (isCreating ? 'Create employee'
    : `${contactDetail.firstName} ${contactDetail.lastName}`),
);

export const getEmployeePayload = createSelector(
  getContactDetail,
  getPayrollDetails,
  (contactDetail, payrollDetails) => ({ contactDetail, payrollDetails }),
);

export const getEmployeeListUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/employee`,
);

export const getMainTab = state => state.tabs.main;
const getSubTabs = state => state.tabs.subTabs;
export const getCurrentSubTab = createSelector(
  getMainTab,
  getSubTabs,
  (mainTab, subTabs) => subTabs[mainTab],
);

export const getURLParams = createSelector(
  getMainTab,
  getCurrentSubTab,
  (mainTab, subTab) => ({ mainTab, subTab }),
);
