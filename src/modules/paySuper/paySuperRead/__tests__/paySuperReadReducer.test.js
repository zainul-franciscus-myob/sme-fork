import { PREPARE_UI_FOR_REVERSE } from '../paySuperReadIntents';
import paySuperReadReducer from '../paySuperReadReducer';

describe('paySuperReadReducer', () => {
  describe('prepareUiForReverse', () => {
    it('changes all amounts to be negative', () => {
      const state = {
        superPayments: [{
          amount: 1.88,
        }],
      };
      const action = {
        intent: PREPARE_UI_FOR_REVERSE,
      };
      const expected = {
        superPayments: [{
          amount: -1.88,
        }],
      };

      const actual = paySuperReadReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
