import {
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_FAILED,
  SET_ALERT,
  SORT_AND_FILTER_EMPLOYEE_LIST,
} from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import employeeListNzReducer from '../employeeListNzReducer';

describe('employeeListNzReducer', () => {
  describe('loadEmployeeListFailed', () => {
    it('should set loading state to LOADING_FAIL', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };

      const action = {
        intent: LOAD_EMPLOYEE_LIST_FAILED,
      };

      const result = employeeListNzReducer(state, action);

      expect(result).toEqual({ loadingState: LoadingState.LOADING_FAIL });
    });
  });

  describe('loadEmployeeList', () => {
    it('should add the employee list response to state', () => {
      const employeeListResponse = {
        entries: [
          {
            id: '123',
            name: 'Employee, One',
          },
        ],
      };

      const state = { isTableLoading: false };

      const action = {
        intent: LOAD_EMPLOYEE_LIST,
        ...employeeListResponse,
      };

      const newState = employeeListNzReducer(state, action);

      expect(newState).toMatchObject({ ...employeeListResponse });
    });
  });

  describe('resetState', () => {
    it('resets state to the default state', () => {
      const state = {
        fake: 'state',
      };
      const expectedState = {
        loadingState: LoadingState.LOADING,
        entries: [],
        filterOptions: {
          keywords: '',
          showInactive: false,
        },
        pagination: {
          hasNextPage: false,
          offset: 0,
        },
        orderBy: '',
        sortOrder: '',
        isTableLoading: false,
      };
      const action = {
        intent: RESET_STATE,
      };

      const result = employeeListNzReducer(state, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('setInitialState', () => {
    it('should add business id and region to state from passed in context', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };
      const context = {
        businessId: 'id',
        region: 'nz',
      };
      const action = {
        intent: SET_INITIAL_STATE,
        context,
      };

      const result = employeeListNzReducer(state, action);

      expect(result).toEqual({ ...state, ...context });
    });
  });

  describe('setAlert', () => {
    const alert = {
      type: 'some-type',
      message: 'message',
    };

    it('should set passed in alert into store', () => {
      const state = { some: 'props' };
      const action = {
        intent: SET_ALERT,
        alert,
      };
      const expectedState = {
        ...state,
        alert,
      };

      const result = employeeListNzReducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should set alert to undefined', () => {
      const action = {
        intent: SET_ALERT,
        alert: undefined,
      };
      const expectedState = { alert: undefined };
      const state = { alert };

      const result = employeeListNzReducer(state, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('sortAndFilterEmployeeList', () => {
    it('sets pagination.hasNextPage to true when action.hasNextPage is true', () => {
      const action = {
        intent: SORT_AND_FILTER_EMPLOYEE_LIST,
        pagination: {
          hasNextPage: true,
        },
      };
      const state = {
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = employeeListNzReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(true);
    });

    it('sets pagination.hasNextPage to false when action.hasNextPage is false', () => {
      const action = {
        intent: SORT_AND_FILTER_EMPLOYEE_LIST,
        pagination: {
          hasNextPage: false,
        },
      };
      const state = {
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = employeeListNzReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(false);
    });
  });
});
