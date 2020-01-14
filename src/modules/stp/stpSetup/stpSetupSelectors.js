import { createSelector } from 'reselect';

import Role from './Role';

export const getCurrentStepIndex = state => state.currentStepIndex;
export const getSelectedAgentRole = state => state.selectedAgentRole;
export const getAgentRoleSelected = state => (
  state.selectedAgentRole !== Role.SOMEONE_FROM_THE_BUSINESS);
export const getAgentNumber = state => state.agentNumber;
export const getAgentAbn = state => state.agentAbn;
export const getBusinessId = state => state.businessId;
export const getStpReportingCentreUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/stp/reportingCentre`;
};
export const getPayerAbn = state => state.payerAbn;
export const getSoftwareIdParams = createSelector(
  getAgentRoleSelected,
  getAgentAbn,
  getPayerAbn,
  (isAgent, agentAbn, payerAbn) => (isAgent ? {
    agentAbn,
  } : {
    payerAbn,
  }),
);
