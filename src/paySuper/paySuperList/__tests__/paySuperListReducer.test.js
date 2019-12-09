import {
  LOAD_PAY_SUPER_LIST, SET_ALERT, SET_IS_LOADING, SET_IS_TABLE_LOADING, SET_SORT_ORDER,
} from '../paySuperIntents';
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

  describe('setIsTableLoading', () => {
    it('sets is table loading', () => {
      const state = {
        isTableLoading: true,
      };
      const action = {
        intent: SET_IS_TABLE_LOADING,
        isTableLoading: false,
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual({ isTableLoading: false });
    });
  });

  describe('setSortOrder', () => {
    it('updates the orderBy column name and sets descending to true', () => {
      const state = {
        sortDescending: false,
        orderBy: 'date',
      };

      const action = {
        intent: SET_SORT_ORDER,
        orderBy: 'amount',
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual({
        sortDescending: true,
        orderBy: 'amount',
      });
    });

    it('toggles descending to false if the column name doesn\'t change', () => {
      const state = {
        sortDescending: true,
        orderBy: 'date',
      };

      const action = {
        intent: SET_SORT_ORDER,
        orderBy: 'date',
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual({
        sortDescending: false,
        orderBy: 'date',
      });
    });

    it('toggles descending to true if the column name doesn\'t change', () => {
      const state = {
        sortDescending: false,
        orderBy: 'date',
      };

      const action = {
        intent: SET_SORT_ORDER,
        orderBy: 'date',
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual({
        sortDescending: true,
        orderBy: 'date',
      });
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

  describe('alerts', () => {
    it('can set alert', () => {
      const state = {
        alert: null,
      };

      const action = {
        intent: SET_ALERT,
        alert: {
          type: 'danger',
          message: 'Danger will robinson',
        },
      };

      const newState = paySuperListReducer(state, action);

      expect(newState).toEqual({
        alert: {
          type: 'danger',
          message: 'Danger will robinson',
        },
      });
    });

    it('can dismiss alert', () => {
      const state = {
        alert: {
          type: 'danger',
          message: 'Danger will robinson',
        },
      };

      const action = {
        intent: SET_ALERT,
        alert: null,
      };

      const newState = paySuperListReducer(state, action);

      expect(newState).toEqual({
        alert: null,
      });
    });
  });
});
