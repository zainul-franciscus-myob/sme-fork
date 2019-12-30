import { DELETE_PAY_RUN_DRAFT } from '../PayRunIntents';
import payRunReducer from '../payRunReducer';

describe('payRunReducer', () => {
  describe('DELETE_PAY_RUN_DRAFT', () => {
    it('sets draftPayRun to null, when there is a draft pay run', () => {
      const state = {
        otherThings: '123',
        startPayRun: {
          somethingElse: 'abc',
          draftPayRun: { something: 123 },
        },
      };

      const action = {
        intent: DELETE_PAY_RUN_DRAFT,
      };

      const result = payRunReducer(state, action);

      const expected = {
        otherThings: '123',
        startPayRun: {
          somethingElse: 'abc',
          draftPayRun: null,
        },
      };

      expect(result).toEqual(expected);
    });

    it('will not change anything, when there is no draft pay run', () => {
      const state = {
        otherThings: '123',
        startPayRun: {
          somethingElse: 'abc',
          draftPayRun: null,
        },
      };

      const action = {
        intent: DELETE_PAY_RUN_DRAFT,
      };

      const result = payRunReducer(state, action);

      expect(result).toEqual(state);
    });
  });
});
