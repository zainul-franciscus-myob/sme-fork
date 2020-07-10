import { EMPLOYEE_PAY_LIST, START_PAY_RUN } from '../payRunSteps';
import {
  NEXT_STEP, SET_LOADING_STATE, SET_SUBMITTING_STATE, SET_TOTAL_TAKE_HOME_PAY,
} from '../PayRunIntents';
import { RESET_STATE } from '../../../../../SystemIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import payRunReducer from '../payRunReducer';

describe('NZ Payrun reducer', () => {
  describe('Default state', () => {
    it('is as expected', () => {
      const state = {};
      const action = {
        intent: RESET_STATE,
      };

      const actual = payRunReducer(state, action);
      expect(actual.step).toBe(START_PAY_RUN);
      expect(actual.loadingState).toBe(LoadingState.LOADING);
    });
  });

  describe('Set state', () => {
    it('should change loading state to complete', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };
      const action = {
        intent: SET_LOADING_STATE,
        loadingState: LoadingState.LOADING_SUCCESS,
      };

      const actual = payRunReducer(state, action);
      expect(actual.loadingState).toBe(LoadingState.LOADING_SUCCESS);
    });
  });

  describe('Set total take home pay', () => {
    it('should change loading state to complete', () => {
      const state = {
        totalTakeHomePay: '10000',
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: 'weekly',
            paymentDate: '2019-10-28',
            payPeriodStart: '2019-10-21',
            payPeriodEnd: '2019-10-27',
          },
        },
      };

      const action = {
        intent: SET_TOTAL_TAKE_HOME_PAY,
        totalTakeHomePay: '10000',
      };

      const expected = {
        paymentFrequency: 'weekly',
        paymentDate: 'Mon 28/10/2019',
        payPeriodStart: 'Mon 21/10/2019',
        payPeriodEnd: 'Sun 27/10/2019',
        totalTakeHomePay: '10000',
      };

      const actual = payRunReducer(state, action);

      expect(actual.totalTakeHomePay).toBe(expected.totalTakeHomePay);
    });
  });

  describe('Next step', () => {
    it('should return the next expected step', () => {
      const state = {
        step: START_PAY_RUN,
      };

      const action = {
        intent: NEXT_STEP,
      };

      const expected = {
        step: EMPLOYEE_PAY_LIST,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Set is submitting', () => {
    it('should set isSubmitting to input value', () => {
      const state = {
        isSubmitting: false,
      };

      const action = {
        intent: SET_SUBMITTING_STATE,
        isSubmitting: true,
      };

      const expected = {
        isSubmitting: true,

      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
