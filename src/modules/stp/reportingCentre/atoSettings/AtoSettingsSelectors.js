import { createSelector } from 'reselect';

import { tabIds } from '../TabItems';

export const getIsLoading = state => state[tabIds.atoSettings].isLoading;
export const getIsModalOpen = state => state[tabIds.atoSettings].isModalOpen;

export const getBusinessContact = state => state[tabIds.atoSettings].businessContact;
export const getBusinessConnection = state => state[tabIds.atoSettings].businessConnection;

export const getUpdateBusinessContactContent = createSelector(
  getBusinessContact,
  contact => ({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  }),
);
