import * as debounce from '../../../../common/debounce/debounce';
import {
  LOAD_ITEM_LIST,
  LOAD_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ITEM_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../../InventoryIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import CreateItemListDispatcher from '../CreateItemListDispatcher';
import CreateItemListIntegrator from '../CreateItemListIntegrator';
import ItemListModule from '../ItemListModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import itemListReducer from '../itemListReducer';

describe('ItemListModule', () => {
  const setup = () => {
    const setRootView = () => { };
    const popMessages = () => [];
    const store = new TestStore(itemListReducer);
    const integration = new TestIntegration();

    const module = new ItemListModule({ integration, setRootView, popMessages });
    module.store = store;

    module.dispatcher = CreateItemListDispatcher(module.store);
    module.integrator = CreateItemListIntegrator(module.store, integration);

    return {
      store, module, integration,
    };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return toolbox;
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
          isLoading: true,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_ITEM_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ITEM_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_ITEM_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: false,
        },
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
          intent: LOAD_ITEM_LIST,
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
  });

  describe('sortItemList', () => {
    it('successfully sorts', () => {
      const { store, integration, module } = setupWithRun();

      module.sortItemList('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'desc',
          orderBy: 'DisplayId',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ITEM_LIST,
          params: expect.objectContaining({
            sortOrder: 'desc',
            orderBy: 'DisplayId',
          }),
        }),
      ]);
    });

    it('fails to sort', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_ITEM_LIST);

      module.sortItemList('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'desc',
          orderBy: 'DisplayId',
        },
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
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);
    });

    it('flips the sorting order, when ordering by the same key', () => {
      const { store, integration, module } = setupWithRun();
      module.sortItemList('DisplayId');
      store.resetActions();
      integration.resetRequests();

      module.sortItemList('DisplayId');

      expect(store.getActions()).toContainEqual(
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
      );
    });
  });

  describe('filterItemList', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();

      module.filterItemList();

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
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);
    });

    it('fails to apply filter', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_ITEM_LIST);

      module.filterItemList();

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
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);
    });
  });

  describe('loadNextPage', () => {
    it('successfully load next', () => {
      const { store, integration, module } = setupWithRun();

      module.loadNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: true,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_NEXT_PAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_NEXT_PAGE,
        }),
      ]);
    });

    it('fails to load next', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(LOAD_NEXT_PAGE);

      module.loadNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: true,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: false,
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
          intent: LOAD_NEXT_PAGE,
        }),
      ]);
    });
  });

  describe('updateFilterOptions', () => {
    it('successfully filters', () => {
      const { module, store, integration } = setupWithRun();

      module.updateFilterOptions({ key: 'showInactive', value: true });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_FILTER_OPTIONS,
          key: 'showInactive',
          value: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);
    });

    it('fails to filter', () => {
      const { module, store, integration } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_ITEM_LIST);

      module.updateFilterOptions({ key: 'showInactive', value: true });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_FILTER_OPTIONS,
          key: 'showInactive',
          value: true,
        },
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
            type: 'danger',
            message: 'fails',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_ITEM_LIST,
        }),
      ]);
    });

    it('debounces when updating `keywords` filter', () => {
      const { module } = setupWithRun();
      debounce.default = jest.fn().mockImplementation(fn => fn);

      module.updateFilterOptions({ key: 'keywords', value: '🐛' });

      expect(debounce.default).toHaveBeenCalled();
    });
  });
});
