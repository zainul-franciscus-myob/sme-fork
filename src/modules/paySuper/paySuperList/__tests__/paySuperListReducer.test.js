import {
  LOAD_PAY_SUPER_LIST,
  LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
  SET_ALERT,
  SET_IS_TABLE_LOADING,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
} from '../paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
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

  describe('setLoadingState', () => {
    it('sets loading state', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };
      const action = {
        intent: SET_LOADING_STATE,
        loadingState: LoadingState.LOADING_SUCCESS,
      };

      const result = paySuperListReducer(state, action);

      expect(result).toEqual({ loadingState: LoadingState.LOADING_SUCCESS });
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
        superPayments: [
          {
            amount: '88,888.88',
            batchPaymentId: '13861',
            businessEventId: 26,
            dateOccurred: '24/02/2017',
            employeeCount: 3,
            displayId: 'PS000001',
            description: 'Superannuation Payment',
            status: 'Authorised',
          },
        ],
        paySuperUrl: 'some-url',
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

  describe('updateSuperPaymentStatus', () => {
    it('updates matching super payment statuses', () => {
      const response = [
        {
          batchPaymentId: '1',
          status: 'Created',
        },
      ];
      const state = {
        superPayments: [{
          batchPaymentId: '1',
          status: 'Authorised',
        }],
      };
      const action = {
        intent: LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
        response,
      };

      const newState = paySuperListReducer(state, action);

      expect(newState).toEqual({
        superPayments: [{
          batchPaymentId: '1',
          status: 'Created',
        }],
      });
    });

    it('does not update non-matching super payment statuses', () => {
      const response = [
        {
          batchPaymentId: '2',
          status: 'Created',
        },
      ];
      const state = {
        superPayments: [{
          batchPaymentId: '1',
          status: 'Authorised',
        }],
      };
      const action = {
        intent: LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
        response,
      };

      const newState = paySuperListReducer(state, action);

      expect(newState).toEqual(state);
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
