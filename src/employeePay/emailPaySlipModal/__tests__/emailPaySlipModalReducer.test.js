import {
  NEXT_EMPLOYEE,
  SET_EMPLOYEE_ERRORED,
  SET_EMPLOYEE_SUCCEEDED,
  SET_LOADING_STATE,
} from '../EmailPaySlipModalIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import emailPaySlipModalReducer from '../emailPaySlipModalReducer';

describe('emailPaySlipModalReducer', () => {
  describe('setInitialState', () => {
    it('should set the initial state', () => {
      const state = {
        businessId: '',
        isOpen: false,
        isLoading: true,
        emailSettings: undefined,
        employees: [],
        currentEmployee: undefined,
        currentCount: 0,
        errors: [],
        success: [],
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: 123,
          emailSettings: {
            blah: 'blah',
          },
          employees: [{}, {}],
        },
      };

      const expected = {
        businessId: 123,
        isOpen: true,
        isLoading: true,
        emailSettings: {
          blah: 'blah',
        },
        employees: [{}, {}],
        currentEmployee: {},
        currentCount: 0,
        errors: [],
        success: [],
      };

      expect(emailPaySlipModalReducer(state, action)).toEqual(expected);
    });
  });

  describe('setLoadingState', () => {
    it('should set the loading state', () => {
      const state = {
        isLoading: true,
      };

      const action = {
        intent: SET_LOADING_STATE,
        isLoading: false,
      };

      const expected = {
        isLoading: false,
      };

      expect(emailPaySlipModalReducer(state, action)).toEqual(expected);
    });
  });

  describe('setNextEmployee', () => {
    it('should set the next employee', () => {
      const state = {
        currentCount: 1,
        employees: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
          {
            id: 4,
          },
        ],
        currentEmployee: { id: 2 },
      };

      const action = {
        intent: NEXT_EMPLOYEE,
      };

      const expected = {
        currentCount: 2,
        employees: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
          {
            id: 4,
          },
        ],
        currentEmployee: { id: 3 },
      };

      expect(emailPaySlipModalReducer(state, action)).toEqual(expected);
    });
  });

  describe('setEmployeeErrored', () => {
    it('should add the current Employee to the error list', () => {
      const state = {
        errors: [],
        currentEmployee: { id: 2 },
      };

      const action = {
        intent: SET_EMPLOYEE_ERRORED,
      };

      const expected = {
        errors: [{ id: 2 }],
        currentEmployee: { id: 2 },
      };

      expect(emailPaySlipModalReducer(state, action)).toEqual(expected);
    });
  });

  describe('setEmployeeSucceeded', () => {
    it('should add the current Employee to the success list', () => {
      const state = {
        success: [],
        currentEmployee: { id: 2 },
      };

      const action = {
        intent: SET_EMPLOYEE_SUCCEEDED,
      };

      const expected = {
        success: [{ id: 2 }],
        currentEmployee: { id: 2 },
      };

      expect(emailPaySlipModalReducer(state, action)).toEqual(expected);
    });
  });
});
