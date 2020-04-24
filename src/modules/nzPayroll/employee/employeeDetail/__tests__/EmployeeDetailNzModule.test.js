import { mount } from 'enzyme';


import { LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE } from '../../EmployeeNzIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import ContactDetailsNzTabView from '../contactDetails/components/contactDetailsNzTab';
import EmployeeDetailNzModule from '../EmployeeDetailNzModule';
import EmployeeDetailsNzView from '../components/EmployeeDetailsNzView';
import EmploymentDetailsTab from '../employmentDetails/components/EmploymentDetailsTab';
import LoadingFailPageState from '../../../../../components/PageView/LoadingFailPageState';
import LoadingState from '../../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import createEmployeeDetailNzDispatcher from '../createEmployeeDetailNzDispatcher';
import createEmployeeDetailNzIntegrator from '../createEmployeeDetailNzIntegrator';
import employeeDetailNzReducer from '../employeeDetailNzReducer';
import employeeDetailResponse from '../../mappings/data/employeeDetailEntry';

describe('EmployeeDetailNzModule', () => {
  afterEach(jest.clearAllMocks);

  const replaceURLParams = jest.fn();
  const setup = () => {
    const store = new TestStore(employeeDetailNzReducer);
    const integration = new TestIntegration();

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new EmployeeDetailNzModule({ integration, setRootView, replaceURLParams });
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
          payload: employeeDetailResponse,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_EMPLOYEE_DETAIL,
          urlParams: { ...context },
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(EmployeeDetailsNzView).exists()).toBe(true);
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
      expect(wrapper.find(EmployeeDetailsNzView).exists()).toBe(true);
      expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    });

    describe('When clicking tab payroll details tab', () => {
      it('should move to payroll details page', () => {
        const {
          integration, module, wrapper,
        } = setup();
        integration.mapSuccess(LOAD_EMPLOYEE_DETAIL, employeeDetailResponse);

        module.run(context);
        wrapper.update();

        wrapper.find('TabItem')
          .findWhere(c => c.prop('item')?.id === 'payrollDetails')
          .find('a')
          .simulate('click');
        wrapper.update();

        expect(wrapper.find(EmploymentDetailsTab).exists()).toBe(true);
      });

      it('should update the url', () => {
        const {
          integration, module, wrapper,
        } = setup();
        integration.mapSuccess(LOAD_EMPLOYEE_DETAIL, employeeDetailResponse);

        module.run(context);
        wrapper.update();

        wrapper.find('TabItem')
          .findWhere(c => c.prop('item')?.id === 'payrollDetails')
          .find('a')
          .simulate('click');
        wrapper.update();

        expect(replaceURLParams).toHaveBeenLastCalledWith({
          mainTab: 'payrollDetails',
          subTab: 'employmentDetails',
        });
      });
    });
  });
});
