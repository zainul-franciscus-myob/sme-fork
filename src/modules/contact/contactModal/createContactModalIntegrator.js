import { CREATE_CONTACT_MODAL, LOAD_CONTACT_MODAL } from '../ContactIntents';
import {
  getContact,
  getCreateContactModalUrlParams,
  getLoadNewContactModalQueryParams,
  getLoadNewContactModalUrlParams,
} from './ContactModalSelectors';

const createContactModalIntegrator = (store, integration) => ({
  loadContactModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CONTACT_MODAL;
    const urlParams = getLoadNewContactModalUrlParams(state);
    const params = getLoadNewContactModalQueryParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  createContactModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = CREATE_CONTACT_MODAL;
    const urlParams = getCreateContactModalUrlParams(state);
    const content = getContact(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createContactModalIntegrator;
