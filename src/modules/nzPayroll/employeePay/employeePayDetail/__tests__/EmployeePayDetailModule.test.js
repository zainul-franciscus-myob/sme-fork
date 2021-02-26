import { mount } from 'enzyme';

import {
  CLOSE_DELETE_MODAL,
  DELETE_EMPLOYEE_PAY_DETAILS,
  LOAD_EMPLOYEE_PAY_DETAIL,
  OPEN_DELETE_MODAL,
  SET_LOADING_STATE,
} from '../EmployeePayDetailIntents';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EmployeeDetailTable from '../components/EmployeePayDetailTable';
import EmployeePayDetailButtons from '../components/EmployeePayDetailButtons';
import EmployeePayDetailModule from '../EmployeePayDetailModule';
import RouteName from '../../../../../router/RouteName';
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
    module.pushMessage = jest.fn();
    module.navigateToName = jest.fn();

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

  it('should render EmployeePayDetailButtons on run', () => {
    const { integration, module, wrapper } = setup();
    integration.mapSuccess(LOAD_EMPLOYEE_PAY_DETAIL, {
      ...loadEmployeePayDetail,
    });
    module.run(context);
    wrapper.update();

    expect(wrapper.find(EmployeePayDetailButtons).exists()).toBe(true);
  });

  it('should change the intent to OPEN_DELETE_MODAL if the DELETE button pressed', () => {
    const { store, integration, module, wrapper } = setup();
    integration.mapSuccess(LOAD_EMPLOYEE_PAY_DETAIL, {
      ...loadEmployeePayDetail,
    });
    module.run(context);
    wrapper.update();

    module.onDeleteEmployeePayDetailsClicked();

    const lastIntent = store.getActions()[store.getActions().length - 1].intent;
    expect(lastIntent).toEqual(OPEN_DELETE_MODAL);
  });

  it('should change the intent to CLOSE_DELETE_MODAL when confirmation cancelled', () => {
    const { store, integration, module, wrapper } = setup();
    integration.mapSuccess(LOAD_EMPLOYEE_PAY_DETAIL, {
      ...loadEmployeePayDetail,
    });
    module.run(context);
    wrapper.update();

    module.onCancelDeleteConfirmation();

    const lastIntent = store.getActions()[store.getActions().length - 1].intent;
    expect(lastIntent).toEqual(CLOSE_DELETE_MODAL);
    expect(wrapper.find(DeleteConfirmationModal).exists()).toBe(false);
  });

  it('should change intent to CLOSE_DELETE_MODAL, DELETE_EMPLOYEE_PAY_DETAILS when deletion confirmed', () => {
    const { store, integration, module, wrapper } = setup();
    integration.mapSuccess(LOAD_EMPLOYEE_PAY_DETAIL, {
      ...loadEmployeePayDetail,
    });
    integration.mapSuccess(DELETE_EMPLOYEE_PAY_DETAILS, {});
    module.run(context);
    wrapper.update();

    module.onConfirmDelete();

    const actions = store.getActions();
    expect(actions[actions.length - 3].intent).toEqual(CLOSE_DELETE_MODAL);
    expect(actions[actions.length - 2].intent).toEqual(SET_LOADING_STATE);

    const lastIntent = store.getActions()[store.getActions().length - 1].intent;
    expect(lastIntent).toEqual(SET_LOADING_STATE);
  });

  it('should go to General Journal list page if Employee Pay successfully deleted', () => {
    const { integration, module, wrapper } = setup();
    integration.mapSuccess(LOAD_EMPLOYEE_PAY_DETAIL, {
      ...loadEmployeePayDetail,
    });
    integration.mapSuccess(DELETE_EMPLOYEE_PAY_DETAILS, {});
    module.run(context);
    wrapper.update();

    module.onConfirmDelete();

    expect(module.navigateToName).toBeCalledWith(
      RouteName.GENERAL_JOURNAL_LIST
    );
  });
});
