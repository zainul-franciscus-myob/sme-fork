import { UPDATE_WAGE_DETAIL } from '../salaryAndWagesIntents';
import salaryAndWageDispatcher from '../salaryAndWageDispatcher';

describe('employeeDetailNzDispatcher', () => {
  let store;
  let dispatcher;

  beforeEach(() => {
    store = { dispatch: jest.fn() };
    dispatcher = salaryAndWageDispatcher(store);
  });

  describe('updateWageDetails', () => {
    it('should dispatch UPDATE_WAGE_DETAIL intent', () => {
      const key = 'key';
      const value = 'value';

      dispatcher.updateWageDetail({ key, value });

      expect(store.dispatch).toHaveBeenCalledWith({
        intent: UPDATE_WAGE_DETAIL,
        key,
        value,
      });
    });
  });
});
