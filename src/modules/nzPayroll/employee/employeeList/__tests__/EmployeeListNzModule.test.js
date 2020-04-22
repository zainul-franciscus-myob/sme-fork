import { mount } from 'enzyme';

import { LOAD_EMPLOYEE_LIST, SET_LOADING_STATE } from '../../EmployeeNzIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import EmployeeListNzModule from '../EmployeeListNzModule';
import EmployeeListNzView from '../components/EmployeeListNzView';
import LoadingFailPageState from '../../../../../components/PageView/LoadingFailPageState';
import LoadingState from '../../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createEmployeeListNzDispatcher from '../createEmployeeListNzDispatcher';
import createEmployeeListNzIntegrator from '../createEmployeeListNzIntegrator';
import employeeListNzReducer from '../employeeListNzReducer';

describe('EmployeeListNzModule', () => {
  const setup = () => {
    const store = new TestStore(employeeListNzReducer);
    const integration = new TestIntegration();
    let wrapper;

    const setRootView = (component) => { wrapper = mount(component); };

    const module = new EmployeeListNzModule({ integration, setRootView });
    module.store = store;
    module.dispatcher = createEmployeeListNzDispatcher({ store });
    module.integrator = createEmployeeListNzIntegrator({ store, integration });

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return {
      store, integration, module, wrapper,
    };
  };

  describe('run', () => {
    describe('should load employee list successfully', () => {
      const {
        store, integration, module, wrapper,
      } = setup();

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
      const {
        store, integration, module, wrapper,
      } = setup();

      integration.mapFailure(LOAD_EMPLOYEE_LIST);

      module.run({ businessId: 'id' });
      wrapper.update();

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { businessId: 'id' },
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_EMPLOYEE_LIST }),
      ]);

      expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    });
  });
});