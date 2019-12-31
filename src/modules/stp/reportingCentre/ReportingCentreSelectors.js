import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getAlert = state => state.alert;
export const getSelectedTab = state => state.tab;

export const getUrlParams = createSelector(
  getSelectedTab,
  selectedTab => ({
    tab: selectedTab,
  }),
);

export const getRegistrationUrl = (state) => {
  const { region, businessId } = state;
  return `/#/${region}/${businessId}/stp/getStarted`;
};
