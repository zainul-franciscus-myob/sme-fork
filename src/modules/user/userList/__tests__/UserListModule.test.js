import {
  CANCEL_INVITATION,
  LOAD_USER_LIST,
  RESEND_INVITATION,
  SET_ALERT,
  SET_LOADING_STATE,
} from '../../UserIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import UserListModule from '../UserListModule';
import userListReducer from '../userListReducer';

describe('UserListModule', () => {
  const setup = () => {
    const setRootView = () => {};
    const popMessages = () => [];
    const store = new TestStore(userListReducer);
    const integration = new TestIntegration();

    const module = new UserListModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;

    return {
      store,
      module,
      integration,
    };
  };

  describe('run', () => {
    it('successfully load', () => {
      const { store, integration, module } = setup();
      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_USER_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);
    });
  });

  describe('resend invitation', () => {
    it('successfully sent', () => {
      const { store, integration, module } = setup();
      module.resendInvitation(0);

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: "Great Work! You've done it well!",
          },
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: RESEND_INVITATION,
        }),
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);
    });

    it('failed to send', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(RESEND_INVITATION);
      module.resendInvitation(0);

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: RESEND_INVITATION,
        }),
      ]);
    });
  });

  describe('cancel invitation', () => {
    it('successfully cancelled', () => {
      const { store, integration, module } = setup();
      module.cancelInvitation(0);

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: "Great Work! You've done it well!",
          },
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CANCEL_INVITATION,
        }),
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);
    });

    it('failed to cancel', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(CANCEL_INVITATION);
      module.cancelInvitation(0);

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CANCEL_INVITATION,
        }),
      ]);
    });
  });
});
