import { LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE } from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
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
      const context = {};
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

      expect(store.dispatch).toHaveBeenCalledWith(RESET_STATE);
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
});
