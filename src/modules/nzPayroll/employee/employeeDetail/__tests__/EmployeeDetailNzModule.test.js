import { mount } from 'enzyme';

import * as intents from '../../EmployeeNzIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { tabIds } from '../tabItems';
import ContactDetailsNzTabView from '../contactDetails/components/ContactDetailsNzTabView';
import EmployeeDetailNzModule from '../EmployeeDetailNzModule';
import EmployeeDetailsNzView from '../components/EmployeeDetailsNzView';
import EmploymentDetailsTab from '../employmentDetails/components/EmploymentDetailsTab';
import LeaveTabView from '../leave/components/LeaveTabView';
import LoadingFailPageState from '../../../../../components/PageView/LoadingFailPageState';
import SalaryAndWagesTabView from '../salaryAndWages/components/SalaryAndWagesTabView';
import TaxAndKiwiSaverTab from '../taxAndKiwiSaver/components/TaxAndKiwiSaverTab';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import employeeDetailNzDispatcher from '../employeeDetailNzDispatcher';
import employeeDetailNzIntegrator from '../employeeDetailNzIntegrator';
import employeeDetailNzReducer from '../employeeDetailNzReducer';
import employeeDetailResponse from '../../mappings/data/employeeDetailEntry';
import updateEmployeeDetailResponse from '../../mappings/data/updateEmployeeDetailResponse';

