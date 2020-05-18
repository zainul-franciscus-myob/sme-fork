import { LOAD_EMPLOYEE_LIST, SET_LOADING_STATE } from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import employeeListNzDispatcher from '../employeeListNzDispatcher';

describe('employeeListNzDispatcher', () => {
  let dispatcher;
  let store;

  beforeEach(() => {
    store = { dispatch: jest.fn() };
    dispatcher = employeeListNzDispatcher({ store });
  });

  describe('setInitialState', () => {
    it('should dispatch SET_INITIAL_STATE intent with context', () => {
      const context = {};
      dispatcher.setInitialState(context);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ intent: SET_INITIAL_STATE, context }),
      );
    });
  });

  describe('resetState', () => {
    it('should dispatch RESET_STATE intent', () => {
      dispatcher.resetState();

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ intent: RESET_STATE }),
      );
    });
  });

  describe('loadEmployeeList', () => {
    it('should dispatch LOAD_EMPLOYEE_LIST intent with the response', () => {
      const response = {};
      dispatcher.loadEmployeeList(response);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: LOAD_EMPLOYEE_LIST,
          ...response,
        }),
      );
    });
  });

  describe('setLoadingState', () => {
    it('should dispatch SET_LOADING_STATE intent with the loading state', () => {
      const loadingState = LoadingState.LOADING_SUCCESS;
      dispatcher.setLoadingState(loadingState);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ intent: SET_LOADING_STATE, loadingState }),
      );
    });
  });
});
