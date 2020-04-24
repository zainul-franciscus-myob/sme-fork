import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  LOAD_ABN_VALIDATION_RESULT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_DETAIL,
  LOAD_NEW_CONTACT,
  UPDATE_CONTACT,
} from '../ContactIntents';
import {
  getBusinessId, getContact, getContactId, getLoadAddedAccountUrlParams, getRegion,
} from './contactDetailSelectors';

const createContactDetailIntegrator = (store, integration) => ({
  loadNewContact: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    const params = {
      region: getRegion(store.getState()),
    };

    integration.read({
      intent: LOAD_NEW_CONTACT,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadContactDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getContactId(state),
    };

    integration.read({
      intent: LOAD_CONTACT_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deleteContact: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getContactId(state),
    };

    integration.read({
      intent: DELETE_CONTACT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  updateContact: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const content = getContact(state);
    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getContactId(state),
    };
    integration.write({
      intent: UPDATE_CONTACT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  createContact: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const content = getContact(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    integration.write({
      intent: CREATE_CONTACT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  validateAbn: ({ abn, onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
      abn,
    };

    integration.read({
      intent: LOAD_ABN_VALIDATION_RESULT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createContactDetailIntegrator;
