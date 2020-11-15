import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  LOAD_PURCHASE_ORDER_LIST,
  LOAD_PURCHASE_ORDER_LIST_FAIL,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE_FAIL,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST_FAIL,
  START_LOADING_MORE,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SORT_ORDER,
} from '../../PurchaseOrderIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK } from '../../../../common/types/MessageTypes';
import PurchaseOrderListModule from '../PurchaseOrderListModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createPurchaseOrderListDispatcher from '../createPurchaseOrderListDispatcher';
import createPurchaseOrderListIntegrator from '../createPurchaseOrderListIntegrator';
import purchaseOrderListReducer from '../purchaseOrderListReducer';

describe('PurchaseOrderListModule', () => {
  const businessId = 'businessId';
  const setup = () => {
    // Mock loadSettings from localStorage to prevent side effects
    localStorageDriver.loadSettings = () => {};

    const setRootView = () => {};
    const popMessages = () => [];
    const store = new TestStore(purchaseOrderListReducer);
    const integration = new TestIntegration();

    const module = new PurchaseOrderListModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;

    module.dispatcher = createPurchaseOrderListDispatcher(store);
    module.integrator = createPurchaseOrderListIntegrator(store, integration);

    return {
      store,
      module,
      integration,
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
        expect.objectContaining({
          intent: LOAD_PURCHASE_ORDER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_PURCHASE_ORDER_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_PURCHASE_ORDER_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
        },
        { intent: LOAD_PURCHASE_ORDER_LIST_FAIL },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_PURCHASE_ORDER_LIST,
        }),
      ]);
    });

    it('displays alert from inbox', () => {
      const { store, module } = setup();
      module.popMessages = jest.fn().mockReturnValue([
        {
          content: '🦕',
        },
      ]);

      module.run({});

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'success',
          message: '🦕',
        },
      });
    });

    it('displays info alert from inbox when purchaseOrder saved without link', () => {
      const { store, module } = setup();
      module.popMessages = jest.fn().mockReturnValue([
        {
          content: '🦕',
          type: SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK,
        },
      ]);

      module.run({});

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'info',
          message: '🦕',
        },
      });
    });
  });

  describe('updateSortOrder', () => {
    it('successfully sort', () => {
      const { store, integration, module } = setupWithRun();

      module.updateSortOrder('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_SORT_ORDER,
          orderBy: 'DisplayId',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);
    });

    it('fails to sort', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_PURCHASE_ORDER_LIST);

      module.updateSortOrder('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_SORT_ORDER,
          orderBy: 'DisplayId',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST_FAIL,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);
    });
  });

  describe('sortAndFilterPurchaseOrderList', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();
      module.sortAndFilterPurchaseOrderList();

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);
    });

    it('fails to apply filter', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_PURCHASE_ORDER_LIST);

      module.sortAndFilterPurchaseOrderList();

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST_FAIL,
          message: 'fails',
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);
    });
  });

  describe('loadPurchaseOrderListNextPage', () => {
    it('successfully load next', () => {
      const { store, integration, module } = setupWithRun();

      module.loadPurchaseOrderListNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: START_LOADING_MORE,
        },
        expect.objectContaining({
          intent: LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
        }),
      ]);
    });

    it('fails to load next', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE);

      module.loadPurchaseOrderListNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: START_LOADING_MORE,
        },
        {
          intent: LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE_FAIL,
          message: 'fails',
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
        }),
      ]);
    });
  });

  describe('updateFilterOptions', () => {
    it('updates filter options and triggers filtering', () => {
      const { store, integration, module } = setupWithRun();
      module.updateFilterOptions({ key: '🔑', value: '🐼' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_FILTER_OPTIONS,
          filterName: '🔑',
          value: '🐼',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);
    });
  });

  describe('resetFilterOptions', () => {
    it('reset filter options and triggers filtering', () => {
      const { store, integration, module } = setupWithRun();
      const { defaultFilterOptions } = store.getState();

      store.setState({
        businessId,
        filterOptions: {
          status: 'Some Status',
          supplierId: '1',
          dateFrom: '2010-02-02',
          dateTo: '2015-02-03',
          keywords: '🍏🍏',
        },
      });

      module.resetFilterOptions();

      expect(store.getActions()).toEqual([
        {
          intent: RESET_FILTER_OPTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
          params: expect.objectContaining(defaultFilterOptions),
          urlParams: { businessId },
        },
      ]);
    });
  });
});
