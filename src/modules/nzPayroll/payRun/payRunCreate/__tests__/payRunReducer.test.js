import { RESET_STATE } from '../../../../../SystemIntents';
import { SET_LOADING_STATE } from '../PayRunIntents';
import { START_PAY_RUN } from '../payRunSteps';
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
});
