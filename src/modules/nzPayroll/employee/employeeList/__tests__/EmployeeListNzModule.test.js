import { LOAD_EMPLOYEE_LIST } from '../../EmployeeNzIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import EmployeeListNzModule from '../EmployeeListNzModule';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createEmployeeListNzDispatcher from '../createEmployeeListNzDispatcher';
import createEmployeeListNzIntegrator from '../createEmployeeListNzIntegrator';
import employeeListNzReducer from '../employeeListNzReducer';

describe('EmployeeListNzModule', () => {
  const setup = () => {
    const store = new TestStore(employeeListNzReducer);
    const integration = new TestIntegration();
    const setRootView = () => { };

    const module = new EmployeeListNzModule({ integration, setRootView });
    module.store = store;
    module.dispatcher = createEmployeeListNzDispatcher({ store });
    module.integrator = createEmployeeListNzIntegrator({ store, integration });

    return { store, integration, module };
  };

  const setupWithRun = () => {
    const { store, integration, module } = setup();

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return { store, integration, module };
  };

  describe('run', () => {
    it('should load employee list', () => {
      const { store, integration, module } = setupWithRun();
      module.run({ businessId: 'id' });
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
    });
  });
});
