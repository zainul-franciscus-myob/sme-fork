import {
  CLOSE_MODAL,
  CREATE_USER,
  DELETE_USER,
  LOAD_NEW_ADVISOR_DETAIL,
  LOAD_NEW_USER_DETAIL,
  LOAD_USER_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_USER,
} from '../../UserIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_SAVED_USER } from '../../../../common/types/MessageTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../../ModalType';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import UserDetailModule from '../UserDetailModule';
import createUserDetailDispatcher from '../createUserDetailDispatcher';
import createUserDetailIntegrator from '../createUserDetailIntegrator';
import userDetailReducer from '../userDetailReducer';

describe('UserDetailModule', () => {
  const setup = () => {
    const setRootView = () => {};
    const pushMessage = () => {};
    const usersInvited = () => {};
    const integration = new TestIntegration();

    const module = new UserDetailModule({
      integration, setRootView, pushMessage, usersInvited,
    });
    const store = new TestStore(userDetailReducer);
    module.store = store;
    module.dispatcher = createUserDetailDispatcher(store);
    module.integrator = createUserDetailIntegrator(store, integration);

    return {
      store, module, integration, pushMessage,
    };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ userId: 'new', businessId: '🐑', region: 'au' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ userId: '1', businessId: '🐑', region: 'au' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithEditedPage = () => {
    const toolbox = setupWithExisting();
    const { store, integration, module } = toolbox;

    module.dispatcher.updateUserDetails({ key: 'userName', value: '🐧' });
    module.dispatcher.updateUserRoles({ key: '1', value: true });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    [
      {
        name: 'new',
        userId: 'new',
        intent: LOAD_NEW_USER_DETAIL,
      },
      {
        name: 'new advisor',
        userId: 'new-advisor',
        intent: LOAD_NEW_ADVISOR_DETAIL,
      },
      {
        name: 'existing',
        userId: '1',
        intent: LOAD_USER_DETAIL,
      },
    ].forEach((test) => {
      it(`successfully loads ${test.name}`, () => {
        const { store, integration, module } = setup();

        module.run({
          userId: test.userId,
        });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: {
              userId: test.userId,
            },
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING,
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_SUCCESS,
          },
          expect.objectContaining({
            intent: test.intent,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: test.intent,
          }),
        ]);
      });

      it('fails to load', () => {
        const { store, integration, module } = setup();
        integration.mapFailure(test.intent);

        module.run({
          userId: test.userId,
        });

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: {
              userId: test.userId,
            },
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING,
          },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_FAIL,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: test.intent,
          }),
        ]);
      });
    });
  });

  describe('deleteUser', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { store, module } = toolbox;

      module.openDeleteModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.DELETE,
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('successefully delete', () => {
      const { store, integration, module } = setupWithOpenDeleteModal();
      module.redirectToUrl = jest.fn();

      module.deleteUser();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_USER,
        }),
      ]);

      expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/🐑/user');
    });

    it('successefully delete', () => {
      const { store, integration, module } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_USER);

      module.deleteUser();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_USER,
        }),
      ]);
    });
  });

  describe('createOrUpdateUser', () => {
    [
      {
        name: 'create',
        intent: CREATE_USER,
        setup: setupWithNew,
      },
      {
        name: 'update',
        intent: UPDATE_USER,
        setup: setupWithExisting,
      },
    ].forEach((test) => {
      it(`successfully ${test.name}`, () => {
        const { store, integration, module } = test.setup();
        module.pushMessage = jest.fn();

        module.createOrUpdateUser();

        expect(store.getActions()).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: test.intent,
          }),
        ]);

        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SAVED_USER,
          content: 'Great Work! You\'ve done it well!',
        });
      });

      it(`fails to ${test.name}`, () => {
        const { store, integration, module } = test.setup();
        integration.mapFailure(test.intent);
        module.pushMessage = jest.fn();

        module.createOrUpdateUser();

        expect(store.getActions()).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
          {
            intent: SET_ALERT_MESSAGE,
            alertMessage: 'fails',
          },
          {
            intent: CLOSE_MODAL,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: test.intent,
          }),
        ]);

        expect(module.pushMessage).not.toHaveBeenCalled();
      });
    });

    it('triggers userInvited when create', () => {
      const { module } = setupWithNew();
      module.usersInvited = jest.fn();

      module.createOrUpdateUser();

      expect(module.usersInvited).toHaveBeenCalled();
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithExisting();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.createOrUpdateUser();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('cancelUserDetail', () => {
    it('opens unsaved modal when page is edited', () => {
      const { module, store } = setupWithEditedPage();

      module.cancelUserDetail();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.UNSAVED,
          },
        },
      ]);
    });

    it('redirects when page not edited', () => {
      const { module, store } = setupWithExisting();
      module.redirectToUrl = jest.fn();

      module.cancelUserDetail();

      expect(store.getActions()).toEqual([]);

      expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/🐑/user');
    });
  });

  describe('handlePageTransition', () => {
    it('opens unsaved modal when page is edited', () => {
      const { module, store } = setupWithEditedPage();

      module.handlePageTransition();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.UNSAVED,
          },
        },
      ]);
    });

    it('redirects when page not edited', () => {
      const { module, store } = setupWithExisting();
      module.redirectToUrl = jest.fn();

      module.handlePageTransition();

      expect(store.getActions()).toEqual([]);

      expect(module.redirectToUrl).toHaveBeenCalled();
    });
  });
});
