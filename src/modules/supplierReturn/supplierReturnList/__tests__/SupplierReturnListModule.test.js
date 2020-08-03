import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  LOAD_SUPPLIER_RETURN_LIST,
  RESET_FILTER_BAR_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../../SupplierReturnIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import SupplierReturnListModule from '../SupplierReturnListModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createSupplierReturnListDispatcher from '../createSupplierReturnListDispatcher';
import createSupplierReturnListIntegrator from '../createSupplierReturnListIntegrator';
import supplierReturnListReducer from '../supplierReturnListReducer';

describe('SupplierReturnListModule', () => {
  const businessId = 'businessId';

  const setup = () => {
    // Mock loadSettings from localStorage to prevent side effects
    localStorageDriver.loadSettings = () => {};

    const store = new TestStore(supplierReturnListReducer);
    const integration = new TestIntegration();
    const module = new SupplierReturnListModule({
      integration,
      setRootView: () => {},
      popMessages: () => [],
    });
    module.store = store;
    module.integrator = createSupplierReturnListIntegrator(store, integration);
    module.dispatcher = createSupplierReturnListDispatcher(store);

    return { store, module, integration };
  };

  const setupWithRun = () => {
    const { store, integration, module } = setup();

    module.run({ businessId });
    store.resetActions();
    integration.resetRequests();

    return { store, integration, module };
  };

  describe('run', () => {
    const context = {};

    it('successfully load', () => {
      const { store, integration, module } = setup();

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({ intent: LOAD_SUPPLIER_RETURN_LIST }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_SUPPLIER_RETURN_LIST }),
      ]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_SUPPLIER_RETURN_LIST);

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING_FAIL },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_SUPPLIER_RETURN_LIST }),
      ]);
    });

    it('display alert from inbox', () => {
      const message = 'Message';
      const { store, module } = setup();
      module.popMessages = jest.fn().mockReturnValue([{ content: message }]);

      module.run(context);

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: { type: 'success', message },
      });
    });
  });

  describe('updateFilterBarOptions', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();

      module.updateFilterBarOptions({ key: 'supplierId', value: '1' });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_BAR_OPTIONS, key: 'supplierId', value: '1' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
        }),
      ]);
    });

    it('fails to apply filter', () => {
      const message = 'ERROR';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_SUPPLIER_RETURN_LIST, { message });

      module.updateFilterBarOptions({ key: 'supplierId', value: '1' });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_BAR_OPTIONS, key: 'supplierId', value: '1' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
        }),
      ]);
    });
  });

  describe('resetFilterBarOptions', () => {
    it('successfully resets filter', () => {
      const { store, integration, module } = setupWithRun();
      const defaultFilterOptions = store.getState().filterOptions;

      store.setState({
        ...store.getState(),
        filterOptions: {
          supplierId: '1',
          keywords: 'test',
          dateFrom: '1960-01-01',
          dateTo: '1960-30-01',
        },
      });
      module.resetFilterBarOptions();

      expect(store.getActions()).toEqual([
        { intent: RESET_FILTER_BAR_OPTIONS },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
          params: expect.objectContaining(defaultFilterOptions),
          urlParams: { businessId },
        },
      ]);
    });
  });

  describe('sortSupplierReturnList', () => {
    it('successfully sort', () => {
      const orderBy = 'Overdue';
      const { store, integration, module } = setupWithRun();

      module.sortSupplierReturnList(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
        }),
      ]);
    });

    it('fails to sort', () => {
      const message = 'ERROR';
      const orderBy = 'Overdue';
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_SUPPLIER_RETURN_LIST, { message });

      module.sortSupplierReturnList(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        { intent: SET_ALERT, alert: { type: 'danger', message } },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
        }),
      ]);
    });

    it('flips the sorting order when ordering by the same key', () => {
      const orderBy = 'Overdue';
      const { store, module } = setupWithRun();

      module.sortSupplierReturnList(orderBy);
      module.sortSupplierReturnList(orderBy);

      expect(store.getActions()).toContainEqual(
        { intent: SET_SORT_ORDER, sortOrder: 'asc', orderBy },
        { intent: SET_SORT_ORDER, sortOrder: 'desc', orderBy }
      );
    });
  });
});
