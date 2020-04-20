import { mount } from 'enzyme';

import { LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE } from '../../EmployeeNzIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import ContactDetailsNzTabView from '../contactDetails/components/contactDetailsNzTab';
import EmployeeDetailNzModule from '../EmployeeDetailNzModule';
import EmployeeDetailNzView from '../components/EmployeeDetailNzView';
import LoadingFailPageState from '../../../../../components/PageView/LoadingFailPageState';
import LoadingState from '../../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createEmployeeDetailNzDispatcher from '../createEmployeeDetailNzDispatcher';
import createEmployeeDetailNzIntegrator from '../createEmployeeDetailNzIntegrator';
import employeeDetailNzReducer from '../employeeDetailNzReducer';
import employeeDetailResponse from '../../mappings/data/employeeDetailEntry';

describe('EmployeeDetailNzModule', () => {
  const setup = () => {
    const store = new TestStore(employeeDetailNzReducer);
    const integration = new TestIntegration();

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new EmployeeDetailNzModule({ integration, setRootView });
    module.store = store;
    module.dispatcher = createEmployeeDetailNzDispatcher({ store });
    module.integrator = createEmployeeDetailNzIntegrator({ store, integration });

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return {
      store, integration, module, wrapper,
    };
  };

  describe('run', () => {
    const context = { businessId: '1', employeeId: '2' };

    it('should load employee detail successfully', () => {
      const {
        store, integration, module, wrapper,
      } = setup();
      integration.mapSuccess(LOAD_EMPLOYEE_DETAIL, employeeDetailResponse);

      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: LOAD_EMPLOYEE_DETAIL,
          ...employeeDetailResponse,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_EMPLOYEE_DETAIL,
          urlParams: { ...context },
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(EmployeeDetailNzView).exists()).toBe(true);
      expect(wrapper.find(ContactDetailsNzTabView).exists()).toBe(true);
    });

    it('should display LoadingFailPageState when integration fails', () => {
      const {
        store, integration, module, wrapper,
      } = setup();

      integration.mapFailure(LOAD_EMPLOYEE_DETAIL);

      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_EMPLOYEE_DETAIL,
          urlParams: { ...context },
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(EmployeeDetailNzView).exists()).toBe(true);
      expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    });
  });
});
