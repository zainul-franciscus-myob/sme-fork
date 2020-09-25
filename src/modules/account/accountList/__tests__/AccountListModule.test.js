import * as debounce from '../../../../common/debounce/debounce';
import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  DELETE_ACCOUNTS,
  LOAD_ACCOUNT_LIST,
  RESET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SORT_AND_FILTER_ACCOUNT_LIST,
  UPDATE_ACCOUNTS,
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
          intent: LOAD_ACCOUNT_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ACCOUNT_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_ACCOUNT_LIST);

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
          intent: LOAD_ACCOUNT_LIST,
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

  describe('bulk actions', () => {
    it('deletes accounts and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();
      module.selectAccount({ index: 0, value: true });
      const selectedId = store.getState().entries[0].id;

      module.deleteAccounts();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ACCOUNT_LIST,
        }),
        expect.objectContaining({
          intent: DELETE_ACCOUNTS,
          content: { accountIds: [selectedId] },
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('updates accounts and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      const accountId = store.getState().entries[2].id;
      module.changeAccountDetails({
        index: 2,
        key: 'openingBalance',
        value: 1111,
      });

      module.clickBulkUpdateSave();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ACCOUNT_LIST,
        }),
        expect.objectContaining({
          intent: UPDATE_ACCOUNTS,
          content: {
            accounts: [
              {
                id: accountId,
                openingBalance: 1111,
              },
            ],
          },
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('redirects to another url', () => {
      const { module } = setupWithRun();

      module.navigateTo = jest.fn(() => undefined);

      const url = 'test';
      module.clickBulkUpdateModalDiscard(url);

      expect(module.navigateTo.mock.calls[0][0]).toBe(url);
    });

    it('loads the account list when no redirect url given', () => {
      const { module } = setupWithRun();

      module.filterAccountList = jest.fn(() => undefined);

      module.clickBulkUpdateModalDiscard();

      expect(module.filterAccountList.mock.calls.length).toBe(1);
    });
  });

  describe('calculate historical balance', () => {
    it('calculates 0 when no account exists', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(0);
    });

    it('adds opening balance of Asset accounts into historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[2].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(10);
    });

    it('adds opening balance of Cost of sales accounts into historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[14].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(10);
    });

    it('adds opening balance of Expense accounts into historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[15].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(10);
    });

    it('adds opening balance of Other expense accounts into historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[16].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(10);
    });

    it('subtracts opening balance of unknown accounts from historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[7].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(-10);
    });

    it('subtracts opening balance of other types of accounts (e.g. liability) from historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[11].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(-10);
    });

    it('does not include current year earnings in calculating historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[17].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(0);
    });

    it('does not include existing historical balance in calculating historical balance', () => {
      const { module, store } = setupWithRun();

      module.fetchAllAccounts();

      store.getState().entries[18].openingBalance = '10';
      module.calculateRemainingHistoricalBalance();

      expect(store.getState().remainingHistoricalBalance).toBe(0);
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
