export const getLoadingState = (state) => state.loadingState;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getBusinessName = (state) => state.businessName;
export const getUserEmail = (state) => state.userEmail;
export const getUserId = (state) => state.userId;
export const getPassword = (state) => state.password;
export const getAlertMessage = (state) => state.alertMessage;

const getShouldRedirect = (url) => {
  try {
    const { hash } = new URL(url);
    const params = hash.split('/');
    return params.filter((param) => param.startsWith('error')).length === 0;
  } catch (e) {
    return false;
  }
};

export const getRedirectURL = (state) => {
  const { redirectURL } = state;
  const defaultRoute = `#/${getRegion(state)}/${getBusinessId(
    state
  )}/dashboard`;

  return redirectURL && getShouldRedirect(redirectURL)
    ? redirectURL
    : defaultRoute;
};

export const getContent = (state) => ({
  userId: getUserId(state),
  password: getPassword(state),
});
