import * as localStorageDriver from '../../../../store/localStorageDriver';
import {
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../../EmployeeIntents';
import EmployeeListModule from '../EmployeeListModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import employeeListReducer from '../employeeListReducer';

describe('EmployeeListModule', () => {
  const businessId = 'businessId';
  const region = 'au';

  const setup = () => {
    // Mock loadSettings from localStorage to prevent side effects
    localStorageDriver.loadSettings = () => {};

    const setRootView = () => {};
    const popMessages = () => [];
    const store = new TestStore(employeeListReducer);
    const integration = new TestIntegration();

    const module = new EmployeeListModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;

    return { store, module, integration };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId, region });
    store.resetActions();
    integration.resetRequests();

    return { store, module, integration };
  };

  describe('updateFilterBarOptions', () => {
    it('set filters options and triggers filtering for keywords', () => {
      const { store, integration, module } = setupWithRun();
      jest.useFakeTimers();

      module.updateFilterBarOptions({ key: 'keywords', value: 'value' });
      jest.runAllTimers();

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_BAR_OPTIONS, key: 'keywords', value: 'value' },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYEE_LIST }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_EMPLOYEE_LIST,
          params: {
            keywords: 'value',
            showInactive: false,
            orderBy: 'Name',
            sortOrder: 'asc',
            offset: 0,
          },
          urlParams: { businessId },
        },
      ]);
    });

    it('set filters options and triggers filtering for showInactive', () => {
      const { store, integration, module } = setupWithRun();

      module.updateFilterBarOptions({ key: 'showInactive', value: true });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_FILTER_BAR_OPTIONS, key: 'showInactive', value: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYEE_LIST }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_EMPLOYEE_LIST,
          params: {
            keywords: '',
            showInactive: true,
            orderBy: 'Name',
            sortOrder: 'asc',
            offset: 0,
          },
          urlParams: { businessId },
        },
      ]);
    });
  });

  describe('sortEmployeeList', () => {
    it('flip and sort employee list', () => {
      const orderBy = 'Name';
      const sortOrder = 'desc';

      const { store, integration, module } = setupWithRun();

      module.sortEmployeeList(orderBy);

      expect(store.getActions()).toEqual([
        { intent: SET_SORT_ORDER, orderBy, sortOrder },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: true },
        { intent: SET_TABLE_LOADING_STATE, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYEE_LIST }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_EMPLOYEE_LIST,
          params: {
            keywords: '',
            showInactive: false,
            orderBy,
            sortOrder,
            offset: 0,
          },
          urlParams: { businessId },
        },
      ]);
    });
  });
});
