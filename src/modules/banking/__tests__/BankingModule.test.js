import {
  COLLAPSE_TRANSACTION_LINE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_NEW_SPLIT_ALLOCATION,
  SET_ALERT,
  SET_ATTACHMENTS_LOADING_STATE,
  SET_ERROR_STATE,
  SET_LOADING_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from '../BankingIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import BankingModule from '../BankingModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import bankingReducer from '../bankingReducer';
import createBankingDispatcher from '../BankingDispatcher';
import createBankingIntegrator from '../BankingIntegrator';

describe('BankingModule', () => {
  const setUp = () => {
    const setRootView = () => {};
    const pushMessage = () => {};
    const popMessages = () => [];
    const isToggleOn = () => true;
    const integration = new TestIntegration();

    const module = new BankingModule({
      integration,
      setRootView,
      pushMessage,
      popMessages,
      isToggleOn,
    });
    const store = new TestStore(bankingReducer);
    module.store = store;
    module.dispatcher = createBankingDispatcher(store);
    module.integrator = createBankingIntegrator(store, integration);

    return {
      module,
      store,
      integration,
      pushMessage,
    };
  };

  const setUpWithRun = () => {
    const toolbox = setUp();
    const { module, store, integration } = toolbox;

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setUpWithOpenTransactionOnAllocateTab = () => {
    const toolbox = setUpWithRun();
    const { module, store, integration } = toolbox;

    module.toggleLine(0);

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    it('successfully loads bank transactions', () => {
      const { store, integration, module } = setUp();
      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { isBankingJobColumnEnabled: true },
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
          intent: LOAD_BANK_TRANSACTIONS,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BANK_TRANSACTIONS,
        }),
      ]);
    });

    it('fails to load bank transactions', () => {
      const { store, integration, module } = setUp();
      integration.mapFailure(LOAD_BANK_TRANSACTIONS);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { isBankingJobColumnEnabled: true },
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
          intent: SET_ERROR_STATE,
          hasError: true,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BANK_TRANSACTIONS,
        }),
      ]);
    });
  });

  describe('loadBankTransactionsNextPage', () => {
    it('successfully loads next', () => {
      const { store, integration, module } = setUpWithRun();

      module.loadBankTransactionsNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: START_LOADING_MORE,
        },
        {
          intent: STOP_LOADING_MORE,
        },
        expect.objectContaining({
          intent: LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
        }),
      ]);
    });

    it('fails to load next', () => {
      const { store, integration, module } = setUpWithRun();
      integration.mapFailure(LOAD_BANK_TRANSACTIONS_NEXT_PAGE, { message: 'Load next failure' });

      module.loadBankTransactionsNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: START_LOADING_MORE,
        },
        {
          intent: STOP_LOADING_MORE,
        },
        {
          intent: SET_ALERT,
          alert: {
            message: 'Load next failure',
            type: 'danger',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
        }),
      ]);
    });
  });

  describe('sortBankTransactions', () => {
    it('successfully sorts when entry is not loading', () => {
      const { store, integration, module } = setUpWithRun();

      module.sortBankTransactions('Date');

      expect(store.getActions()).toEqual([
        {
          intent: COLLAPSE_TRANSACTION_LINE,
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
          intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
          isSort: true,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
          params: expect.objectContaining({
            orderBy: 'Date',
          }),
        }),
      ]);
    });

    it('does not sort if entry is loading', () => {
      const { store, integration, module } = setUp();
      store.state = {
        isOpenEntryLoading: true,
      };
      store.resetActions();
      integration.resetRequests();

      module.sortBankTransactions('Date');

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('fails to sort', () => {
      const { store, integration, module } = setUpWithRun();
      integration.mapFailure(SORT_AND_FILTER_BANK_TRANSACTIONS, { message: 'Sort failure' });

      module.sortBankTransactions('Date');

      expect(store.getActions()).toEqual([
        {
          intent: COLLAPSE_TRANSACTION_LINE,
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
            message: 'Sort failure',
            type: 'danger',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
          params: expect.objectContaining({
            orderBy: 'Date',
          }),
        }),
      ]);
    });
  });

  describe('filterBankTransactions', () => {
    it('successfully filters when entry is not loading', () => {
      const { store, integration, module } = setUpWithRun();

      module.filterBankTransactions();

      expect(store.getActions()).toEqual([
        {
          intent: COLLAPSE_TRANSACTION_LINE,
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
          intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
          isSort: false,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
        }),
      ]);
    });

    it('does not filter if entry is loading', () => {
      const { store, integration, module } = setUp();
      store.state = {
        isOpenEntryLoading: true,
      };
      store.resetActions();
      integration.resetRequests();

      module.filterBankTransactions('Date');

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('fails to filter', () => {
      const { store, integration, module } = setUpWithRun();
      integration.mapFailure(SORT_AND_FILTER_BANK_TRANSACTIONS, { message: 'Filter failure' });

      module.filterBankTransactions();

      expect(store.getActions()).toEqual([
        {
          intent: COLLAPSE_TRANSACTION_LINE,
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
            message: 'Filter failure',
            type: 'danger',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
        }),
      ]);
    });
  });

  describe('toggleLine', () => {
    it('close expanded line', () => {
      const { module, integration, store } = setUpWithOpenTransactionOnAllocateTab();
      module.toggleLine(0);

      expect(store.getActions()).toEqual([
        {
          intent: COLLAPSE_TRANSACTION_LINE,
        },
      ]);
      expect(integration.getRequests()).toEqual([]);
    });

    describe('when open with allocation tab', () => {
      it('it success', () => {
        const { module, integration, store } = setUpWithRun();
        module.toggleLine(0);

        expect(store.getActions()).toEqual([
          {
            intent: LOAD_NEW_SPLIT_ALLOCATION,
            index: 0,
          },
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: true,
          },
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: false,
          },
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });

      it('it fails', () => {
        const { module, integration, store } = setUpWithRun();
        integration.mapFailure(LOAD_ATTACHMENTS);
        module.toggleLine(0);

        expect(store.getActions()).toEqual([
          {
            intent: LOAD_NEW_SPLIT_ALLOCATION,
            index: 0,
          },
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: true,
          },
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: false,
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
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });
    });

    describe('when open with match tab', () => {
      it('succeeds', () => {
        const { module, integration, store } = setUpWithRun();

        module.toggleLine(2);

        expect(store.getActions()).toEqual([
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_OPEN_ENTRY_POSITION,
            index: 2,
          },
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: false,
          },
          expect.objectContaining({
            intent: LOAD_MATCH_TRANSACTIONS,
          }),
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: true,
          },
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: false,
          },
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_MATCH_TRANSACTIONS,
          }),
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });

      it('fails to load attachments', () => {
        const { module, integration, store } = setUpWithRun();
        integration.mapFailure(LOAD_ATTACHMENTS);

        module.toggleLine(2);

        expect(store.getActions()).toEqual([
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_OPEN_ENTRY_POSITION,
            index: 2,
          },
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: false,
          },
          expect.objectContaining({
            intent: LOAD_MATCH_TRANSACTIONS,
          }),
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: true,
          },
          {
            intent: SET_ATTACHMENTS_LOADING_STATE,
            isAttachmentsLoading: false,
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
            intent: LOAD_MATCH_TRANSACTIONS,
          }),
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });

      it('fails to load match transactions', () => {
        // @TODO untestable because `module.loadOpenEntryTab`
        // and `module.loadAttachments` occur in parallel
        // since tests run in sync, failing to `loadOpenEntryTab`
        // closes the line before `loadAttachment` can execut
      });
    });
  });

  describe('updateMatchTransactionOptions', () => {
    it('successfully sorts and filters', () => {
      const { module, integration, store } = setUpWithOpenTransactionOnAllocateTab();

      module.updateMatchTransactionOptions({ key: 'contactId', value: '🙅‍♀️' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_MATCH_TRANSACTION_OPTIONS,
          key: 'contactId',
          value: '🙅‍♀️',
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
          params: expect.objectContaining({
            contactId: '🙅‍♀️',
          }),
        }),
      ]);
    });

    it('fails to sorts and filters', () => {
      const { module, integration, store } = setUpWithOpenTransactionOnAllocateTab();
      integration.mapFailure(SORT_AND_FILTER_MATCH_TRANSACTIONS);

      module.updateMatchTransactionOptions({ key: 'contactId', value: '🙅‍♀️' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_MATCH_TRANSACTION_OPTIONS,
          key: 'contactId',
          value: '🙅‍♀️',
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_MATCH_TRANSACTION_LOADING_STATE,
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
          intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
          params: expect.objectContaining({
            contactId: '🙅‍♀️',
          }),
        }),
      ]);
    });
  });

  describe('updatePeriodDateRange', () => {
    it('should update the period date range and filter bank transactions list', () => {
      const { module, integration, store } = setUpWithRun();

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
          intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
        }),
      ]);
    });
  });
});
