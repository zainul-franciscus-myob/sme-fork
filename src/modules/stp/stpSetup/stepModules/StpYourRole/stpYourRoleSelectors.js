import Role from './Role';

export const getBusinessId = state => state.businessId;
export const getRole = state => state.role;
export const getAgentNumber = state => state.agentNumber;
export const getAgentAbn = state => state.agentAbn;
export const getFirstName = state => state.firstName;
export const getLastName = state => state.lastName;
export const getEmail = state => state.email;
export const getPhone = state => state.phone;
export const getShowContactDetails = state => state.showContactDetails;
export const getShowAlert = state => state.showAlert;
export const getErrorMessage = state => state.errorMessage;
export const getAgentRoleSelected = state => getRole(state) !== Role.SOMEONE_FROM_THE_BUSINESS;
