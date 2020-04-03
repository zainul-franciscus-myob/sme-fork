export const getEmployeeList = state => state.entries;
export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getIsTableEmpty = state => state.entries.length === 0;
