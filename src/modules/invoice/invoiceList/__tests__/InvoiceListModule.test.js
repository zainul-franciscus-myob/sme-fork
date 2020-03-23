import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  LOAD_INVOICE_LIST,
  LOAD_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../../InvoiceIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import InvoiceListModule from '../InvoiceListModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInvoiceListDispatcher from '../createInvoiceListDispatcher';
import createInvoiceListIntegrator from '../createInvoiceListIntegrator';
import invoiceListReducer from '../invoiceListReducer';

describe('InvoiceListModule', () => {
  const setup = () => {
    // Mock loadSettings from localstorage to prevent side effects
    localStorageDriver.loadSettings = () => { };

    const setRootView = () => { };
    const popMessages = () => [];
    const store = new TestStore(invoiceListReducer);
    const integration = new TestIntegration();

    const module = new InvoiceListModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;
    module.dispatcher = createInvoiceListDispatcher(store);
    module.integrator = createInvoiceListIntegrator(store, integration);

    return {
      store,
      module,
      integration,
    };
  };

  const setupWithRun = () => {
    const { module, store, integration } = setup();

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return { module, store, integration };
  };

  describe('run', () => {
    it('successfully load', () => {
      const { store, integration, module } = setup();
      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
          settings: undefined,
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
          intent: LOAD_INVOICE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_INVOICE_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_INVOICE_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
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
          intent: LOAD_INVOICE_LIST,
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

    it('load initial state from setting', () => {
      const { store, module } = setup();
      const localSettings = {
        filterOptions: {
          dateFrom: '2017-01-01',
          dateTo: '2020-02-02',
          keywords: '🦆',
          customerId: undefined,
          status: 'All',
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

  describe('sortInvoiceList', () => {
    it('successfully sorts', () => {
      const { store, integration, module } = setupWithRun();

      module.sortInvoiceList('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_INVOICE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_INVOICE_LIST,
          params: expect.objectContaining({
            sortOrder: 'asc',
            orderBy: 'DisplayId',
          }),
        }),
      ]);
    });

    it('fails to sort', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_INVOICE_LIST);

      module.sortInvoiceList('DisplayId');

      expect(store.getActions()).toEqual([
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: false,
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
          intent: SORT_AND_FILTER_INVOICE_LIST,
        }),
      ]);
    });

    it('flips the sorting order, when ordering by the same key', () => {
      const { store, integration, module } = setupWithRun();

      module.sortInvoiceList('DisplayId');
      expect(store.getActions()).toContainEqual(
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
      );

      store.resetActions();
      integration.resetRequests();

      module.sortInvoiceList('DisplayId');
      expect(store.getActions()).toContainEqual(
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'desc',
          orderBy: 'DisplayId',
        },
      );
    });
  });

  describe('filterInvoiceList', () => {
    it('successfully applies filter', () => {
      const { store, integration, module } = setupWithRun();

      jest.useFakeTimers();
      module.filterInvoiceList({ filterName: 'keywords', value: 'Tax' });
      jest.runAllTimers();

      expect(store.getActions()).toEqual([
        {
          filterName: 'keywords',
          value: 'Tax',
          intent: UPDATE_FILTER_OPTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_INVOICE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_INVOICE_LIST,
        }),
      ]);
    });

    it('fails to apply filter', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_INVOICE_LIST);

      jest.useFakeTimers();
      module.filterInvoiceList({ filterName: 'keywords', value: 'Tax' });
      jest.runAllTimers();

      expect(store.getActions()).toEqual([
        {
          filterName: 'keywords',
          value: 'Tax',
          intent: UPDATE_FILTER_OPTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isLoading: false,
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
          intent: SORT_AND_FILTER_INVOICE_LIST,
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
});
