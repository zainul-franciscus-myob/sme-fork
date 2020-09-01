import {
  SET_DIRTY_FLAG,
  SET_TURNOVER_RESULT,
  UPDATE_FORM,
} from '../GstCalculatorIntents';
import GstCalculatorReducer from '../GstCalculatorReducer';
import calculateGstTurnover from '../../mappings/data/calculateGstTurnover';

describe('GstCalculatorReducer', () => {
  const state = {
    formData: {
      exclusiveSalesYear1: '1',
      freeSalesYear1: '2',
      exclusiveSalesYear2: '',
      freeSalesYear2: '',
    },
  };

  describe('UPDATE_FORM', () => {
    it('should update form data into the state', () => {
      const action = {
        intent: UPDATE_FORM,
        key: 'exclusiveSaleYear2',
        value: '200',
      };

      const result = GstCalculatorReducer(state, action);

      expect(result.formData.exclusiveSaleYear2).toEqual('200');
    });
  });

  describe('SET_TURNOVER_RESULT', () => {
    it('should set turnover result into the state', () => {
      const action = {
        intent: SET_TURNOVER_RESULT,
        response: calculateGstTurnover,
      };

      const result = GstCalculatorReducer(state, action);

      expect(result.turnoverPercentage).toEqual(
        calculateGstTurnover.turnoverPercentage
      );
      expect(result.turnoverAmount).toEqual(
        calculateGstTurnover.turnoverAmount
      );
    });

    it('should set 0 to form data when no input', () => {
      const action = {
        intent: SET_TURNOVER_RESULT,
        response: {},
      };

      const result = GstCalculatorReducer(state, action);

      expect(result.formData.exclusiveSalesYear1).toEqual(
        state.formData.exclusiveSalesYear1
      );
      expect(result.formData.freeSalesYear1).toEqual(
        state.formData.freeSalesYear1
      );
      expect(result.formData.exclusiveSalesYear2).toEqual(0);
      expect(result.formData.freeSalesYear2).toEqual(0);
    });
  });

  describe('SET_DIRTY_FLAG', () => {
    it('should set dirty flag to true result into the state', () => {
      const action = {
        intent: SET_DIRTY_FLAG,
      };

      const result = GstCalculatorReducer(state, action);

      expect(result.isDirty).toBe(true);
    });
  });
});
