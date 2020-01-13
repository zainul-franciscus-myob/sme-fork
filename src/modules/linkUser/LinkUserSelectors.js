export const getLoadingState = state => state.loadingState;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getBusinessName = state => state.businessName;
export const getUserEmail = state => state.userEmail;
export const getUserId = state => state.userId;
export const getPassword = state => state.password;
export const getAlertMessage = state => state.alertMessage;
export const getRedirectURL = (state) => {
  const { redirectURL } = state;
  const defaultRoute = `#/${getRegion(state)}/${getBusinessId(state)}/transactionList`;
  return redirectURL || defaultRoute;
};

export const getContent = state => ({
  userId: getUserId(state),
  password: getPassword(state),
});
