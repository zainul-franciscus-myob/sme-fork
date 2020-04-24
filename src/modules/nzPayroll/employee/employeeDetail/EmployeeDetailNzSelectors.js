import { createSelector } from 'reselect';

const getContactDetail = state => state.contactDetail;

export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getEmployeeId = state => state.employeeId;
export const getEmployeeFullName = createSelector(
  getContactDetail,
  contactDetail => `${contactDetail.firstName} ${contactDetail.lastName}`,
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
