import { mount } from 'enzyme';

import * as localStorageDriver from '../../../../../store/localStorageDriver';
import {
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_FAILED,
  RESET_FILTER_BAR_OPTIONS,
  SET_EMPLOYEE_LIST_TABLE_LOADING,
  SET_SORT_ORDER,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../../EmployeeNzIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import EmployeeListNzModule from '../EmployeeListNzModule';
import EmployeeListNzView from '../components/EmployeeListNzView';
import LoadingFailPageState from '../../../../../components/PageView/LoadingFailPageState';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import employeeListNzDispatcher from '../employeeListNzDispatcher';
import employeeListNzIntegrator from '../employeeListNzIntegrator';
import employeeListNzReducer from '../employeeListNzReducer';

describe('EmployeeListNzModule', () => {
  const setup = () => {
    localStorageDriver.loadSettings = () => {};
    const store = new TestStore(employeeListNzReducer);
    const integration = new TestIntegration();
    let wrapper;

    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const popMessages = () => [];

    const module = new EmployeeListNzModule({
      integration,
      setRootView,
      popMessages,
    });
    module.store = store;
    module.dispatcher = employeeListNzDispatcher({ store });
    module.integrator = employeeListNzIntegrator({ store, integration });

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return {
      store,
      integration,
      module,
      wrapper,
    };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId: 'id', region: 'nz' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    describe('should load employee list successfully', () => {
      const { store, integration, module, wrapper } = setup();

      module.run({ businessId: 'id' });
      wrapper.update();

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { businessId: 'id' },
        },
        expect.objectContaining({ intent: LOAD_EMPLOYEE_LIST }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_EMPLOYEE_LIST }),
      ]);

      expect(wrapper.find(EmployeeListNzView).exists()).toBe(true);
    });

    it('should load LoadingFailPageState when integration fails', () => {
      const { store, integration, module, wrapper } = setup();

      integration.mapFailure(LOAD_EMPLOYEE_LIST);

      module.run({ businessId: 'id' });
      wrapper.update();

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { businessId: 'id' },
        },
        {
          intent: LOAD_EMPLOYEE_LIST_FAILED,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_EMPLOYEE_LIST }),
      ]);

      expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    });

    it('Create employee button should redirect to employee module', () => {
      const { module, wrapper } = setup();
      module.run({ businessId: 'id' });
      wrapper.update();

      wrapper.find({ name: 'createEmployee' }).find('Button').props().onClick();

      expect(window.location.href.endsWith('/new')).toBe(true);
    });

    it('Load more employees button should make request with offset parameter', () => {
      const { module, wrapper, integration } = setup();
      module.run({ businessId: 'id' });
      wrapper.update();

      wrapper.find({ name: 'loadMore' }).find('Button').props().onClick();

      expect(integration.getRequests()).toHaveLength(2);
      const loadNextPageRequest = integration.getRequests()[1];
      expect(loadNextPageRequest.intent).toEqual(LOAD_EMPLOYEE_LIST);
      expect(loadNextPageRequest.params.offset).toBeGreaterThan(0);
    });
  });

  describe('updateFilterBarOptions', () => {
    it('set filters options and triggers filtering for keywords', () => {
      const { store, integration, module } = setupWithRun();

      jest.useFakeTimers();
      module.updateFilterBarOptions({ key: 'keywords', value: 'test' });
      jest.runAllTimers();

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_FILTER_BAR_OPTIONS,
          key: 'keywords',
          value: 'test',
        },
        { intent: SET_EMPLOYEE_LIST_TABLE_LOADING, isTableLoading: true },
        { intent: SET_EMPLOYEE_LIST_TABLE_LOADING, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYEE_LIST }),
      ]);

      expect(integration.getRequests()).toMatchObject([
        {
          intent: SORT_AND_FILTER_EMPLOYEE_LIST,
          params: {
            keywords: 'test',
            showInactive: false,
            orderBy: '',
            sortOrder: '',
            offset: 0,
          },
          urlParams: { businessId: 'id' },
        },
      ]);
    });
  });

  describe('resetFilterOptions', () => {
    it('reset filter options and trigger reload', () => {
      const { store, integration, module } = setupWithRun();

      module.resetFilterBarOptions();

      expect(store.getActions()).toEqual([
        { intent: RESET_FILTER_BAR_OPTIONS },
        { intent: SET_EMPLOYEE_LIST_TABLE_LOADING, isTableLoading: true },
        { intent: SET_EMPLOYEE_LIST_TABLE_LOADING, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYEE_LIST }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_EMPLOYEE_LIST,
          params: {
            keywords: '',
            showInactive: false,
            orderBy: '',
            sortOrder: '',
            offset: 0,
          },
          urlParams: { businessId: 'id' },
        },
      ]);
    });
  });

  describe('sortEmployeeList', () => {
    const { store, integration, module } = setupWithRun();
    const orderBy = 'Name';

    afterEach(() => {
      store.resetActions();
      integration.resetRequests();
    });

    it('sort employee list', () => {
      module.sortEmployeeList(orderBy);

      expect(store.getActions()).toMatchObject([
        { intent: SET_SORT_ORDER, orderBy, sortOrder: 'asc' },
        { intent: SET_EMPLOYEE_LIST_TABLE_LOADING, isTableLoading: true },
        { intent: SET_EMPLOYEE_LIST_TABLE_LOADING, isTableLoading: false },
        expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYEE_LIST }),
      ]);

      expect(integration.getRequests()).toMatchObject([
        {
          intent: SORT_AND_FILTER_EMPLOYEE_LIST,
          params: {
            orderBy: 'Name',
            sortOrder: 'asc',
          },
        },
      ]);
    });

    it('flip employee list', () => {
      module.sortEmployeeList(orderBy);

      expect(store.getActions()).toContainEqual({
        intent: SET_SORT_ORDER,
        orderBy,
        sortOrder: 'desc',
      });

      expect(integration.getRequests()).toMatchObject([
        {
          intent: SORT_AND_FILTER_EMPLOYEE_LIST,
          params: {
            orderBy: 'Name',
            sortOrder: 'desc',
          },
        },
      ]);
    });
  });
});
