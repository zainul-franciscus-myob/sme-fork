import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getAlert = (state) => state.alert;
export const getSelectedTab = (state) => state.tab;

export const getUrlParams = createSelector(getSelectedTab, (selectedTab) => ({
  tab: selectedTab,
}));

export const getOnboardingPageUrl = (state) => {
  const { region, businessId } = state;
  return `/#/${region}/${businessId}/paydayFiling/onboarding`;
};
