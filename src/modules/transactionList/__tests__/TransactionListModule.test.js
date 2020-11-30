import * as localStorageDriver from '../../../store/localStorageDriver';
import { DEBITS_AND_CREDITS, JOURNAL_TRANSACTIONS } from '../getDefaultState';
import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_NEXT_PAGE,
  RESET_FILTER_OPTIONS,
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
import { tabItemIds } from '../tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import Periods from '../../../components/PeriodPicker/Periods';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import TransactionListModule from '../TransactionListModule';
import createTransactionListDispatcher from '../createTransactionListDispatcher';
import createTransactionListIntegrator from '../createTransactionListIntegrator';
import transactionListReducer from '../transactionListReducer';

jest.mock('../../../splitToggle', () => ({
  isToggleOn: () => true,
}));

describe('TransactionListModule', () => {
  const businessId = 'businessId';
  const region = 'au';

  const setup = () => {
    // Mock loadSettings & saveSettings from localStorage to prevent side effects
    localStorageDriver.loadSettings = () => {};
    localStorageDriver.saveSettings = () => {};

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

    module.run({ businessId, region });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithTab = (tab) => {
    const toolbox = setupWithRun();
    const { module, store, integration } = toolbox;

    module.setTab(tab);
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setUpWithJournalTransactionLoaded = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId, region });
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
          context: {
            isFindAndRecodeEnabled: true,
          },
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

    it("should handle if the credits and debits tab doesn' load", () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_CREDITS_AND_DEBITS_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          settings: {
            filterOptions: {},
          },
          context: {
            isFindAndRecodeEnabled: true,
          },
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
      const {
        module,
        store,
        integration,
      } = setUpWithJournalTransactionLoaded();

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
      const {
        module,
        store,
        integration,
      } = setUpWithJournalTransactionLoaded();
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
      const { module, store, integration } = setupWithTab(JOURNAL_TRANSACTIONS);

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
      const { module, store, integration } = setupWithTab(JOURNAL_TRANSACTIONS);
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

    it('run findAndRecodeModule when switch to find and recode tab', () => {
      const { module, store } = setupWithTab(JOURNAL_TRANSACTIONS);
      module.findAndRecodeModule = {
        run: jest.fn(),
      };

      module.setTab(tabItemIds.findAndRecode);

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          tabId: tabItemIds.findAndRecode,
        },
      ]);
      expect(module.findAndRecodeModule.run).toHaveBeenCalledWith({
        businessId,
        region,
        taxCodeList: expect.any(Array),
        accountList: expect.any(Array),
      });
    });
  });

  describe('updateFilterOptions', () => {
    [
      {
        tab: DEBITS_AND_CREDITS,
        intent: SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
      },
      {
        tab: JOURNAL_TRANSACTIONS,
        intent: SORT_AND_FILTER_TRANSACTION_LIST,
      },
    ].forEach((test) => {
      describe(`when ${test.tab}`, () => {
        it('should update a filter option and sort and filter', () => {
          const { module, integration, store } = setupWithTab(test.tab);

          module.updateFilterOptions({ key: 'dateFrom', value: '2020-10-10' });

          expect(store.getActions()[0]).toEqual({
            intent: UPDATE_FILTER_OPTIONS,
            filterName: 'dateFrom',
            value: '2020-10-10',
          });
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
        });

        it('should update urls params when update sourceJournal', () => {
          const { module } = setupWithTab(test.tab);

          module.replaceURLParams = jest.fn();

          module.updateFilterOptions({ key: 'sourceJournal', value: 'All' });

          expect(module.replaceURLParams).toHaveBeenCalledWith({
            sourceJournal: 'All',
          });
        });
      });
    });
  });

  describe('resetFilterOptions', () => {
    describe(`when on credit and debits tab`, () => {
      it('should reset filter options', () => {
        const { module, integration, store } = setupWithTab(DEBITS_AND_CREDITS);
        const { defaultFilterOptions } = store.getState();

        store.setState({
          ...store.getState(),
          filterOptions: {
            accountId: '1',
            sourceJournal: 'Any',
            keywords: 'test',
            period: Periods.lastMonth,
          },
        });
        module.resetFilterOptions();

        expect(store.getActions()[0]).toEqual({
          intent: RESET_FILTER_OPTIONS,
        });

        expect(integration.getRequests()).toEqual([
          {
            intent: SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
            params: expect.objectContaining(defaultFilterOptions),
            urlParams: { businessId },
          },
        ]);
      });
    });

    describe(`when on transaction list tab`, () => {
      it('should reset filter options', () => {
        const { module, integration, store } = setupWithTab(
          SORT_AND_FILTER_TRANSACTION_LIST
        );

        module.resetFilterOptions();

        expect(store.getActions()[0]).toEqual({
          intent: RESET_FILTER_OPTIONS,
        });

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_TRANSACTION_LIST,
            params: {
              accountId: undefined,
              keywords: '',
              offset: 0,
              orderBy: 'Date',
              period: 'This month',
              sortOrder: 'desc',
              sourceJournal: 'All',
            },
            urlParams: { businessId },
          }),
        ]);
      });
    });
  });

  describe('updatePeriodDateRange', () => {
    it('should update the period date range and sort and filter credits and debits', () => {
      const { module, integration, store } = setupWithRun();

      module.updatePeriodDateRange({
        period: 'monthly',
        dateFrom: '20/02/2020',
        dateTo: '20/02/2020',
      });

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

      module.updatePeriodDateRange({
        period: 'monthly',
        dateFrom: '20/02/2020',
        dateTo: '20/02/2020',
      });

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

    it("should handle if we can't load the next page for credits and debits", () => {
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

    it("should handle if we can't load the next page for journal transactions", () => {
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
