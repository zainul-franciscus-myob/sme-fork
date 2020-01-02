import { tabIds } from '../TabItems';

export const getIsLoading = state => state[tabIds.atoSettings].isLoading;
export const getIsModalOpen = state => state[tabIds.atoSettings].isModalOpen;

export const getBusinessContact = state => state[tabIds.atoSettings].businessContact;
export const getBusinessConnection = state => state[tabIds.atoSettings].businessConnection;
