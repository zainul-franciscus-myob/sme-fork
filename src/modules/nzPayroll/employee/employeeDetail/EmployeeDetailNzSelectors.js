import { createSelector } from 'reselect';

const getContactDetail = (state) => state.contactDetail;
const getPayrollDetails = ({ payrollDetails }) => payrollDetails;

export const getAlert = (state) => state.userInterface?.alert;
export const getLoadingState = (state) => state.userInterface?.loadingState;
export const isPageEdited = (state) => state.userInterface?.isPageEdited;
export const getIsSubmitting = (state) => state.userInterface?.isSubmitting;
export const getModal = (state) => state.userInterface?.modal;
export const getModalUrl = createSelector(getModal, (modal = {}) => modal.url);

export const getBusinessId = (state) => state.businessId;
export const getEmployeeId = (state) => state.employeeId;
export const getRegion = (state) => state.region;
export const getIsCreating = (state) => state.employeeId === 'new';

export const getEmployeeFullName = createSelector(
  getContactDetail,
  getIsCreating,
  (contactDetail, isCreating) =>
    isCreating
      ? 'Create employee'
      : `${contactDetail.firstName} ${contactDetail.lastName}`
);

export const getEmployeePayload = createSelector(
  getContactDetail,
  getPayrollDetails,
  (contactDetail, payrollDetails) => ({ contactDetail, payrollDetails })
);

export const getEmployeeListUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/employee`
);

export const getMainTab = (state) => state.userInterface.mainTab;
const getSubTabs = (state) => state.userInterface.subTabs;
export const getCurrentSubTab = createSelector(
  getMainTab,
  getSubTabs,
  (mainTab, subTabs) => subTabs[mainTab]
);

export const getURLParams = createSelector(
  getMainTab,
  getCurrentSubTab,
  (mainTab, subTab) => ({ mainTab, subTab })
);
