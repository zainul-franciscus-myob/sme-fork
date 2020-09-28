import { mount } from 'enzyme';

import {
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_FAILED,
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

      wrapper.find('Button').props().onClick();

      expect(window.location.href.endsWith('/new')).toBe(true);
    });
  });
});
