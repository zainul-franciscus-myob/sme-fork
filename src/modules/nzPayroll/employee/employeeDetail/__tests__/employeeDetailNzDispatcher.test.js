import * as intents from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { tabIds } from '../tabItems';
import employeeDetailNzDispatcher from '../employeeDetailNzDispatcher';

describe('employeeDetailNzDispatcher', () => {
  let store;
  let dispatcher;

  beforeEach(() => {
    store = { dispatch: jest.fn() };
    dispatcher = employeeDetailNzDispatcher({ store });
  });

  describe('setInitialState', () => {
    it('should dispatch SET_INITIAL_STATE intent with context', () => {
      const context = {
        mainTab: 'mainTab',
        subTab: 'subTab',
        businessId: 1,
      };
      dispatcher.setInitialState(context);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
          context,
        })
      );
    });
  });

  describe('resetState', () => {
    it('should dispatch RESET_STATE intent', () => {
      dispatcher.resetState();

      expect(store.dispatch).toHaveBeenCalledWith({ intent: RESET_STATE });
    });
  });

  describe('loadEmployeeDetails', () => {
    it('should dispatch LOAD_EMPLOYEE_DETAIL intent', () => {
      const response = {};
      dispatcher.loadEmployeeDetails(response);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: intents.LOAD_EMPLOYEE_DETAIL,
          ...response,
        })
      );
    });
  });

  describe('loadEmployeeDetailsFailed', () => {
    it('should dispatch LOAD_EMPLOYEE_DETAIL_FAILED intent', () => {
      const response = {};
      dispatcher.loadEmployeeDetailsFailed(response);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: intents.LOAD_EMPLOYEE_DETAIL_FAILED,
        })
      );
    });
  });

  describe('updateEmployeeDetails', () => {
    it('should dispatch UPDATE_EMPLOYEE intent', () => {
      const response = {};
      dispatcher.updateEmployeeDetails(response);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: intents.UPDATE_EMPLOYEE,
          ...response,
        })
      );
    });
  });

  describe('updateEmployeeFailed', () => {
    it('should dispatch UPDATE_EMPLOYEE_FAILED intent', () => {
      const message = {};
      dispatcher.updateEmployeeFailed(message);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: intents.UPDATE_EMPLOYEE_FAILED,
          ...message,
        })
      );
    });
  });

  describe('deletingEmployee', () => {
    it('should dispatch DELETING_EMPLOYEE intent', () => {
      dispatcher.deletingEmployee();

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: intents.DELETING_EMPLOYEE,
        })
      );
    });
  });

  describe('deleteEmployeeFailed', () => {
    it('should dispatch DELETE_EMPLOYEE_FAILED intent', () => {
      const message = {};
      dispatcher.deleteEmployeeFailed(message);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: intents.DELETE_EMPLOYEE_FAILED,
          ...message,
        })
      );
    });
  });

  describe('updatingEmployeeDetail', () => {
    it('should dispatch SAVING_EMPLOYEE_DETAIL intent', () => {
      dispatcher.updatingEmployeeDetail();

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: intents.UPDATING_EMPLOYEE,
        })
      );
    });
  });

  describe('setMainTab', () => {
    it('should dispatch a SET_MAIN_TAB intent', () => {
      dispatcher.setMainTab(tabIds.contactDetails);
      expect(store.dispatch).toHaveBeenCalledWith({
        intent: intents.SET_MAIN_TAB,
        mainTab: tabIds.contactDetails,
      });
    });
  });

  describe('setSubTab', () => {
    it('should dispatch a SET_SUB_TAB intent', () => {
      dispatcher.setSubTab(tabIds.payrollDetails, tabIds.employmentDetails);
      expect(store.dispatch).toHaveBeenCalledWith({
        intent: intents.SET_SUB_TAB,
        mainTab: tabIds.payrollDetails,
        subTab: tabIds.employmentDetails,
      });
    });
  });
});
