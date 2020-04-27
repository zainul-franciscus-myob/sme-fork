import { mount } from 'enzyme';

import {
  CLOSE_MODAL, DELETE_EMPLOYEE, LOAD_EMPLOYEE_DETAIL, OPEN_MODAL, SET_LOADING_STATE,
  SET_SAVING_STATE, SET_SUBMITTING_STATE, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_FAILED,
} from '../../EmployeeNzIntents';
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
import updateEmployeeDetailResponse from '../../mappings/data/updateEmployeeDetailResponse';

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

  const context = { businessId: '1', employeeId: '2' };

  describe('run', () => {
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

  describe('Save button', () => {
    it('should save successfully', () => {
      const {
        store, integration, module, wrapper,
      } = setup();

      integration.mapSuccess(UPDATE_EMPLOYEE, updateEmployeeDetailResponse);

      module.run(context);
      wrapper.update();

      store.resetActions();
      integration.resetRequests();

      wrapper
        .find({ name: 'save' })
        .find('Button')
        .simulate('click');

      wrapper.update();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SAVING_STATE,
        },
        {
          intent: UPDATE_EMPLOYEE,
          ...updateEmployeeDetailResponse,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_EMPLOYEE,
          urlParams: { ...context },
        }),
      ]);
    });

    it('should handle save failure', () => {
      const {
        store, integration, module, wrapper,
      } = setup();

      integration.mapFailure(UPDATE_EMPLOYEE, { message: 'Failed' });

      module.run(context);
      wrapper.update();

      store.resetActions();
      integration.resetRequests();

      wrapper
        .find({ name: 'save' })
        .find('Button')
        .simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: SET_SAVING_STATE,
        },
        {
          intent: UPDATE_EMPLOYEE_FAILED,
          message: 'Failed',
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_EMPLOYEE,
          urlParams: { ...context },
        }),
      ]);
    });
  });

  describe('Cancel button', () => {
    it('navigates to employee list page', () => {
      const { wrapper, integration } = setup();
      integration.mapFailure(DELETE_EMPLOYEE, { message: 'Failed' });

      wrapper.update();

      wrapper
        .find({ name: 'cancel' })
        .find('Button')
        .simulate('click');
      expect(window.location.href.endsWith('/employee')).toBe(true);
    });

    it('opens Unsaved modal', () => {
      const { module, store } = setup();

      module.openUnsavedModal('');

      expect(store.getActions()).toMatchObject([
        {
          intent: OPEN_MODAL,
          modal: { type: 'UNSAVED', url: expect.any(String) },
        },
      ]);
    });
  });

  describe('Delete button', () => {
    it('opens confirmation modal upon click', () => {
      const { wrapper, store } = setup();
      wrapper.update();
      wrapper
        .find({ name: 'delete' })
        .find('Button')
        .simulate('click');

      expect(store.getActions()).toMatchObject([
        {
          intent: OPEN_MODAL,
          modal: { type: 'DELETE', url: expect.any(String) },
        },
      ]);

      expect(wrapper.find('DeleteModal')).toHaveLength(1);
    });

    it('should delete employee', () => {
      const { module, integration, store } = setup();
      integration.mapSuccess(DELETE_EMPLOYEE, {});
      module.run(context);
      store.resetActions();
      integration.resetRequests();
      module.pushMessage = jest.fn();

      module.deleteEmployee();

      expect(store.getActions()).toEqual(expect.arrayContaining(
        [
          { intent: CLOSE_MODAL },
          { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        ],
      ));
      expect(integration.getRequests()).toEqual([
        { intent: DELETE_EMPLOYEE, urlParams: { ...context } },
      ]);
      expect(module.pushMessage).toHaveBeenCalled();
    });
  });
});
