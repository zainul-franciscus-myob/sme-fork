import { CREATE_USER, DELETE_USER, UPDATE_USER } from '../UserIntents';
import {
  getBusinessId,
  getIsCreating,
  getLoadUserIntent,
  getUserForCreate,
  getUserForUpdate,
  getUserId,
} from './userDetailSelectors';

const createUserDetailIntegrator = (store, integration) => ({
  loadUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const userId = getUserId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      ...(!getIsCreating(state) && { userId }),
    };

    integration.read({
      intent: getLoadUserIntent(state),
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  createUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: CREATE_USER,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: getUserForCreate(state),
      onSuccess,
      onFailure,
    });
  },
  updateUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: UPDATE_USER,
      urlParams: {
        businessId: getBusinessId(state),
        userId: getUserId(state),
      },
      content: getUserForUpdate(state),
      onSuccess,
      onFailure,
    });
  },
  deleteUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: DELETE_USER,
      urlParams: {
        businessId: getBusinessId(state),
        userId: getUserId(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createUserDetailIntegrator;
