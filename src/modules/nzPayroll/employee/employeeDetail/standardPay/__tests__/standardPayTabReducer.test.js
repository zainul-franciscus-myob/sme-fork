import * as intents from '../../EmployeeDetailNzIntents';
import standardPayTabReducer from '../standardPayTabReducer';

describe('standardPayTabReducer', () => {
  describe('updateWageDetails', () => {
    it('should update state with supplied key and value', () => {
      const reducer = standardPayTabReducer[intents.UPDATE_WAGE_DETAIL];
      const state = {
        payrollDetails: { wage: { hourlyRate: 'some-data' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { wage: { hourlyRate: '5' } },
      };

      const action = { key: 'hourlyRate', value: '5' };

      expect(reducer(state, action)).toMatchObject(expected);
    });

    it('should format value and update state when shouldFormat is true', () => {
      const reducer = standardPayTabReducer[intents.UPDATE_WAGE_DETAIL];
      const state = {
        payrollDetails: { wage: { hourlyRate: 'some-data' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { wage: { hourlyRate: '5.00' } },
      };

      const action = { key: 'hourlyRate', value: '5', shouldFormat: true };

      expect(reducer(state, action)).toMatchObject(expected);
    });
  });
});
