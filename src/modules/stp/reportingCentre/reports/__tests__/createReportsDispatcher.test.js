import { SET_FILTERED_PAY_EVENTS } from '../ReportsIntents';
import createReportsDispatcher from '../createReportsDispatcher';

describe('createReportsDispatcher', () => {
  describe('clearPayEvents', () => {
    it('should create dispatch an action to clear the pay events', () => {
      let result;
      const store = {
        dispatch: (action) => {
          result = action;
          return action;
        },
      };

      createReportsDispatcher(store).clearPayEvents();

      const expected = {
        intent: SET_FILTERED_PAY_EVENTS,
        response: { payEvents: [] },
      };

      expect(result).toEqual(expected);
    });
  });
});
