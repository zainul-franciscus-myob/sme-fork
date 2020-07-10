import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getAlert = (state) => state.alert;
export const getSelectedTab = (state) => state.tab;
export const getPayrollIsSetUp = (state) => state.payrollIsSetUp;
export const getPayrollSettingsLink = (state) =>
  `/#/${state.region}/${state.businessId}/payrollSettings?tab=general`;

export const getUrlParams = createSelector(getSelectedTab, (selectedTab) => ({
  tab: selectedTab,
}));

export const getRegistrationUrl = (state) => {
  const { region, businessId } = state;
  return `/#/${region}/${businessId}/stp/getStarted`;
};

export const getAgentDetails = (state) => {
  const { agentAbn, agentNumber } = state;

  return agentAbn && agentNumber
    ? {
        agentDetails: {
          agentAbn,
          agentNumber,
        },
      }
    : null;
};
