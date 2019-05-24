import { FORMAT_AMOUNT_INPUT } from '../../BillPaymentIntents';
import billPaymentDetailReducer from '../billPaymentDetailReducer';

describe('billPaymentDetailReducer', () => {
  describe('FORMAT_AMOUNT_INPUT', () => {
    it('formats amount input to 2 decimals', () => {
      const key = 'key';
      const value = '10';
      const index = 1;
      const state = {
        entries: [{
          key: 'value',
        },
        {
          key: '1',
        }],
      };
      const action = {
        key, value, index, intent: FORMAT_AMOUNT_INPUT,
      };

      const expected = {
        entries: [{
          key: 'value',
        },
        {
          key: '10.00',
        }],
      };
      const actual = billPaymentDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
