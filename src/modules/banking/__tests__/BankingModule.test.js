import {
  A,
  COMMAND,
  CTRL,
  ENTER,
  EQUALS,
  FORWARD_SLASH,
  M,
  OPTION,
  SHIFT,
  T,
} from '../hotkeys/HotkeyEnums';
import {
  ALLOCATE_TRANSACTION,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  CLOSE_BULK_ALLOCATION,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_NEW_SPLIT_ALLOCATION,
  OPEN_MODAL,
  POPULATE_REMAINING_AMOUNT,
  RESET_BULK_ALLOCATION,
  RESET_MATCH_TRANSACTION_OPTIONS,
  SAVE_MATCH_TRANSACTION,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SET_ALERT,
  SET_ATTACHMENTS_LOADING_STATE,
  SET_BULK_LOADING_STATE,
  SET_ERROR_STATE,
  SET_FOCUS,
  SET_LAST_ALLOCATED_ACCOUNT,
  SET_LOADING_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  START_ENTRY_LOADING_STATE,
  START_LOADING_MORE,
  STOP_ENTRY_LOADING_STATE,
  STOP_LOADING_MORE,
  UNSELECT_TRANSACTIONS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from '../BankingIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import { tabIds } from '../tabItems';
import BankTransactionStatusTypes from '../BankTransactionStatusTypes';
import BankingModule from '../BankingModule';
import FocusLocations from '../FocusLocations';
import HotkeyLocations from '../hotkeys/HotkeyLocations';
import MatchTransactionShowType from '../MatchTransactionShowType';
import ModalTypes from '../ModalTypes';
import Periods from '../../../components/PeriodPicker/Periods';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import TransactionTypes from '../TransactionTypes';
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

  const setUpWithBankTransactionEntry = (entry) => {
    const toolbox = setUpWithRun();
    const { store } = toolbox;

    const index = store.getState().entries.length;

    store.setState({
      ...store.getState(),
      entries: [...store.getState().entries, entry],
    });

    return { ...toolbox, index };
  };

  const setUpWithOpenTransactionOnAllocateTab = () => {
    const toolbox = setUpWithRun();
    const { module, store, integration } = toolbox;

    module.toggleLine(0);

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setUpWithTransactionsSelected = () => {
    const toolbox = setUpWithRun();
    const { module, store } = toolbox;

    module.selectTransaction({ index: 0, value: true });

    store.resetActions();

    return toolbox;
  };

  const setUpWithOpenBulkAllocation = () => {
    const toolbox = setUpWithTransactionsSelected();
    const { module, store } = toolbox;

    module.dispatcher.openBulkAllocation();

    store.resetActions();

    return toolbox;
  };

  const setUpWithOpenBulkUnallocation = () => {
    const toolbox = setUpWithTransactionsSelected();
    const { module, store } = toolbox;

    module.dispatcher.openBulkUnallocateModal();

    store.resetActions();
    return toolbox;
  };

  const setupWithReplaceURLParams = () => {
    const toolbox = setUpWithRun();
    toolbox.module.replaceURLParams = jest.fn();
    return toolbox;
  };

  describe('run', () => {
    it('successfully loads bank transactions', () => {
      const { store, integration, module } = setUp();
      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            isBankingJobColumnEnabled: true,
            isFastModeEnabled: true,
          },
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
          context: {
            isBankingJobColumnEnabled: true,
            isFastModeEnabled: true,
          },
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

    // @Disposable tests: Ensures our logic for setting isFastModeEnabled is correct
    it('sets fastMode given feature toggle is true', () => {
      const { store, integration, module } = setUp();
      integration.mapFailure(LOAD_BANK_TRANSACTIONS);

      module.run({});

      expect(store.getActions()[0]).toEqual({
        intent: SET_INITIAL_STATE,
        context: {
          isBankingJobColumnEnabled: true,
          isFastModeEnabled: true,
        },
      });
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
      integration.mapFailure(LOAD_BANK_TRANSACTIONS_NEXT_PAGE, {
        message: 'Load next failure',
      });

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
      integration.mapFailure(SORT_AND_FILTER_BANK_TRANSACTIONS, {
        message: 'Sort failure',
      });

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

  describe('toggleLine', () => {
    it('close expanded line', () => {
      const {
        module,
        integration,
        store,
      } = setUpWithOpenTransactionOnAllocateTab();
      module.toggleLine(0);

      expect(store.getActions()).toEqual([
        {
          intent: COLLAPSE_TRANSACTION_LINE,
        },
      ]);
      expect(integration.getRequests()).toEqual([]);
    });

    describe(`when open "${BankTransactionStatusTypes.unmatched}"`, () => {
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

    describe(`when open "${BankTransactionStatusTypes.matched}"`, () => {
      const entry = {
        transactionId: '1',
        transactionUid: '123e4567-e89b-12d3-a456-789123456789',
        date: '2018-10-21',
        description: '',
        withdrawal: 3300.0,
        journals: [],
        taxCode: '',
        note: '',
        isReportable: false,
        allocateOrMatch: 'Allocate me',
        type: BankTransactionStatusTypes.matched,
      };

      it('succeeds', () => {
        const {
          module,
          integration,
          store,
          index,
        } = setUpWithBankTransactionEntry(entry);

        module.toggleLine(index);

        expect(store.getActions()).toEqual([
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_OPEN_ENTRY_POSITION,
            index,
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
            params: expect.objectContaining({
              showType: MatchTransactionShowType.CLOSE_MATCHES,
            }),
          }),
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });

      it('fails to load attachments', () => {
        const {
          module,
          integration,
          store,
          index,
        } = setUpWithBankTransactionEntry(entry);
        integration.mapFailure(LOAD_ATTACHMENTS);

        module.toggleLine(index);

        expect(store.getActions()).toEqual([
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_OPEN_ENTRY_POSITION,
            index,
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
        const {
          module,
          integration,
          store,
          index,
        } = setUpWithBankTransactionEntry(entry);
        integration.mapFailure(LOAD_MATCH_TRANSACTIONS);

        module.toggleLine(index);

        expect(store.getActions()).toEqual([
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_OPEN_ENTRY_POSITION,
            index,
          },
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: false,
          },
          {
            intent: COLLAPSE_TRANSACTION_LINE,
          },
          {
            intent: SET_ALERT,
            alert: {
              message: 'fails',
              type: 'danger',
            },
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
            intent: LOAD_MATCH_TRANSACTIONS,
          }),
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });
    });

    describe(`when open "${BankTransactionStatusTypes.paymentRuleMatched}"`, () => {
      const entry = {
        transactionId: '1',
        transactionUid: '123e4567-e89b-12d3-a456-789123456789',
        date: '2018-10-21',
        description: '',
        withdrawal: 3300.0,
        journals: [],
        taxCode: '',
        note: '',
        isReportable: false,
        allocateOrMatch: 'Allocate me',
        type: BankTransactionStatusTypes.paymentRuleMatched,
      };

      it('succeeds', () => {
        const {
          module,
          integration,
          store,
          index,
        } = setUpWithBankTransactionEntry(entry);

        module.toggleLine(index);

        expect(store.getActions()).toEqual([
          {
            intent: SET_OPEN_ENTRY_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_OPEN_ENTRY_POSITION,
            index,
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
            params: expect.objectContaining({
              showType: MatchTransactionShowType.ALL,
            }),
          }),
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });
    });
  });

  describe('updateMatchTransactionOptions', () => {
    it('successfully sorts and filters', () => {
      const {
        module,
        integration,
        store,
      } = setUpWithOpenTransactionOnAllocateTab();

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
      const {
        module,
        integration,
        store,
      } = setUpWithOpenTransactionOnAllocateTab();
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

  describe('resetMatchTransactionOptions', () => {
    it('successfully resets filters', () => {
      const {
        module,
        integration,
        store,
      } = setUpWithOpenTransactionOnAllocateTab();
      const state = store.getState();
      const defaultFilterOptions = state.openEntry.match.filterOptions;

      store.setState({
        ...state,
        openEntry: {
          ...state.openEntry,
          match: {
            ...state.openEntry.match,
            filterOptions: {
              showType: MatchTransactionShowType.SELECTED,
              contactId: '🙅‍♀️',
              keywords: 'test',
              includeClosed: true,
            },
          },
        },
      });

      module.resetMatchTransactionOptions();

      expect(store.getActions()).toEqual([
        {
          intent: RESET_MATCH_TRANSACTION_OPTIONS,
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
          params: expect.objectContaining(defaultFilterOptions),
        }),
      ]);
    });
  });

  describe('allocateTransaction', () => {
    it('should allocate a transaction', () => {
      const { module, store, integration } = setUpWithRun();

      const selectedAccount = store.getState().depositAccounts[0];

      module.allocateTransaction(0, selectedAccount);

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          index: 1,
          intent: SET_FOCUS,
          isFocused: true,
        }),
        expect.objectContaining({
          intent: START_ENTRY_LOADING_STATE,
          displayName: selectedAccount.displayName,
        }),
        expect.objectContaining({
          intent: SET_LAST_ALLOCATED_ACCOUNT,
          selectedAccount,
        }),
        expect.objectContaining({
          intent: STOP_ENTRY_LOADING_STATE,
        }),
        expect.objectContaining({
          intent: ALLOCATE_TRANSACTION,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: ALLOCATE_TRANSACTION,
        }),
      ]);
    });
  });

  describe('closeBulkAllocation', () => {
    it('should reset fields when Bulk Allocation is closed', () => {
      const { module, store } = setUpWithTransactionsSelected();

      module.closeBulkAllocation(false);

      expect(store.getActions()).toEqual([
        {
          intent: RESET_BULK_ALLOCATION,
        },
      ]);
    });

    it('should reset fields and close when Bulk Allocation is open', () => {
      const { module, store } = setUpWithOpenBulkAllocation();

      module.closeBulkAllocation(true);

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_BULK_ALLOCATION,
        },
        {
          intent: RESET_BULK_ALLOCATION,
        },
      ]);
    });
  });

  describe('saveBulkAllocation', () => {
    it('should successfully bulk allocate', () => {
      const { module, store, integration } = setUpWithOpenBulkAllocation();

      module.saveBulkAllocation();

      expect(store.getActions()).toEqual([
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: COLLAPSE_TRANSACTION_LINE,
        },
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: false,
        },
        {
          intent: UNSELECT_TRANSACTIONS,
        },
        expect.objectContaining({
          intent: BULK_ALLOCATE_TRANSACTIONS,
        }),
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: expect.any(String),
          },
        },
        {
          intent: CLOSE_BULK_ALLOCATION,
        },
        {
          intent: RESET_BULK_ALLOCATION,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: BULK_ALLOCATE_TRANSACTIONS,
        }),
      ]);
    });

    it('should fail to bulk allocate', () => {
      const { module, store, integration } = setUpWithOpenBulkAllocation();
      integration.mapFailure(BULK_ALLOCATE_TRANSACTIONS);

      module.saveBulkAllocation();

      expect(store.getActions()).toEqual([
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: COLLAPSE_TRANSACTION_LINE,
        },
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: expect.any(String),
          },
        },
        {
          intent: CLOSE_BULK_ALLOCATION,
        },
        {
          intent: RESET_BULK_ALLOCATION,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: BULK_ALLOCATE_TRANSACTIONS,
        }),
      ]);
    });

    it('should throw unsaved changes modal when has edited open transaction', () => {
      const { module, store } = setUpWithOpenBulkAllocation();
      module.toggleLine(0);
      module.dispatcher.updateSplitAllocationHeader({
        key: 'description',
        value: 'test',
      });
      store.resetActions();

      module.saveBulkAllocation();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: ModalTypes.CANCEL,
        },
        {
          intent: CLOSE_BULK_ALLOCATION,
        },
        {
          intent: RESET_BULK_ALLOCATION,
        },
      ]);
    });
  });

  describe('confirmBulkUnallocation', () => {
    it('should successfully bulk unallocate', () => {
      const { module, store, integration } = setUpWithOpenBulkUnallocation();

      module.bulkUnallocateTransactions();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: COLLAPSE_TRANSACTION_LINE,
        },
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: false,
        },
        {
          intent: UNSELECT_TRANSACTIONS,
        },
        expect.objectContaining({
          intent: BULK_UNALLOCATE_TRANSACTIONS,
        }),
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: expect.any(String),
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: BULK_UNALLOCATE_TRANSACTIONS,
        }),
      ]);
    });

    it('should fail to bulk unallocate', () => {
      const { module, store, integration } = setUpWithOpenBulkUnallocation();
      integration.mapFailure(BULK_UNALLOCATE_TRANSACTIONS);

      module.bulkUnallocateTransactions();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: COLLAPSE_TRANSACTION_LINE,
        },
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_BULK_LOADING_STATE,
          isLoading: false,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: expect.any(String),
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: BULK_UNALLOCATE_TRANSACTIONS,
        }),
      ]);
    });
  });

  describe('filtering', () => {
    const successfulFilterActions = [
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
      }),
    ];

    const failedFilterActions = [
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
          message: expect.any(String),
          type: 'danger',
        },
      },
    ];

    describe('updateFilterOptions', () => {
      const filterName = 'transactionType';
      const value = TransactionTypes.ALL;

      it('successfully filters', () => {
        const { module, store, integration } = setupWithReplaceURLParams();

        module.updateFilterOptions({
          filterName,
          value,
        });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_FILTER_OPTIONS,
            filterName,
            value,
          },
          ...successfulFilterActions,
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
            params: expect.objectContaining({
              [filterName]: value,
            }),
          }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalledWith(
          expect.objectContaining({
            [filterName]: value,
          })
        );
      });

      it('fails to filter', () => {
        const { module, store, integration } = setupWithReplaceURLParams();
        integration.mapFailure(SORT_AND_FILTER_BANK_TRANSACTIONS);

        module.updateFilterOptions({
          filterName,
          value,
        });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_FILTER_OPTIONS,
            filterName,
            value,
          },
          ...failedFilterActions,
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
            params: expect.objectContaining({
              [filterName]: value,
            }),
          }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalledWith(
          expect.objectContaining({
            [filterName]: value,
          })
        );
      });

      it('does not filter if entry is loading', () => {
        const { module, store, integration } = setupWithReplaceURLParams();
        store.state = {
          ...store.state,
          isOpenEntryLoading: true,
        };

        module.updateFilterOptions({
          filterName,
          value,
        });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_FILTER_OPTIONS,
            filterName,
            value,
          },
        ]);
        expect(integration.getRequests()).toEqual([]);
      });
    });

    describe('bankAccountChange', () => {
      const filterName = 'bankAccount';
      const value = '1';

      it('successfully filters', () => {
        const { module, store, integration } = setupWithReplaceURLParams();

        module.bankAccountChange({
          value,
        });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_FILTER_OPTIONS,
            filterName,
            value,
          },
          ...successfulFilterActions,
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
            params: expect.objectContaining({
              [filterName]: value,
            }),
          }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalledWith(
          expect.objectContaining({
            [filterName]: value,
          })
        );
      });

      it('fails to filter', () => {
        const { module, store, integration } = setupWithReplaceURLParams();
        integration.mapFailure(SORT_AND_FILTER_BANK_TRANSACTIONS);

        module.bankAccountChange({
          value,
        });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_FILTER_OPTIONS,
            filterName,
            value,
          },
          ...failedFilterActions,
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
            params: expect.objectContaining({
              [filterName]: value,
            }),
          }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalledWith(
          expect.objectContaining({
            [filterName]: value,
          })
        );
      });

      it('does not filter if entry is loading', () => {
        const { module, store, integration } = setupWithReplaceURLParams();
        store.state = {
          ...store.state,
          isOpenEntryLoading: true,
        };

        module.bankAccountChange({
          value,
        });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_FILTER_OPTIONS,
            filterName,
            value,
          },
        ]);
        expect(integration.getRequests()).toEqual([]);
      });
    });

    describe('updatePeriodDateRange', () => {
      const periodDateRange = {
        dateFrom: '2020-02-02',
        dateTo: '2020-08-02',
        period: Periods.custom,
      };

      it('successfully filters', () => {
        const { module, store, integration } = setupWithReplaceURLParams();

        module.updatePeriodDateRange(periodDateRange);

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_PERIOD_DATE_RANGE,
            ...periodDateRange,
          },
          ...successfulFilterActions,
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
            params: expect.objectContaining({
              ...periodDateRange,
            }),
          }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalledWith(
          expect.objectContaining({
            dateFrom: periodDateRange.dateFrom,
            dateTo: periodDateRange.dateTo,
          })
        );
      });

      it('fails to filter', () => {
        const { module, store, integration } = setupWithReplaceURLParams();
        integration.mapFailure(SORT_AND_FILTER_BANK_TRANSACTIONS);

        module.updatePeriodDateRange(periodDateRange);

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_PERIOD_DATE_RANGE,
            ...periodDateRange,
          },
          ...failedFilterActions,
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
            params: expect.objectContaining({
              ...periodDateRange,
            }),
          }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalledWith(
          expect.objectContaining({
            dateFrom: periodDateRange.dateFrom,
            dateTo: periodDateRange.dateTo,
          })
        );
      });

      it('does not filter if entry is loading', () => {
        const { module, store, integration } = setupWithReplaceURLParams();
        store.state = {
          ...store.state,
          isOpenEntryLoading: true,
        };

        module.updatePeriodDateRange(periodDateRange);

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_PERIOD_DATE_RANGE,
            ...periodDateRange,
          },
        ]);
        expect(integration.getRequests()).toEqual([]);
      });
    });
  });

  describe('expandTransactionLine', () => {
    it('expands transaction line to allocate tab', () => {
      const { module, store, integration } = setUpWithRun();
      const index = 1;

      // Action
      module.expandTransactionLine(index, tabIds.allocate);

      // Assertion
      expect(store.getActions()).toEqual([
        {
          intent: LOAD_NEW_SPLIT_ALLOCATION,
          index,
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
  });

  describe('buildHotkeyHandlers', () => {
    const getHotkeyHandler = (module, location, inputtedKey) =>
      module.buildHotkeyHandlers()[location].find(({ key }) => {
        if (Array.isArray(inputtedKey) && Array.isArray(key)) {
          return key.join('+') === inputtedKey.join('+');
        }
        return key === inputtedKey;
      });

    const entry = {
      transactionId: '1',
      transactionUid: '123e4567-e89b-12d3-a456-789123456789',
      date: '2018-10-21',
      description: '',
      withdrawal: 3300.0,
      journals: [],
      taxCode: '',
      note: '',
      isReportable: false,
      allocateOrMatch: 'Allocate me',
      type: BankTransactionStatusTypes.unmatched,
    };

    describe(`${HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX}`, () => {
      const location = HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX;

      it('shift = allocates transaction to last allocated account', () => {
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);

        // Set up
        const selectedAccount = store.getState().depositAccounts[0];
        module.allocateTransaction(index, selectedAccount);
        integration.resetRequests();
        store.resetActions();

        // Action
        const event = { index: 1 };
        const hotkeyHandler = getHotkeyHandler(module, location, [
          SHIFT,
          EQUALS,
        ]);
        hotkeyHandler.action(event);

        // Assertion
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intent: SET_LAST_ALLOCATED_ACCOUNT,
              selectedAccount,
            }),
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: ALLOCATE_TRANSACTION,
          }),
        ]);
      });

      it('/ expands accordian to default tab (split allocation)', () => {
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);

        // Action
        const event = { index };
        const hotkeyHandler = getHotkeyHandler(module, location, FORWARD_SLASH);
        hotkeyHandler.action(event);

        // Assertion
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: SET_FOCUS,
              index: 0,
              location: FocusLocations.SPLIT_ALLOCATION_ACCOUNT_COMBOBOX,
              isFocused: true,
            },
            {
              intent: LOAD_NEW_SPLIT_ALLOCATION,
              index,
            },
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });

      it('option a expands accordian to split allocation tab', () => {
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);

        // Action
        const event = { index };
        const hotkeyHandler = getHotkeyHandler(module, location, [OPTION, A]);
        hotkeyHandler.action(event);

        // Assertion
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: SET_FOCUS,
              index: 0,
              location: FocusLocations.SPLIT_ALLOCATION_ACCOUNT_COMBOBOX,
              isFocused: true,
            },
            {
              intent: LOAD_NEW_SPLIT_ALLOCATION,
              index,
            },
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });

      it('option m expands accordian to match transaction tab', () => {
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);

        // Action
        const event = { index };
        const hotkeyHandler = getHotkeyHandler(module, location, [OPTION, M]);
        hotkeyHandler.action(event);

        // Assertion
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intent: LOAD_MATCH_TRANSACTIONS,
              index,
            }),
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_MATCH_TRANSACTIONS,
          }),
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });

      it('option t expands accordian to transfer money tab', () => {
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);

        // Action
        const event = { index };
        const hotkeyHandler = getHotkeyHandler(module, location, [OPTION, T]);
        hotkeyHandler.action(event);

        // Assertion
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intent: LOAD_MATCH_TRANSFER_MONEY,
              index,
            }),
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_MATCH_TRANSFER_MONEY,
          }),
          expect.objectContaining({
            intent: LOAD_ATTACHMENTS,
          }),
        ]);
      });
    });

    describe(`${HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR}`, () => {
      const location = HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR;

      it('= populates the calculator with the remaining unallocated value', () => {
        const { module, store } = setUpWithBankTransactionEntry(entry);

        const hotkeyHandler = getHotkeyHandler(module, location, EQUALS);
        hotkeyHandler.action({ index: 0 });

        expect(store.getActions()).toEqual([
          {
            intent: POPULATE_REMAINING_AMOUNT,
            index: 0,
          },
        ]);
      });
    });

    describe(`${HotkeyLocations.GLOBAL}`, () => {
      const location = HotkeyLocations.GLOBAL;

      it('option a switches to the split allocation tab', () => {
        // Setup
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);
        module.toggleLine(index);
        module.changeOpenEntryTab(tabIds.match);
        store.resetActions();
        integration.resetRequests();

        // Action
        const hotkeyHandler = getHotkeyHandler(module, location, [OPTION, A]);
        hotkeyHandler.action();

        // Assertion
        expect(store.getActions()).toEqual([
          {
            intent: LOAD_NEW_SPLIT_ALLOCATION,
            index,
          },
        ]);
      });

      it('option m switches to the match transaction tab', () => {
        // Setup
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);
        module.toggleLine(index);
        store.resetActions();
        integration.resetRequests();

        // Action
        const hotkeyHandler = getHotkeyHandler(module, location, [OPTION, M]);
        hotkeyHandler.action();

        // Assertion
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intent: LOAD_MATCH_TRANSACTIONS,
              index,
            }),
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_MATCH_TRANSACTIONS,
          }),
        ]);
      });

      it('option t switches to the transfer money tab', () => {
        // Setup
        const {
          module,
          store,
          integration,
          index,
        } = setUpWithBankTransactionEntry(entry);
        module.toggleLine(index);
        store.resetActions();
        integration.resetRequests();

        // Action
        const hotkeyHandler = getHotkeyHandler(module, location, [OPTION, T]);
        hotkeyHandler.action();

        // Assertion
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              intent: LOAD_MATCH_TRANSFER_MONEY,
              index,
            }),
          ])
        );
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_MATCH_TRANSFER_MONEY,
          }),
        ]);
      });

      test.each([
        [[OPTION, A], 'split allocation'],
        [[OPTION, T], 'transfer money'],
      ])('%s should do nothing if %s is disabled', (hotkey) => {
        // Setup
        const splitMatchedEntry = {
          ...entry,
          type: BankTransactionStatusTypes.splitMatched,
        };
        const {
          module,
          store,
          index,
          integration,
        } = setUpWithBankTransactionEntry(splitMatchedEntry);
        module.toggleLine(index);
        module.changeOpenEntryTab(tabIds.match);
        store.resetActions();
        integration.resetRequests();

        // Action
        const hotkeyHandler = getHotkeyHandler(module, location, hotkey);
        hotkeyHandler.action();

        // Assertion
        expect(store.getActions()).toEqual([]);
      });

      test.each([
        [[OPTION, A]],
        [[OPTION, M]],
        [[OPTION, T]],
        [[COMMAND, ENTER]],
        [[CTRL, ENTER]],
      ])('%s should do nothing if accordion is not open', (hotkey) => {
        // Setup
        const { module, store } = setUpWithBankTransactionEntry(entry);

        // Action
        const hotkeyHandler = getHotkeyHandler(module, location, hotkey);
        hotkeyHandler.action();

        // Assertion
        expect(store.getActions()).toEqual([]);
      });

      test.each([
        [
          [COMMAND, ENTER],
          'split allocation',
          tabIds.allocate,
          SAVE_SPLIT_ALLOCATION,
        ],
        [
          [CTRL, ENTER],
          'split allocation',
          tabIds.allocate,
          SAVE_SPLIT_ALLOCATION,
        ],
        [
          [COMMAND, ENTER],
          'match transaction',
          tabIds.match,
          SAVE_MATCH_TRANSACTION,
        ],
        [
          [CTRL, ENTER],
          'match transaction',
          tabIds.match,
          SAVE_MATCH_TRANSACTION,
        ],
        [
          [COMMAND, ENTER],
          'transfer money',
          tabIds.transfer,
          SAVE_TRANSFER_MONEY,
        ],
        [[CTRL, ENTER], 'transfer money', tabIds.transfer, SAVE_TRANSFER_MONEY],
      ])(
        '%s should save %s when on %s tab',
        (hotkey, _, tab, expectedIntent) => {
          // Setup
          const {
            module,
            store,
            integration,
            index,
          } = setUpWithBankTransactionEntry(entry);
          module.toggleLine(index);
          module.changeOpenEntryTab(tab);
          store.resetActions();
          integration.resetRequests();

          // Action
          const hotkeyHandler = getHotkeyHandler(module, location, hotkey);
          hotkeyHandler.action();

          // Assertion
          expect(store.getActions()).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                intent: expectedIntent,
              }),
            ])
          );
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: expectedIntent,
            }),
          ]);
        }
      );
    });
  });
});
