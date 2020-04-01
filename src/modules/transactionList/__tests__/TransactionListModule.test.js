import * as localStorageDriver from '../../../store/localStorageDriver';
import { DEBITS_AND_CREDITS, JOURNAL_TRANSACTIONS } from '../getDefaultState';
import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_NEXT_PAGE,
  SET_ALERT,
  SET_LAST_LOADING_TAB,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TAB,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from '../TransactionListIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import TransactionListModule from '../TransactionListModule';
import createTransactionListDispatcher from '../createTransactionListDispatcher';
import createTransactionListIntegrator from '../createTransactionListIntegrator';
import transactionListReducer from '../transactionListReducer';

describe('TransactionListModule', () => {
  const setup = () => {
    // Mock loadSettings & saveSettings from localStorage to prevent side effects
    localStorageDriver.loadSettings = () => { };
    localStorageDriver.saveSettings = () => { };

    const setRootView = () => {};
    const popMessages = () => [];
    const replaceURLParams = () => {};
    const store = new TestStore(transactionListReducer);
    const integration = new TestIntegration();

    const module = new TransactionListModule({
      integration,
      setRootView,
      popMessages,
      replaceURLParams,
    });

    module.store = store;
    module.dispatcher = createTransactionListDispatcher(store);
    module.integrator = createTransactionListIntegrator(store, integration);

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

  const setUpWithJournalTransactionsTabActive = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({});
    module.setTab(JOURNAL_TRANSACTIONS);
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setUpWithJournalTransactionLoaded = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({});
    module.setTab(JOURNAL_TRANSACTIONS);
    module.setTab(DEBITS_AND_CREDITS);
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    it('should load the credits and debits tab by default', () => {
      const { module, store, integration } = setup();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          settings: {
            filterOptions: {},
          },
          context: {},
        },
        {
          intent: SET_LAST_LOADING_TAB,
          lastLoadingTab: DEBITS_AND_CREDITS,
        },
        {
          intent: SET_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
    });

    it('should handle if the credits and debits tab doesn\' load', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_CREDITS_AND_DEBITS_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          settings: {
            filterOptions: {},
          },
          context: {},
        },
        {
          intent: SET_LAST_LOADING_TAB,
          lastLoadingTab: DEBITS_AND_CREDITS,
        },
        {
          intent: SET_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
    });
  });

  describe('setTab', () => {
    it('should sort and filter journal transactions', () => {
      const { module, store, integration } = setUpWithJournalTransactionLoaded();

      module.setTab(JOURNAL_TRANSACTIONS);

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          tabId: JOURNAL_TRANSACTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isTableLoading: true,
        },
        {
          intent: SET_LAST_LOADING_TAB,
          lastLoadingTab: JOURNAL_TRANSACTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_TRANSACTION_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_TRANSACTION_LIST,
        }),
      ]);
    });

    it('should handle if sort and filter journal transactions fails', () => {
      const { module, store, integration } = setUpWithJournalTransactionLoaded();
      integration.mapFailure(SORT_AND_FILTER_TRANSACTION_LIST);

      module.setTab(JOURNAL_TRANSACTIONS);

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          tabId: JOURNAL_TRANSACTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isTableLoading: true,
        },
        {
          intent: SET_LAST_LOADING_TAB,
          lastLoadingTab: JOURNAL_TRANSACTIONS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isTableLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: expect.objectContaining({
            type: 'danger',
          }),
        },
      ]);
    });

    it('should sort and filter credits and debits if it has been loaded before', () => {
      const { module, store, integration } = setUpWithJournalTransactionsTabActive();

      module.setTab(DEBITS_AND_CREDITS);

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          tabId: DEBITS_AND_CREDITS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isTableLoading: true,
        },
        {
          intent: SET_LAST_LOADING_TAB,
          lastLoadingTab: DEBITS_AND_CREDITS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
    });

    it('should handle if filter credits and debits fails to load', () => {
      const { module, store, integration } = setUpWithJournalTransactionsTabActive();
      integration.mapFailure(SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST);

      module.setTab(DEBITS_AND_CREDITS);

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          tabId: DEBITS_AND_CREDITS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isTableLoading: true,
        },
        {
          intent: SET_LAST_LOADING_TAB,
          lastLoadingTab: DEBITS_AND_CREDITS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isTableLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: expect.objectContaining({
            type: 'danger',
          }),
        },
      ]);
    });
  });

  describe('updateFilterOptions', () => {
    it('should update a filter option and sort and filter credits and debits', () => {
      const { module, integration, store } = setupWithRun();

      module.updateFilterOptions({ key: 'sourceJournal', value: 'All' });

      expect(store.getActions()[0]).toEqual({
        intent: UPDATE_FILTER_OPTIONS,
        filterName: 'sourceJournal',
        value: 'All',
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
    });

    it('should update a filter option and sort and filter journal transaction list', () => {
      const { module, integration, store } = setupWithRun();

      module.setTab(JOURNAL_TRANSACTIONS);
      store.resetActions();
      integration.resetRequests();

      module.updateFilterOptions({ key: 'sourceJournal', value: 'All' });

      expect(store.getActions()[0]).toEqual({
        intent: UPDATE_FILTER_OPTIONS,
        filterName: 'sourceJournal',
        value: 'All',
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_TRANSACTION_LIST,
        }),
      ]);
    });
  });

  describe('updatePeriodDateRange', () => {
    it('should update the period date range and sort and filter credits and debits', () => {
      const { module, integration, store } = setupWithRun();

      module.updatePeriodDateRange({ period: 'monthly', dateFrom: '20/02/2020', dateTo: '20/02/2020' });

      expect(store.getActions()[0]).toEqual({
        intent: UPDATE_PERIOD_DATE_RANGE,
        period: 'monthly',
        dateFrom: '20/02/2020',
        dateTo: '20/02/2020',
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
    });

    it('should update the period date range and sort and filter journal transaction list', () => {
      const { module, integration, store } = setupWithRun();

      module.setTab(JOURNAL_TRANSACTIONS);
      store.resetActions();
      integration.resetRequests();

      module.updatePeriodDateRange({ period: 'monthly', dateFrom: '20/02/2020', dateTo: '20/02/2020' });

      expect(store.getActions()[0]).toEqual({
        intent: UPDATE_PERIOD_DATE_RANGE,
        period: 'monthly',
        dateFrom: '20/02/2020',
        dateTo: '20/02/2020',
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_TRANSACTION_LIST,
        }),
      ]);
    });
  });

  describe('sort', () => {
    it('should set the new sort order and sort and filter credits and debits', () => {
      const { module, integration, store } = setupWithRun();

      module.sort('Description');

      expect(store.getActions()[0]).toEqual({
        intent: SET_SORT_ORDER,
        sortOrder: 'asc',
        orderBy: 'Description',
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
        }),
      ]);
    });

    it('should set the new sort order and sort and filter journal transaction list', () => {
      const { module, integration, store } = setupWithRun();

      module.setTab(JOURNAL_TRANSACTIONS);
      store.resetActions();
      integration.resetRequests();

      module.sort('Description');

      expect(store.getActions()[0]).toEqual({
        intent: SET_SORT_ORDER,
        sortOrder: 'asc',
        orderBy: 'Description',
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_TRANSACTION_LIST,
        }),
      ]);
    });
  });

  describe('loadNextPage', () => {
    it('should load the next page for credits and debits', () => {
      const { module, store, integration } = setupWithRun();

      module.loadNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isNextPageLoading: true,
        },
        expect.objectContaining({
          intent: LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
        }),
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isNextPageLoading: false,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
        }),
      ]);
    });

    it('should handle if we can\'t load the next page for credits and debits', () => {
      const { module, store, integration } = setupWithRun();
      integration.mapFailure(LOAD_CREDITS_AND_DEBITS_NEXT_PAGE);

      module.loadNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isNextPageLoading: true,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: DEBITS_AND_CREDITS,
          isNextPageLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: expect.objectContaining({
            type: 'danger',
          }),
        },
      ]);
    });

    it('should load the next page for journal transactions', () => {
      const { module, store, integration } = setupWithRun();

      module.setTab(JOURNAL_TRANSACTIONS);
      store.resetActions();
      integration.resetRequests();

      module.loadNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isNextPageLoading: true,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isNextPageLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_TRANSACTION_NEXT_PAGE,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_TRANSACTION_NEXT_PAGE,
        }),
      ]);
    });

    it('should handle if we can\'t load the next page for journal transactions', () => {
      const { module, store, integration } = setupWithRun();

      module.setTab(JOURNAL_TRANSACTIONS);
      store.resetActions();
      integration.resetRequests();

      integration.mapFailure(LOAD_TRANSACTION_NEXT_PAGE);
      module.loadNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isNextPageLoading: true,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          key: JOURNAL_TRANSACTIONS,
          isNextPageLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: expect.objectContaining({
            type: 'danger',
          }),
        },
      ]);
    });
  });
});
