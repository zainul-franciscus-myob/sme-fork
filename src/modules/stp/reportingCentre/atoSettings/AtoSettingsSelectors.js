import { createSelector } from 'reselect';

export const getLoadingState = state => state.loadingState;
export const getIsModalOpen = state => state.isModalOpen;
export const getBusinessContact = state => state.businessContact;
export const getBusinessConnection = state => state.businessConnection;

export const getUpdateBusinessContactContent = createSelector(
  getBusinessContact,
  contact => ({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  }),
);
