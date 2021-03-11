export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getIsOnlineOnly = (state) => state.isOnlineOnly;
export const getReason = (state) => state.reason;
export const getUpdateFileSuccess = (state) => state.updateFileSuccess;
export const getIsPolling = (state) => state.isPolling;
export const getDashboardURL = (state) =>
  `${getRegion(state)}/${getBusinessId(state)}/dashboard`;
