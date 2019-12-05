import { LOAD_PAY_SUPER_LIST, SET_IS_LOADING } from '../paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import paySuperListReducer, { getDefaultState } from '../paySuperListReducer';


describe('paySuperListReducer', () => {
  describe('resetState', () => {
    it('resets state to the default state', () => {
      const state = {
        some: 'modified state',
      };
      const action = {
        intent: RESET_STATE,
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual(getDefaultState());
    });
  });

  describe('setInitialState', () => {
    it('applies the context to existing state', () => {
      const state = getDefaultState();
      const context = {
        someNew: 'state',
      };
      const action = {
        intent: SET_INITIAL_STATE,
        context,
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual({
        ...state,
        ...context,
      });
    });
  });

  describe('setIsLoading', () => {
    it('sets is loading', () => {
      const state = {
        isLoading: true,
      };
      const action = {
        intent: SET_IS_LOADING,
        isLoading: false,
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual({ isLoading: false });
    });
  });

  describe('loadPaySuperList', () => {
    it('stores the response data', () => {
      const response = {
        isRegistered: true,
        superPayments: [],
      };
      const state = {};
      const action = {
        intent: LOAD_PAY_SUPER_LIST,
        response,
      };

      const newState = paySuperListReducer(state, action);

      expect(newState).toEqual({
        ...response,
      });
    });
  });
});
