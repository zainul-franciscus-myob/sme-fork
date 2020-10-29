import * as debounce from '../../../../common/debounce/debounce';
import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  DELETE_ACCOUNTS,
  LOAD_ACCOUNT_LIST,
  MOVE_ACCOUNT_DOWN,
  MOVE_ACCOUNT_UP,
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

    it('updates account name and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      const accountId = store.getState().entries[2].id;
      module.changeAccountDetails({
        index: 2,
        key: 'accountName',
        value: 'Test Account Name',
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
                openingBalance: '0',
                accountName: 'Test Account Name',
                accountNumber: '1-1100',
                subAccountType: 'Bank',
                taxCodeId: 1,
              },
            ],
          },
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('updates account number and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      const accountId = store.getState().entries[2].id;
      module.changeAccountDetails({
        index: 2,
        key: 'accountNumber',
        value: '1-2000',
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
                openingBalance: '0',
                accountName: 'General Cheque Account #1',
                accountNumber: '1-2000',
                subAccountType: 'Bank',
                taxCodeId: 1,
              },
            ],
          },
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('updates account type and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      const accountId = store.getState().entries[2].id;
      module.changeAccountDetails({
        index: 2,
        key: 'subAccountType',
        value: 'OtherAsset',
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
                openingBalance: '0',
                accountName: 'General Cheque Account #1',
                accountNumber: '1-1100',
                subAccountType: 'OtherAsset',
                taxCodeId: 1,
              },
            ],
          },
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('updates tax code and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      const accountId = store.getState().entries[2].id;
      module.changeAccountDetails({
        index: 2,
        key: 'taxCodeId',
        value: 2,
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
                openingBalance: '0',
                accountName: 'General Cheque Account #1',
                accountNumber: '1-1100',
                subAccountType: 'Bank',
                taxCodeId: 2,
              },
            ],
          },
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('updates opening balance and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      const accountId = store.getState().entries[2].id;
      module.changeAccountDetails({
        index: 2,
        key: 'openingBalance',
        value: '1111',
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
                openingBalance: '1111',
                accountName: 'General Cheque Account #1',
                accountNumber: '1-1100',
                subAccountType: 'Bank',
                taxCodeId: 1,
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

  describe('CHANGE_ACCOUNT_NUMBER when not flex account numbers', () => {
    it('does not update if doesnt start with prefix', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: false,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '1-',
        key: 'accountNumber',
        value: '12345',
      };

      module.changeAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('1-0000');
    });

    it('does not update if editable part is longer than 4 characters', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: false,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '1-',
        key: 'accountNumber',
        value: '1-12345',
      };

      module.changeAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('1-0000');
    });

    it('does not update if editable part has alpha characters', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: false,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '1-',
        key: 'accountNumber',
        value: '1-asb1',
      };

      module.changeAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('1-0000');
    });

    it('updates if is prefixed correctly, has not alpha characters, and is less than 4 chars', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: false,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '1-',
        key: 'accountNumber',
        value: '1-1234',
      };

      module.changeAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('1-1234');
    });
  });

  describe('CHANGE_ACCOUNT_NUMBER when is flex account numbers', () => {
    it('does update if doesnt start with prefix', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: true,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '',
        key: 'accountNumber',
        value: 'asb1',
      };

      module.changeAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('asb1');
    });

    it('does not update if editable part is longer than 10 characters ', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: true,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '',
        key: 'accountNumber',
        value: 'asb1f28jr50',
      };

      module.changeAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('1-0000');
    });

    it('updates if is less than 10 chars', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: true,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '',
        key: 'accountNumber',
        value: 'asb1f28jr5',
      };

      module.changeAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('asb1f28jr5');
    });
  });

  describe('PAD_ACCOUNT_NUMBER', () => {
    it('pads up to 4 editable characters if flex is off', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: false,
        entries: [{ id: 1, accountNumber: '1-0000' }],
      });

      const action = {
        index: 0,
        prefix: '1-',
        key: 'accountNumber',
        value: '1-1',
      };

      module.padAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('1-1000');
    });

    it('does not pad characters if flex is on', () => {
      const { module, store } = setupWithRun();

      module.dispatcher.loadAccountList({
        hasFlexibleAccountNumbers: true,
        entries: [{ id: 1, accountNumber: '1-1' }],
      });

      const action = {
        index: 0,
        prefix: '',
        key: 'accountNumber',
        value: '2',
      };

      module.padAccountNumber(action);

      expect(store.getState().entries[0].accountNumber).toEqual('1-1');
    });
  });

  describe('move accounts', () => {
    it('moves account up and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      module.selectAccount({ index: 0, value: true });

      const selectedId = store.getState().entries[0].id;

      module.moveUpAccount();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ACCOUNT_LIST,
        }),
        expect.objectContaining({
          intent: MOVE_ACCOUNT_UP,
          urlParams: expect.objectContaining({
            accountId: selectedId,
          }),
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });

    it('moves account down and reloads list', () => {
      const { module, integration, store } = setupWithRun();

      module.loadAccountList();

      module.selectAccount({ index: 0, value: true });

      const selectedId = store.getState().entries[0].id;

      module.moveDownAccount();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ACCOUNT_LIST,
        }),
        expect.objectContaining({
          intent: MOVE_ACCOUNT_DOWN,
          urlParams: expect.objectContaining({
            accountId: selectedId,
          }),
        }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_ACCOUNT_LIST,
        }),
      ]);
    });
  });
});
