import { UPDATE_WAGE_DETAIL } from '../salaryAndWagesIntents';
import salaryAndWageReducers from '../slarayAndWageReducer';


describe('salaryAndWageReducer', () => {
  describe(`intent: ${UPDATE_WAGE_DETAIL.toString()}`, () => {
    const reducer = salaryAndWageReducers[UPDATE_WAGE_DETAIL];

    it('should update the wage object with the provided key/value', () => {
      const state = {};

      expect(reducer(state, { key: 'key', value: 'new value' }))
        .toMatchObject({
          payrollDetails: {
            wage: {
              key: 'new value',
            },
          },
        });
    });

    it('should copy the existing values', () => {
      const state = {
        otherKeys: 'value',
        payrollDetails: {
          otherKeys: 'value',
          wage: {
            key: 'original value',
          },
        },
      };
      expect(reducer(state, { key: 'something else', value: 'value' }))
        .toMatchObject(state);
    });
  });
});
