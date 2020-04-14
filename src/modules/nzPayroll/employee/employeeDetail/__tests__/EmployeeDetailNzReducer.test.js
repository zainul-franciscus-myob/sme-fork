import { LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE } from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import employeeDetailNzReducer, { getDefaultState } from '../employeeDetailNzReducer';

describe('employeeListNzReducer', () => {
  describe('setInitialState', () => {
    it('should set the default state as the initial state', () => {
      const context = {
        businessId: 'id',
        region: 'nz',
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context,
      };

      const result = employeeDetailNzReducer(undefined, action);

      expect(result).toEqual({ ...getDefaultState(), ...context });
    });
  });

  describe('resetState', () => {
    it('should set to default state when state is reset', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        contactDetail: {
          firstName: 'Bob',
          lastName: 'The Builder',
          address: 'New Zealand',
          isInactive: true,
          employeeNumber: '00012',
        },
      };

      const action = {
        intent: RESET_STATE,
      };

      const expectedState = getDefaultState();

      const result = employeeDetailNzReducer(state, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('setLoadingState', () => {
    it('should set the loading state', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };

      const loadingState = LoadingState.LOADING_SUCCESS;

      const action = {
        intent: SET_LOADING_STATE,
        loadingState,
      };

      const result = employeeDetailNzReducer(state, action);

      expect(result).toEqual({ loadingState });
    });
  });

  describe('loadEmployeeDetail', () => {
    it('should load the Employee Contact Details', () => {
      const state = getDefaultState();

      const contactDetail = {
        firstName: 'Bob',
        lastName: 'The Builder',
        address: 'New Zealand',
        isInactive: true,
        employeeNumber: '00012',
      };

      const action = {
        intent: LOAD_EMPLOYEE_DETAIL,
        contactDetail,
      };

      const result = employeeDetailNzReducer(state, action);

      expect(result).toEqual({ contactDetail, loadingState: LoadingState.LOADING_SUCCESS });
    });
  });
});
