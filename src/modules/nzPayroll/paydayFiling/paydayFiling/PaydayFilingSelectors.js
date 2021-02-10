import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getAlert = (state) => state.alert;
export const getSelectedTab = (state) => state.tab;

export const getUrlParams = createSelector(getSelectedTab, (selectedTab) => ({
  tab: selectedTab,
}));

export const getIsBusinessOnboarded = (state) => state.isBusinessOnboarded;

export const getAreMultipleUsersOnboarded = (state) =>
  state.areMultipleUsersOnboarded;

export const isUserAuthorised = (state) =>
  state.userSession
    ? state.userSession.onboarded && state.userSession.validEhSession
    : false;

export const getUserStatusMessage = createSelector(
  isUserAuthorised,
  (isAuthorised) =>
    isAuthorised ? 'You have authorised MYOB' : 'You have not authorised MYOB'
);

export const getIsRemoveAuthorisationModalOpen = (state) =>
  state.removeAuthorisationModalIsOpen;

export const getUserGuid = (state) => state.userSession.userGuid;

export const getPaydayFilingUrl = (state) => {
  const businessId = getBusinessId(state);
  return `/#/nz/${businessId}/paydayFiling`;
};

export const getOnSuccessCallbackUrl = (state) => {
  const paydayFilingUrl = getPaydayFilingUrl(state);
  const successUrl = window.location.origin.concat(
    `${paydayFilingUrl}?authorisation=complete`
  );
  return btoa(successUrl);
};

export const isIrdAuthorisationComplete = (state) => {
  const authFragment = state.authorisation.split('complete#');
  return authFragment.length > 1 && authFragment[1].length > 0;
};
