import { UPDATE_WAGE_DETAIL } from '../salaryAndWagesIntents';
import createSalaryAndWageDispatcher from '../createSalaryAndWageDispatcher';


describe('createEmployeeDetailNzDispatcher', () => {
  let store;
  let salaryAndWageDispatcher;

  beforeEach(() => {
    store = { dispatch: jest.fn() };
    salaryAndWageDispatcher = createSalaryAndWageDispatcher(store);
  });

  describe('updateWageDetails', () => {
    it('should dispatch UPDATE_WAGE_DETAIL intent', () => {
      const key = 'key';
      const value = 'value';

      salaryAndWageDispatcher.updateWageDetail({ key, value });

      expect(store.dispatch).toHaveBeenCalledWith({
        intent: UPDATE_WAGE_DETAIL,
        key,
        value,
      });
    });
  });
});
