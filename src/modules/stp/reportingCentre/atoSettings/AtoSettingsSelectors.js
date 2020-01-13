import { createSelector } from 'reselect';

import States from '../../common/States';

export const getLoadingState = state => state.loadingState;
export const getIsModalOpen = state => state.isModalOpen;
export const getBusinessDetails = state => state.businessDetails;
export const getBusinessContact = state => state.businessContact;
export const getAgentContact = state => state.agentContact;
export const getBusinessConnection = state => state.businessConnection;
export const getIsAgent = state => !!state.agentDetails;

export const getAgentDetails = state => (state.agentDetails ? state.agentDetails : {});
export const getShowCountryField = state => (state.businessDetails.state === States.OTH);

export const getUpdateBusinessDetailsContent = createSelector(
  getBusinessDetails,
  businessDetails => ({
    businessName: businessDetails.businessName,
    abnWpn: businessDetails.abn,
    abnBranch: businessDetails.branch,
    streetAddress1: businessDetails.address1,
    streetAddress2: businessDetails.address2,
    city: businessDetails.city,
    state: businessDetails.state,
    postcode: businessDetails.postcode,
    country: businessDetails.state === States.OTH ? businessDetails.country : null,
  }),
);

export const getUpdateBusinessContactContent = createSelector(
  getBusinessContact,
  contact => ({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  }),
);

export const getUpdateAgentContactContent = createSelector(
  getAgentContact,
  getAgentDetails,
  (contact, details) => ({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    agentAbn: details.agentAbn,
    agentNumber: details.agentNumber,
  }),
);
