import { LOAD_USER_LIST, SET_LOADING_STATE } from '../../UserIntents';
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
});