describe('EmployeeDetailNzModule', () => {
  afterEach(jest.clearAllMocks);

  const replaceURLParams = jest.fn();
  const setup = () => {
    const store = new TestStore(employeeDetailNzReducer);
    const integration = new TestIntegration();
    const popMessages = () => [];
    const pushMessages = () => [];

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new EmployeeDetailNzModule({
      integration,
      setRootView,
      replaceURLParams,
      popMessages,
      pushMessages,
    });
    module.store = store;
    module.dispatcher = employeeDetailNzDispatcher({ store });
    module.integrator = employeeDetailNzIntegrator({ store, integration });

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

  const context = { businessId: '1', employeeId: '2' };

  describe('run', () => {
    it('should load employee detail successfully', () => {
      const { store, integration, module, wrapper } = setup();
      integration.mapSuccess(
        intents.LOAD_EMPLOYEE_DETAIL,
        employeeDetailResponse
      );

      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: intents.LOAD_EMPLOYEE_DETAIL,
          payload: employeeDetailResponse,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: intents.LOAD_EMPLOYEE_DETAIL,
          urlParams: { ...context },
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(EmployeeDetailsNzView).exists()).toBe(true);
      expect(wrapper.find(ContactDetailsNzTabView).exists()).toBe(true);
    });

    it('should display LoadingFailPageState when integration fails', () => {
      const { store, integration, module, wrapper } = setup();

      integration.mapFailure(intents.LOAD_EMPLOYEE_DETAIL);

      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: intents.LOAD_EMPLOYEE_DETAIL_FAILED,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: intents.LOAD_EMPLOYEE_DETAIL,
          urlParams: { ...context },
        }),
      ]);

      wrapper.update();
      expect(wrapper.find(EmployeeDetailsNzView).exists()).toBe(true);
      expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    });
  });

  it('should load new employee detail', () => {
    const { store, integration, module, wrapper } = setup();
    const newContext = { businessId: 'id', employeeId: 'new' };
    module.run(newContext);

    expect(store.getActions()).toMatchObject([
      {
        intent: SET_INITIAL_STATE,
        context: newContext,
      },
      {
        intent: intents.LOAD_EMPLOYEE_DETAIL,
        payload: expect.anything(),
      },
    ]);

    expect(integration.getRequests()).toMatchObject([
      { intent: intents.LOAD_NEW_EMPLOYEE_DETAIL },
    ]);

    wrapper.update();
    expect(wrapper.find(EmployeeDetailsNzView).exists()).toBe(true);
    expect(wrapper.find(ContactDetailsNzTabView).exists()).toBe(true);
  });

  describe('Sub tabs', () => {
    describe('When clicking tab payroll details tab', () => {
      it('should move to payroll details page', () => {
        const { integration, module, wrapper } = setup();
        integration.mapSuccess(
          intents.LOAD_EMPLOYEE_DETAIL,
          employeeDetailResponse
        );

        module.run(context);
        wrapper.update();

        wrapper
          .find('TabItem')
          .findWhere((c) => c.prop('item')?.id === 'payrollDetails')
          .find('a')
          .simulate('click');
        wrapper.update();

        expect(wrapper.find(EmploymentDetailsTab).exists()).toBe(true);
      });

      it('should update the url', () => {
        const { integration, module, wrapper } = setup();
        integration.mapSuccess(
          intents.LOAD_EMPLOYEE_DETAIL,
          employeeDetailResponse
        );

        module.run(context);
        wrapper.update();

        wrapper
          .find('TabItem')
          .findWhere((c) => c.prop('item')?.id === 'payrollDetails')
          .find('a')
          .simulate('click');
        wrapper.update();

        expect(replaceURLParams).toHaveBeenLastCalledWith({
          mainTab: 'payrollDetails',
          subTab: 'employmentDetails',
        });
      });
    });

    describe.each([
      [{ mainTab: tabIds.contactDetails }, ContactDetailsNzTabView],
      [{ mainTab: tabIds.payrollDetails }, EmploymentDetailsTab],
      [{ mainTab: tabIds.payrollDetails }, EmploymentDetailsTab],
      [
        { mainTab: tabIds.payrollDetails, subTab: tabIds.salaryAndWages },
        SalaryAndWagesTabView,
      ],
      [{ mainTab: tabIds.payrollDetails, subTab: tabIds.leave }, LeaveTabView],
      [
        { mainTab: tabIds.payrollDetails, subTab: tabIds.taxAndKiwiSaver },
        TaxAndKiwiSaverTab,
      ],
    ])('When tab %p is selected', ({ mainTab, subTab }, TabView) => {
      it(`should display ${TabView.displayName}`, () => {
        const { integration, module, wrapper } = setup();
        integration.mapSuccess(
          intents.LOAD_EMPLOYEE_DETAIL,
          employeeDetailResponse
        );

        module.run(context);
        module.setMainTab(mainTab);
        if (subTab) {
          module.setSubTab(mainTab, subTab);
        }
        wrapper.update();

        expect(wrapper.find(TabView).exists()).toEqual(true);
      });
    });
  });

  describe('Save button', () => {
    it('should save successfully', () => {
      const { store, integration, module, wrapper } = setup();

      integration.mapSuccess(
        intents.UPDATE_EMPLOYEE,
        updateEmployeeDetailResponse
      );

      module.run(context);
      wrapper.update();

      store.resetActions();
      integration.resetRequests();

      wrapper.find({ name: 'save' }).find('Button').simulate('click');

      wrapper.update();

      expect(store.getActions()).toEqual([
        {
          intent: intents.UPDATING_EMPLOYEE,
        },
        {
          intent: intents.UPDATE_EMPLOYEE,
          ...updateEmployeeDetailResponse,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: intents.UPDATE_EMPLOYEE,
          urlParams: { ...context },
        }),
      ]);
    });

    it('should handle save failure', () => {
      const { store, integration, module, wrapper } = setup();

      integration.mapFailure(intents.UPDATE_EMPLOYEE, {
        message: 'Failed',
      });

      module.run(context);
      wrapper.update();

      store.resetActions();
      integration.resetRequests();

      wrapper.find({ name: 'save' }).find('Button').simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: intents.UPDATING_EMPLOYEE,
        },
        {
          intent: intents.UPDATE_EMPLOYEE_FAILED,
          message: 'Failed',
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: intents.UPDATE_EMPLOYEE,
          urlParams: { ...context },
        }),
      ]);
    });

    it('should reloads module with new employeeID when creating new employee', () => {
      const { module, wrapper, integration } = setup();
      const newContext = { businessId: 'id', employeeId: 'new' };
      integration.mapSuccess(intents.UPDATE_EMPLOYEE, { employeeId: 1234 });
      module.run(newContext);
      module.pushMessage = jest.fn();
      wrapper.update();

      module.onSaveButtonClick();

      expect(window.location.href.includes('new')).toBe(false);
      expect(window.location.href.includes('1234')).toBe(true);
    });
  });

  describe('Cancel button', () => {
    it('navigates to employee list page', () => {
      const { wrapper, integration } = setup();
      integration.mapFailure(intents.DELETE_EMPLOYEE, { message: 'Failed' });
      wrapper.update();

      wrapper.find({ name: 'cancel' }).find('Button').simulate('click');

      expect(window.location.href.endsWith('/employee')).toBe(true);
    });

    it('opens Unsaved modal', () => {
      const { module, store } = setup();

      module.openUnsavedModal('');

      expect(store.getActions()).toMatchObject([
        {
          intent: intents.OPEN_UNSAVED_MODAL,
          modal: { type: 'UNSAVED', url: expect.any(String) },
        },
      ]);
    });
  });

  describe('Delete button', () => {
    it('opens confirmation modal upon click', () => {
      const { wrapper, store } = setup();
      wrapper.update();
      wrapper.find({ name: 'delete' }).find('Button').simulate('click');

      expect(store.getActions()).toMatchObject([
        {
          intent: intents.OPEN_DELETE_MODAL,
          modal: { type: 'DELETE', url: expect.any(String) },
        },
      ]);

      expect(wrapper.find('DeleteModal')).toHaveLength(1);
    });

    it('should delete employee', () => {
      const { module, integration, store } = setup();
      integration.mapSuccess(intents.DELETE_EMPLOYEE, {});
      module.run(context);
      store.resetActions();
      integration.resetRequests();
      module.pushMessage = jest.fn();

      module.deleteEmployee();

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { intent: intents.CLOSE_MODAL },
          { intent: intents.DELETING_EMPLOYEE },
        ])
      );
      expect(integration.getRequests()).toEqual([
        { intent: intents.DELETE_EMPLOYEE, urlParams: { ...context } },
      ]);
      expect(module.pushMessage).toHaveBeenCalled();
    });
  });
});
