import {
  CANCEL_INVITATION,
  CLOSE_MODAL,
  LOAD_USER_LIST,
  REMOVE_PRACTICE_ACCESS,
  REMOVE_USER_ACCESS,
  RESEND_INVITATION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SET_USER_LIST_FILTER_OPTIONS,
} from '../../UserIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import UserListModule from '../UserListModule';
import createUserListDispatcher from '../createUserListDispatcher';
import createUserListIntegrator from '../createUserListIntegrator';
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
    module.dispatcher = createUserListDispatcher(store);
    module.integrator = createUserListIntegrator(store, integration);

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
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
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
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
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
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: "Great Work! You've done it well!",
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
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
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
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
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: "Great Work! You've done it well!",
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
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
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CANCEL_INVITATION,
        }),
      ]);
    });
  });

  describe('remove access', () => {
    it('successfully removed', () => {
      const { store, integration, module } = setup();
      module.removeAccess();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: "Great Work! You've done it well!",
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: REMOVE_USER_ACCESS,
        }),
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);
    });

    it('failed to remove', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(REMOVE_USER_ACCESS);
      module.removeAccess();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: REMOVE_USER_ACCESS,
        }),
      ]);
    });
  });

  describe('remove practice access', () => {
    it('successfully removed', () => {
      const { store, integration, module } = setup();
      module.removePracticeAccess();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: "Great Work! You've done it well!",
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: REMOVE_PRACTICE_ACCESS,
        }),
        expect.objectContaining({
          intent: LOAD_USER_LIST,
        }),
      ]);
    });

    it('failed to remove', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(REMOVE_PRACTICE_ACCESS);
      module.removePracticeAccess();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: REMOVE_PRACTICE_ACCESS,
        }),
      ]);
    });
  });

  describe('update filter options', () => {
    it('set correct filters and load user list again', () => {
      const { store, integration, module } = setup();
      const filters = {
        key: 'keywords',
        value: 'admin',
      };
      module.updateFilterOptions(filters);

      expect(store.getActions()).toEqual([
        {
          intent: SET_USER_LIST_FILTER_OPTIONS,
          ...filters,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
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
  });
});
