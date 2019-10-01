export const getIsLoading = state => state.isLoading;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getBusinessName = state => state.businessName;
export const getUserEmail = state => state.userEmail;
export const getAlertMessage = state => state.alertMessage;
export const getRedirectURL = (state) => {
  const { redirectURL } = state;
  const defaultRoute = `#/${getRegion(state)}/${getBusinessId(state)}/transactionList`;
  return redirectURL || defaultRoute;
};

export const getContent = state => ({
  userId: state.userId,
  password: state.password,
});
