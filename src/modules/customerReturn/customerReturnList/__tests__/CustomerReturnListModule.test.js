import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  LOAD_CUSTOMER_RETURN_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../../CustomerReturnIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import CustomerReturnListModule from '../CustomerReturnListModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createCustomerReturnListDispatcher from '../createCustomerReturnListDispatcher';
import customerReturnListReducer from '../customerReturnListReducer';

describe('CustomerReturnListModule', () => {
  const setup = () => {
    localStorageDriver.loadSettings = () => undefined;

    const store = new TestStore(customerReturnListReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const popMessages = () => [];

    const module = new CustomerReturnListModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;
    module.dispatcher = createCustomerReturnListDispatcher(store);

    return {
      store,
      module,
      integration,
    };
  };

  const setupWithRun = () => {
    const { module, integration, store } = setup();
    module.run({ businessId: '🐘', region: 'au' });

    integration.resetRequests();
    store.resetActions();

    return { module, integration, store };
  };

  describe('run', () => {
    it('successfully load', () => {
      const { store, module, integration } = setup();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          context: {},
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_CUSTOMER_RETURN_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_CUSTOMER_RETURN_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { store, module, integration } = setup();
      integration.mapFailure(LOAD_CUSTOMER_RETURN_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          context: {},
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_CUSTOMER_RETURN_LIST,
        }),
      ]);
    });

    it('displays alert from inbox', () => {
      const {
        store, module,
      } = setup();
      module.popMessages = jest.fn().mockReturnValue([{
        content: '🍄',
      }]);

      module.run({});

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'success',
          message: '🍄',
        },
      });
    });

    it('loads initial state from setting', () => {
      const { store, module } = setup();
      const localSettings = {
        filterOptions: {
          option: '🦍',
        },
        sortOrder: 'asc',
        orderBy: '🤡',
      };
      localStorageDriver.loadSettings = () => (localSettings);
      module.run({});

      expect(store.getActions()).toContainEqual({
        intent: SET_INITIAL_STATE,
        context: {},
        settings: {
          ...localSettings,
        },
      });
    });
  });

  describe('sortCustomerReturnList', () => {
    it('successfully sorts', () => {
      const { store, integration, module } = setupWithRun();

      module.sortCustomerReturnList('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
        }),
      ]);
    });

    it('fails to sort', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_CUSTOMER_RETURN_LIST);

      module.sortCustomerReturnList('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
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
          intent: SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
        }),
      ]);
    });

    it('flips the sorting order, when ordering by the same key', () => {
      const { store, integration, module } = setupWithRun();

      module.sortCustomerReturnList('DisplayId');
      expect(store.getActions()).toContainEqual(
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
      );

      store.resetActions();
      integration.resetRequests();

      module.sortCustomerReturnList('DisplayId');
      expect(store.getActions()).toContainEqual(
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'desc',
          orderBy: 'DisplayId',
        },
      );
    });
  });

  describe('filterCustomerReturnList', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();

      module.filterCustomerReturnList();

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
        }),
      ]);
    });

    it('fails to apply filter', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_CUSTOMER_RETURN_LIST);

      module.filterCustomerReturnList();

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
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
          intent: SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
        }),
      ]);
    });
  });

  describe('updateFilterOptions', () => {
    it('updates key with value', () => {
      const { module, store } = setup();
      module.updateFilterBarOptions({ key: '🔑', value: '🐼' });

      expect(store.getActions()).toEqual([
        {
          key: '🔑',
          value: '🐼',
          intent: UPDATE_FILTER_BAR_OPTIONS,
        },
      ]);
    });
  });
});
