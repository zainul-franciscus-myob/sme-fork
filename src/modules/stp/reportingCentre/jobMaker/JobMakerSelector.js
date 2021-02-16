export const getLoadingState = (state) => state.loadingState;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getBusinessId = (state) => state.businessId;

export const getCurrentPayrollYearLabel = (state) =>
  state.currentPayrollYearLabel;

export const getCurrentPeriodDetails = (state) => state.currentPeriodDetails;
export const getIsShowingJobMakerActionModal = (state) =>
  state.isShowingJobMakerActionModal;
export const getEmployees = (state) => state.employees;
export const getEventId = (state) => state.eventId;
export const getDropdownActionEmployee = (state) =>
  state.dropDownActionEmployee;
export const getDropdownAction = (state) => state.dropDownAction;
export const getCreateJobMakerEmployeeActionContent = (state) => ({
  eventId: getEventId(state),
  employeeId: getDropdownActionEmployee(state)?.employeeId,
  action: getDropdownAction(state),
});
