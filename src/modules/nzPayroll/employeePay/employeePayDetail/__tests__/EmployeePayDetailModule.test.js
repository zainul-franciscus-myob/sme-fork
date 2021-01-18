import { mount } from 'enzyme';

import { LOAD_EMPLOYEE_PAY_DETAIL } from '../EmployeePayDetailIntents';
import EmployeeDetailTable from '../components/EmployeePayDetailTable';
import EmployeePayDetailModule from '../EmployeePayDetailModule';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createEmployeePayDetailDispatchers from '../createEmployeePayDetailDispatchers';
import createEmployeePayDetailIntegrator from '../createEmployeePayDetailIntegrator';
import employeePayDetailReducer from '../employeePayDetailReducer';
import loadEmployeePayDetail from '../../mappings/data/loadEmployeePayDetail';

describe('EmployeePayDetailsModule', () => {
  afterEach(jest.clearAllMocks);
  const setup = () => {
    const store = new TestStore(employeePayDetailReducer);
    const integration = new TestIntegration();
    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new EmployeePayDetailModule({ integration, setRootView });
    module.store = store;
    module.dispatcher = createEmployeePayDetailDispatchers(store);
    module.integrator = createEmployeePayDetailIntegrator(store, integration);

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

  const context = { businessId: '1', region: 'nz' };

  it('should load EmployeePayDetails on run', () => {
    const { integration, module } = setup();

    module.run(context);

    expect(integration.getRequests()).toEqual([
      expect.objectContaining({
        intent: LOAD_EMPLOYEE_PAY_DETAIL,
      }),
    ]);
  });

  it('should render EmployeeDetailTable on run', () => {
    const { integration, module, wrapper } = setup();
    integration.mapSuccess(LOAD_EMPLOYEE_PAY_DETAIL, {
      ...loadEmployeePayDetail,
    });
    module.run(context);
    wrapper.update();

    expect(wrapper.find(EmployeeDetailTable).exists()).toBe(true);
  });
});
