import { LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE } from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import employeeDetailNzReducer from '../employeeDetailNzReducer';

const defaultState = {
  loadingState: LoadingState.LOADING,
  contactDetail: {
    firstName: '',
    lastName: '',
    isInactive: false,
    employeeNumber: '',
    country: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    phoneNumbers: [],
    email: '',
    notes: '',
  },
};

describe('EmployeeDetailNzReducer', () => {
  describe('setInitialState', () => {
    it('should set initial state with context', () => {
      const context = {
        businessId: 'id',
        region: 'nz',
      };
      const action = {
        intent: SET_INITIAL_STATE,
        context,
      };

      const result = employeeDetailNzReducer(undefined, action);

      expect(result).toEqual({ ...defaultState, ...context });
    });
  });

  describe('resetState', () => {
    it('resets state to the default state', () => {
      const state = {
        firstName: 'Bob',
        businessId: 'id',
      };
      const action = {
        intent: RESET_STATE,
      };

      const result = employeeDetailNzReducer(state, action);

      expect(result).toEqual(defaultState);
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
      const contactDetail = {
        firstName: 'Bob',
        lastName: 'The Builder',
        isInactive: true,
        employeeNumber: '00012',
        country: 'New Zealand',
        address: '2/34 Park Avenue',
        suburb: 'Auckland',
        state: '',
        postcode: '7400',
        email: 'e@email.com',
        phoneNumbers: [
          '03 93883848',
          '03 94839483',
          '03 94839482',
        ],
        notes: '',
      };
      const action = {
        intent: LOAD_EMPLOYEE_DETAIL,
        contactDetail,
      };

      const result = employeeDetailNzReducer({}, action);

      expect(result).toEqual({ contactDetail, loadingState: LoadingState.LOADING_SUCCESS });
    });
  });
});
