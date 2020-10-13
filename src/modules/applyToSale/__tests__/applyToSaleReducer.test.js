import { SET_INITIAL_STATE } from '../../../SystemIntents';
import applyToSaleReducer from '../applyToSaleReducer';

describe('applyToSaleReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    it('set applyToSaleId to default on create', () => {
      const state = {};

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          applyToSaleId: undefined,
        },
      };

      const actual = applyToSaleReducer(state, action);

      expect(actual.applyToSaleId).toEqual('');
    });

    it('set customerReturnId to default on read', () => {
      const state = {};

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          customerReturnId: undefined,
        },
      };

      const actual = applyToSaleReducer(state, action);

      expect(actual.customerReturnId).toEqual('');
    });
  });
});
