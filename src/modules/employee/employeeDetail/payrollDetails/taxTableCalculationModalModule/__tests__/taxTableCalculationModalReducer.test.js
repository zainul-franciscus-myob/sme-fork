import {
  SET_IS_OPEN,
  SET_TAX_TABLE_RESULT,
} from '../taxTableCalculationModalIntents';
import taxTableCalculationModalReducer from '../taxTableCalculationModalReducer';

describe('taxTableCalculationModalReducer', () => {
  describe('SET_IS_OPEN', () => {
    it('sets the isOpen state', () => {
      const state = {
        isOpen: false,
      };

      const action = {
        intent: SET_IS_OPEN,
        isOpen: true,
      };

      const result = taxTableCalculationModalReducer(state, action);

      expect(result).toEqual({
        isOpen: true,
      });
    });
  });

  describe('SET_TAX_TABLE_RESULT', () => {
    it('sets the result if a single result was found', () => {
      const state = {
        taxTableDescription: 'Something',
        taxTableId: 11,
      };

      const action = {
        intent: SET_TAX_TABLE_RESULT,
        taxTableResult: {
          singleTaxTableFound: true,
          id: 2,
          description: 'Something new',
        },
      };

      const result = taxTableCalculationModalReducer(state, action);

      expect(result).toEqual({
        taxTableDescription: 'Something new',
        taxTableId: 2,
      });
    });

    it('set clears the tax table fields if a single tax table was not found', () => {
      const state = {
        taxTableDescription: 'Something',
        taxTableId: 11,
      };

      const action = {
        intent: SET_TAX_TABLE_RESULT,
        taxTableResult: {
          singleTaxTableFound: false,
        },
      };

      const result = taxTableCalculationModalReducer(state, action);

      expect(result).toEqual({
        taxTableDescription: null,
        taxTableId: null,
      });
    });
  });
});
