import { createSelector } from 'reselect';

const getContactDetail = state => state.contactDetail;

export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getEmployeeId = state => state.employeeId;
export const getEmployeeFullName = createSelector(
  getContactDetail,
  contactDetail => `${contactDetail.firstName} ${contactDetail.lastName}`,
);
