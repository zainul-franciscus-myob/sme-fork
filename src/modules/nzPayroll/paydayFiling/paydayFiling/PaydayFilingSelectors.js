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
  state.userSession.onboarded && state.userSession.validEhSession;

export const getUserStatusMessage = createSelector(
  isUserAuthorised,
  (isAuthorised) =>
    isAuthorised ? 'You have authorised MYOB' : 'You have not authorised MYOB'
);

export const getIsRemoveAuthorisationModalOpen = (state) =>
  state.removeAuthorisationModalIsOpen;

export const getUserGuid = (state) => state.userSession.userGuid;
