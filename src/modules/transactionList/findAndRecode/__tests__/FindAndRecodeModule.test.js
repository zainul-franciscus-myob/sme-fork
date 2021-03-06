import {
  CLOSE_MODAL,
  CLOSE_RECODE_OPTIONS,
  FINISH_RECODE,
  LOAD_FIND_AND_RECODE_LIST,
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  RECODE,
  RECODE_ITEM_FAILURE,
  RECODE_ITEM_SUCCESS,
  RESET_FILTER_OPTIONS,
  SELECT_ALL_ITEMS,
  SELECT_ITEM,
  SET_FIND_AND_RECODE_LIST_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_FIND_AND_RECODE_LIST,
  START_RECODE,
  UNSELECT_ALL_ITEMS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD,
  UPDATE_RECODE_OPTIONS,
} from '../FindAndRecodeIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import FindAndRecodeModule from '../FindAndRecodeModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createFindAndRecodeDispatcher from '../createFindAndRecodeDispatcher';
import createFindAndRecodeIntegrator from '../createFindAndRecodeIntegrator';
import findAndRecodeReducer from '../findAndRecodeReducer';

describe('FindAndRecodeModule', () => {
  const setup = () => {
    const integration = new TestIntegration();
    const setAlert = jest.fn();

    const module = new FindAndRecodeModule({
      integration,
      setAlert,
    });
    const store = new TestStore(findAndRecodeReducer);
    module.store = store;
    module.dispatcher = createFindAndRecodeDispatcher(store);
    module.integrator = createFindAndRecodeIntegrator(store, integration);

    return {
      module,
      store,
      integration,
      setAlert,
    };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;
    module.run({
      businessId: '🦕',
      region: 'au',
      taxCodeList: [
        {
          id: '2',
        },
      ],
      accountList: [
        {
          id: '1',
        },
      ],
    });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    it('successfully loads but not load the accounts and taxcodes list', () => {
      const { module, store, integration } = setup();

      module.run({
        businessId: '🦕',
        region: 'au',
        taxCodeList: [
          {
            description: 'Goods & Services Tax',
            displayName: 'GST',
            displayRate: '10%',
            id: '1',
          },
          {
            description: 'Not Reportable',
            displayName: 'N-T',
            displayRate: '0%',
            id: '2',
          },
        ],
        accountList: [
          {
            id: '4',
            displayId: '1-1110',
            displayName: 'Vehicle Account #11',
            accountType: 'Asset',
          },
          {
            id: '5',
            displayId: '1-1110',
            displayName: 'Kitchen Account #2',
            accountType: 'Asset',
          },
          {
            id: '6',
            displayId: '1-1110',
            displayName: 'Lounge Account #6',
            accountType: 'Expense',
          },
        ],
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦕',
            region: 'au',
            taxCodeList: expect.any(Object),
            accountList: expect.any(Object),
          },
        },
        {
          intent: UNSELECT_ALL_ITEMS,
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
          intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
          urlParams: {
            businessId: '🦕',
          },
          params: {
            accountId: undefined,
            keywords: '',
            orderBy: 'Date',
            sortOrder: 'desc',
            sourceJournal: 'All',
            taxCodeId: undefined,
            dateFrom: '',
            dateTo: '',
            offset: 0,
          },
        },
      ]);
    });

    it('successfully loads and load the accounts and taxcodes list', () => {
      const { module, store, integration } = setup();

      module.run({
        businessId: '🦕',
        region: 'au',
        taxCodeList: [],
        accountList: [],
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦕',
            region: 'au',
            taxCodeList: [],
            accountList: [],
          },
        },
        {
          intent: UNSELECT_ALL_ITEMS,
        },
        {
          intent: SET_FIND_AND_RECODE_LIST_LOADING_STATE,
          isFindAndRecodeListLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_FIND_AND_RECODE_LIST_LOADING_STATE,
          isFindAndRecodeListLoading: false,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_FIND_AND_RECODE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_FIND_AND_RECODE_LIST,
          urlParams: { businessId: '🦕' },
          params: {
            accountId: undefined,
            keywords: '',
            orderBy: 'Date',
            sortOrder: 'desc',
            sourceJournal: 'All',
            taxCodeId: undefined,
            dateFrom: '',
            dateTo: '',
            offset: 0,
          },
        },
      ]);
    });

    it('fails to load list', () => {
      const { module, store, integration, setAlert } = setup();
      integration.mapFailure(SORT_AND_FILTER_FIND_AND_RECODE_LIST);

      module.run({
        businessId: '🦕',
        region: 'au',
        taxCodeList: [
          {
            description: 'Goods & Services Tax',
            displayName: 'GST',
            displayRate: '10%',
            id: '1',
          },
          {
            description: 'Not Reportable',
            displayName: 'N-T',
            displayRate: '0%',
            id: '2',
          },
        ],
        accountList: [
          {
            id: '4',
            displayId: '1-1110',
            displayName: 'Vehicle Account #11',
            accountType: 'Asset',
          },
          {
            id: '5',
            displayId: '1-1110',
            displayName: 'Kitchen Account #2',
            accountType: 'Asset',
          },
          {
            id: '6',
            displayId: '1-1110',
            displayName: 'Lounge Account #6',
            accountType: 'Expense',
          },
        ],
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦕',
            region: 'au',
            taxCodeList: expect.any(Object),
            accountList: expect.any(Object),
          },
        },
        {
          intent: UNSELECT_ALL_ITEMS,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
      ]);

      expect(setAlert).toHaveBeenCalledWith({
        message: expect.any(String),
        type: 'danger',
      });

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
        }),
      ]);
    });

    it('should not load accounts and tax codes list if they are not empty', () => {
      const { module, store, integration } = setup();

      module.run({
        businessId: '🦕',
        region: 'au',
        taxCodeList: [
          {
            description: 'Goods & Services Tax',
            displayName: 'GST',
            displayRate: '10%',
            id: '1',
          },
          {
            description: 'Not Reportable',
            displayName: 'N-T',
            displayRate: '0%',
            id: '2',
          },
        ],
        accountList: [
          {
            id: '4',
            displayId: '1-1110',
            displayName: 'Vehicle Account #11',
            accountType: 'Asset',
          },
          {
            id: '5',
            displayId: '1-1110',
            displayName: 'Kitchen Account #2',
            accountType: 'Asset',
          },
          {
            id: '6',
            displayId: '1-1110',
            displayName: 'Lounge Account #6',
            accountType: 'Expense',
          },
        ],
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦕',
            region: 'au',
            taxCodeList: [
              {
                description: 'Goods & Services Tax',
                displayName: 'GST',
                displayRate: '10%',
                id: '1',
              },
              {
                description: 'Not Reportable',
                displayName: 'N-T',
                displayRate: '0%',
                id: '2',
              },
            ],
            accountList: [
              {
                id: '4',
                displayId: '1-1110',
                displayName: 'Vehicle Account #11',
                accountType: 'Asset',
              },
              {
                id: '5',
                displayId: '1-1110',
                displayName: 'Kitchen Account #2',
                accountType: 'Asset',
              },
              {
                id: '6',
                displayId: '1-1110',
                displayName: 'Lounge Account #6',
                accountType: 'Expense',
              },
            ],
          },
        },
        {
          intent: UNSELECT_ALL_ITEMS,
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
          intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
          urlParams: {
            businessId: '🦕',
          },
          params: {
            accountId: undefined,
            keywords: '',
            orderBy: 'Date',
            sortOrder: 'desc',
            sourceJournal: 'All',
            taxCodeId: undefined,
            dateFrom: '',
            dateTo: '',
            offset: 0,
          },
        },
      ]);
    });
  });

  describe('sorts and filter', () => {
    [
      {
        name: 'sort',
        act: (module) => module.sort('Description'),
        action: {
          intent: SET_SORT_ORDER,
          orderBy: 'Description',
        },
        params: {
          orderBy: 'Description',
          sortOrder: 'asc',
        },
      },
      {
        name: 'updatePeriod',
        act: (module) =>
          module.updatePeriod({
            period: 'This month',
            dateFrom: '2020-01-01',
            dateTo: '2020-02-02',
          }),
        action: {
          intent: UPDATE_PERIOD,
          period: 'This month',
          dateFrom: '2020-01-01',
          dateTo: '2020-02-02',
        },
        params: {
          dateFrom: '2020-01-01',
          dateTo: '2020-02-02',
        },
      },
      {
        name: 'resetFilters',
        act: (module) => module.resetFilters(),
        action: {
          intent: RESET_FILTER_OPTIONS,
        },
        params: {},
      },
      {
        name: 'updateFilters',
        act: (module) => module.updateFilters({ key: 'accountId', value: '1' }),
        action: {
          intent: UPDATE_FILTER_OPTIONS,
          key: 'accountId',
          value: '1',
        },
        params: {
          accountId: '1',
        },
      },
    ].forEach(({ name, act, action, params }) => {
      describe(name, () => {
        it('successfully loads', () => {
          const { module, store, integration } = setupWithRun();

          act(module);

          expect(store.getActions()).toEqual([
            action,
            {
              intent: UNSELECT_ALL_ITEMS,
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
              intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
            }),
          ]);
          expect(integration.getRequests()).toEqual([
            {
              intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
              urlParams: {
                businessId: '🦕',
              },
              params: {
                accountId: undefined,
                keywords: '',
                orderBy: 'Date',
                sortOrder: 'desc',
                sourceJournal: 'All',
                taxCodeId: undefined,
                dateFrom: '',
                dateTo: '',
                offset: 0,
                ...params,
              },
            },
          ]);
        });

        it('alert when fails', () => {
          const { module, store, integration, setAlert } = setupWithRun();
          integration.mapFailure(SORT_AND_FILTER_FIND_AND_RECODE_LIST);

          act(module);

          expect(store.getActions()).toEqual([
            action,
            {
              intent: UNSELECT_ALL_ITEMS,
            },
            {
              intent: SET_TABLE_LOADING_STATE,
              isTableLoading: true,
            },
            {
              intent: SET_TABLE_LOADING_STATE,
              isTableLoading: false,
            },
          ]);
          expect(setAlert).toHaveBeenCalledWith({
            message: expect.any(String),
            type: 'danger',
          });
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
            }),
          ]);
        });
      });
    });
  });

  describe('loadFindAndRecodeListNextPage', () => {
    it('successfully loads next page', () => {
      const { module, store, integration } = setupWithRun();

      module.loadFindAndRecodeListNextPage({
        businessId: '🦕',
        region: 'au',
      });

      expect(store.getActions()).toEqual([
        {
          intent: UNSELECT_ALL_ITEMS,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: true,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
          urlParams: {
            businessId: '🦕',
          },
          params: {
            accountId: undefined,
            keywords: '',
            orderBy: 'Date',
            sortOrder: 'desc',
            sourceJournal: 'All',
            taxCodeId: undefined,
            dateFrom: '',
            dateTo: '',
            offset: 3,
          },
        },
      ]);
    });

    it('alert when fails', () => {
      const { module, store, integration, setAlert } = setupWithRun();
      integration.mapFailure(LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE);

      module.loadFindAndRecodeListNextPage({
        businessId: '🦕',
        region: 'au',
      });

      expect(store.getActions()).toEqual([
        {
          intent: UNSELECT_ALL_ITEMS,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: true,
        },
        {
          intent: SET_NEXT_PAGE_LOADING_STATE,
          isNextPageLoading: false,
        },
      ]);
      expect(setAlert).toHaveBeenCalledWith({
        message: expect.any(String),
        type: 'danger',
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
        }),
      ]);
    });
  });

  describe('recode', () => {
    it('successfully recodes', () => {
      const { module, store, integration } = setupWithRun();

      module.dispatcher.selectItem('1');
      module.dispatcher.updateRecodeOptions('accountId', '1');
      module.dispatcher.updateRecodeOptions('taxCodeId', '2');
      module.recode();

      expect(store.getActions()).toEqual([
        { intent: SELECT_ITEM, id: '1' },
        { intent: UPDATE_RECODE_OPTIONS, key: 'accountId', value: '1' },
        { intent: UPDATE_RECODE_OPTIONS, key: 'taxCodeId', value: '2' },
        {
          intent: START_RECODE,
        },
        {
          intent: CLOSE_RECODE_OPTIONS,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: RECODE_ITEM_SUCCESS,
          id: '1',
        },
        {
          intent: FINISH_RECODE,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        {
          intent: RECODE,
          urlParams: {
            businessId: '🦕',
          },
          content: [
            {
              accountId: '1',
              taxCodeId: '2',
              businessEventId: '401',
              businessEventLineId: '1',
              businessEventType: 'CashPayment',
            },
          ],
        },
      ]);
    });

    it('successfully recodes many', () => {
      const { module, store, integration } = setupWithRun();

      module.dispatcher.selectAllItems('1');
      module.dispatcher.updateRecodeOptions('accountId', '1');
      module.dispatcher.updateRecodeOptions('taxCodeId', '2');
      module.recode();

      expect(store.getActions()).toEqual([
        { intent: SELECT_ALL_ITEMS },
        { intent: UPDATE_RECODE_OPTIONS, key: 'accountId', value: '1' },
        { intent: UPDATE_RECODE_OPTIONS, key: 'taxCodeId', value: '2' },
        {
          intent: START_RECODE,
        },
        {
          intent: CLOSE_RECODE_OPTIONS,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: RECODE_ITEM_SUCCESS,
          id: '1',
        },
        {
          intent: RECODE_ITEM_SUCCESS,
          id: '2',
        },
        {
          intent: RECODE_ITEM_SUCCESS,
          id: '3',
        },
        {
          intent: FINISH_RECODE,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        {
          intent: RECODE,
          urlParams: {
            businessId: '🦕',
          },
          content: [
            {
              accountId: '1',
              taxCodeId: '2',
              businessEventId: '401',
              businessEventLineId: '1',
              businessEventType: 'CashPayment',
            },
          ],
        },
        {
          intent: RECODE,
          urlParams: {
            businessId: '🦕',
          },
          content: [
            {
              accountId: '1',
              taxCodeId: '2',
              businessEventId: '402',
              businessEventLineId: '2',
              businessEventType: 'CashPayment',
            },
          ],
        },
        {
          intent: RECODE,
          urlParams: {
            businessId: '🦕',
          },
          content: [
            {
              accountId: '1',
              taxCodeId: '2',
              businessEventId: '401',
              businessEventLineId: '3',
              businessEventType: 'CashPayment',
            },
          ],
        },
      ]);
    });

    it('fails recode', () => {
      const { module, store, integration } = setupWithRun();
      integration.mapFailure(RECODE);

      module.dispatcher.selectItem('1');
      module.dispatcher.updateRecodeOptions('accountId', '1');
      module.dispatcher.updateRecodeOptions('taxCodeId', '2');
      module.recode();

      expect(store.getActions()).toEqual([
        { intent: SELECT_ITEM, id: '1' },
        { intent: UPDATE_RECODE_OPTIONS, key: 'accountId', value: '1' },
        { intent: UPDATE_RECODE_OPTIONS, key: 'taxCodeId', value: '2' },
        {
          intent: START_RECODE,
        },
        {
          intent: CLOSE_RECODE_OPTIONS,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: RECODE_ITEM_FAILURE,
          id: '1',
          error: expect.any(String),
        },
        {
          intent: FINISH_RECODE,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: RECODE,
        }),
      ]);
    });
  });

  describe('getIsRecodeFinished', () => {
    it('return true if no item selected', () => {
      const { module } = setupWithRun();

      const actual = module.getIsRecodeFinished();

      expect(actual).toBeTruthy();
    });

    it('return true if recode process is not started', () => {
      const { module } = setupWithRun();

      module.dispatcher.selectItem('1');

      const actual = module.getIsRecodeFinished();

      expect(actual).toBeTruthy();
    });

    it('return true if recode process is finished', () => {
      const { module } = setupWithRun();

      module.dispatcher.selectItem('1');
      module.dispatcher.updateRecodeOptions('accountId', '1');
      module.dispatcher.finishRecode();

      const actual = module.getIsRecodeFinished();
      expect(actual).toBeTruthy();
    });

    it('return false if recode process is not finished', () => {
      const { module } = setupWithRun();

      module.dispatcher.selectItem('1');
      module.dispatcher.updateRecodeOptions('accountId', '1');
      module.dispatcher.startRecode();

      const actual = module.getIsRecodeFinished();
      expect(actual).toBeFalsy();
    });
  });
});
