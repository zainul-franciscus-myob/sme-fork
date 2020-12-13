import { UPDATE_SCHEDULE_OPTIONS } from '../RecurringTransactionModalIntents';
import recurringTransactionModalReducer from '../RecurringTransactionModalReducer';

describe('RecurringTransactionModalReducer', () => {
  describe('UPDATE_SCHEDULE_OPTIONS', () => {
    it('updates remainingTimes when numberOfTimes is updated', () => {
      const state = {
        numberOfTimes: '0',
        remainingTimes: '0',
      };
      const action = {
        intent: UPDATE_SCHEDULE_OPTIONS,
        key: 'numberOfTimes',
        value: '5',
      };

      const actual = recurringTransactionModalReducer(state, action);

      expect(actual.schedule.remainingTimes).toEqual('5');
    });
  });
});
