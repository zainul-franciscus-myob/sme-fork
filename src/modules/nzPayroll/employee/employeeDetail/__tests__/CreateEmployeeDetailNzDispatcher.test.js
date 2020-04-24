import {
  LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE, SET_MAIN_TAB, SET_SUB_TAB,
} from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { tabIds } from '../tabItems';
import LoadingState from '../../../../../components/PageView/LoadingState';
import createEmployeeDetailNzDispatcher from '../createEmployeeDetailNzDispatcher';

describe('createEmployeeDetailNzDispatcher', () => {
  let store;
  let employeeDetailNzDispatcher;

  beforeEach(() => {
    store = { dispatch: jest.fn() };
    employeeDetailNzDispatcher = createEmployeeDetailNzDispatcher({ store });
  });

  describe('setInitialState', () => {
    it('should dispatch SET_INITIAL_STATE intent with context', () => {
      const context = {
        mainTab: 'mainTab',
        subTab: 'subTab',
        businessId: 1,
      };
      employeeDetailNzDispatcher.setInitialState(context);

      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        intent: SET_INITIAL_STATE,
        context,
      }));
    });
  });

  describe('resetState', () => {
    it('should dispatch RESET_STATE intent', () => {
      employeeDetailNzDispatcher.resetState();

      expect(store.dispatch).toHaveBeenCalledWith({ intent: RESET_STATE });
    });
  });

  describe('loadEmployeeDetails', () => {
    it('should dispatch LOAD_EMPLOYEE_DETAIL intent', () => {
      const response = {};
      employeeDetailNzDispatcher.loadEmployeeDetails(response);

      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_EMPLOYEE_DETAIL,
        ...response,
      }));
    });
  });

  describe('setLoadingState', () => {
    it('should dispatch SET_LOADING_STATE intent', () => {
      const loadingState = LoadingState.LOADING_SUCCESS;
      employeeDetailNzDispatcher.setLoadingState(loadingState);

      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        intent: SET_LOADING_STATE,
        loadingState,
      }));
    });
  });

  describe('setMainTab', () => {
    it('should dispatch a SET_MAIN_TAB intent', () => {
      employeeDetailNzDispatcher.setMainTab(tabIds.contactDetails);
      expect(store.dispatch).toHaveBeenCalledWith({
        intent: SET_MAIN_TAB,
        mainTab: tabIds.contactDetails,
      });
    });
  });

  describe('setSubTab', () => {
    it('should dispatch a SET_SUB_TAB intent', () => {
      employeeDetailNzDispatcher.setSubTab(tabIds.payrollDetails, tabIds.employmentDetails);
      expect(store.dispatch).toHaveBeenCalledWith({
        intent: SET_SUB_TAB,
        mainTab: tabIds.payrollDetails,
        subTab: tabIds.employmentDetails,
      });
    });
  });
});
