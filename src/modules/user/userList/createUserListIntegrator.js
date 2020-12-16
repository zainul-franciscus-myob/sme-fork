import {
  CANCEL_INVITATION,
  LOAD_USER_LIST,
  REMOVE_USER_ACCESS,
  RESEND_INVITATION,
} from '../UserIntents';
import {
  getBusinessId,
  getCancelInvitationDetails,
  getFilterOptions,
  getRemoveAccessDetails,
  getResendInvitationDetails,
} from './userListSelectors';

const createUserListIntegrator = (store, integration) => ({
  loadUserList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = {
      ...getFilterOptions(state),
    };

    integration.read({
      intent: LOAD_USER_LIST,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  resendInvitation: ({ onSuccess, onFailure, userIndex }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getResendInvitationDetails(state, userIndex);

    integration.write({
      intent: RESEND_INVITATION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  cancelInvitation: ({ onSuccess, onFailure, userIndex }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getCancelInvitationDetails(state, userIndex);

    integration.write({
      intent: CANCEL_INVITATION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  removeAccess: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getRemoveAccessDetails(state);

    integration.write({
      intent: REMOVE_USER_ACCESS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createUserListIntegrator;
