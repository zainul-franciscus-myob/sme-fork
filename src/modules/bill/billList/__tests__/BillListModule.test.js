import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  LOAD_BILL_LIST,
  LOAD_BILL_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../../BillIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { START_LOADING_MORE, STOP_LOADING_MORE } from '../../billDetail/BillIntents';
import { SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK } from '../../../../common/types/MessageTypes';
import BillListModule from '../BillListModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import billListReducer from '../billListReducer';

describe('BillListModule', () => {
  const setup = () => {
    // Mock loadSettings from localStorage to prevent side effects
    localStorageDriver.loadSettings = () => { };

    const setRootView = () => { };
    const popMessages = () => [];
    const store = new TestStore(billListReducer);
    const integration = new TestIntegration();

    const module = new BillListModule({ integration, setRootView, popMessages });
    module.store = store;

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
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_BILL_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BILL_LIST,
        }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_BILL_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_BILL_LIST,
        }),
      ]);
    });

    it('displays alert from inbox', () => {
      const {
        store, module,
      } = setup();
      module.popMessages = jest.fn().mockReturnValue([{
        content: '🦕',
      }]);

      module.run({});

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'success',
          message: '🦕',
        },
      });
    });

    it('displays info alert from inbox when bill saved without link', () => {
      const {
        store, module,
      } = setup();
      module.popMessages = jest.fn().mockReturnValue([{
        content: '🦕',
        type: SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
      }]);

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
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
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
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);
    });

    it('fails to sort', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_BILL_LIST);

      module.updateSortOrder('DisplayId');


      expect(store.getActions()).toEqual([
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
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
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);
    });

    it('flips the sorting order, when ordering by the same key', () => {
      const { store, module } = setupWithRun();
      module.updateSortOrder('DisplayId');
      module.updateSortOrder('DisplayId');

      expect(store.getActions()).toContainEqual(
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'desc',
          orderBy: 'DisplayId',
        },
      );
    });
  });

  describe('sortAndFilterBillList', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();
      module.sortAndFilterBillList();

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
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);
    });


    it('fails to apply filter', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_BILL_LIST);

      module.sortAndFilterBillList();

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
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);
    });
  });

  describe('loadBillListNextPage', () => {
    it('successfully load next', () => {
      const { store, integration, module } = setupWithRun();

      module.loadBillListNextPage();

      expect(store.getActions()).toEqual([
        {
          intent: START_LOADING_MORE,
        },
        {
          intent: STOP_LOADING_MORE,
        },
        expect.objectContaining({
          intent: LOAD_BILL_LIST_NEXT_PAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BILL_LIST_NEXT_PAGE,
        }),
      ]);
    });

    it('fails to load next', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(LOAD_BILL_LIST_NEXT_PAGE);

      module.loadBillListNextPage();

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
            message: 'fails',
            type: 'danger',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BILL_LIST_NEXT_PAGE,
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
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BILL_LIST,
        }),
      ]);
    });
  });
});
