import Role from './Role';

export const getCurrentStepIndex = state => state.currentStepIndex;
export const getSelectedAgentRole = state => state.selectedAgentRole;
export const getAgentRoleSelected = state => (
  state.selectedAgentRole !== Role.SOMEONE_FROM_THE_BUSINESS);
export const getBusinessId = state => state.businessId;
export const getStpReportingCentreUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/stp/reportingCentre`;
};
