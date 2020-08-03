import * as debounce from '../../../../common/debounce/debounce';
import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  RESET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../../AccountIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AccountListModule from '../AccountListModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import accountListReducer from '../accountListReducer';
import createAccountListDispatcher from '../createAccountListDispatcher';
import createAccountListIntegrator from '../createAccountListIntegrator';

describe('AccountListModule', () => {
  const mockLocalStorage = () => {
    localStorageDriver.loadSettings = () => {};
  };

  const setup = () => {
    mockLocalStorage();
    const integration = new TestIntegration();
    const store = new TestStore(accountListReducer);
    const setRootView = () => {};
    const popMessages = () => [];
    const module = new AccountListModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;
    module.dispatcher = createAccountListDispatcher(store);
    module.integrator = createAccountListIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({
      businessId: '🦕',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    it('successfully load', () => {
      const { module, store, integration } = setup();

      module.run({
        businessId: '🦕',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦕',
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
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(SORT_AND_FILTER_ACCOUNT_LIST);

      module.run({
        businessId: '🦕',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦕',
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
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('alerts when popping off a message', () => {
      const { module, store } = setup();
      module.popMessages = () => [
        {
          content: '🦄',
        },
      ];

      module.run({
        businessId: '🦕',
      });

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'success',
          message: '🦄',
        },
      });
    });
  });

  describe('updateFilterOptions', () => {
    it('successfully filters', () => {
      const { module, store, integration } = setupWithRun();

      module.updateFilterOptions({ key: 'showInactive', value: true });

      expect(store.getActions()).toEqual([
        {
          intent: SET_ACCOUNT_LIST_FILTER_OPTIONS,
          key: 'showInactive',
          value: true,
        },
        {
          intent: SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
          params: expect.objectContaining({
            showInactive: true,
          }),
        }),
      ]);
    });

    it('fails to filter', () => {
      const { module, store, integration } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_ACCOUNT_LIST);

      module.updateFilterOptions({ key: 'showInactive', value: true });

      expect(store.getActions()).toEqual([
        {
          intent: SET_ACCOUNT_LIST_FILTER_OPTIONS,
          key: 'showInactive',
          value: true,
        },
        {
          intent: SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
          params: expect.objectContaining({
            showInactive: true,
          }),
        }),
      ]);
    });

    it('debounces keyword filter', () => {
      const { module } = setupWithRun();
      debounce.default = jest.fn().mockImplementation((fn) => fn);

      module.updateFilterOptions({ key: 'keywords', value: '🐛' });

      expect(debounce.default).toHaveBeenCalled();
    });
  });

  describe('resetFilterOptions', () => {
    it('successfully resets filters', () => {
      const { module, store, integration } = setupWithRun();

      module.resetFilterOptions();

      expect(store.getActions()).toEqual([
        {
          intent: RESET_ACCOUNT_LIST_FILTER_OPTIONS,
        },
        {
          intent: SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });
  });
});
