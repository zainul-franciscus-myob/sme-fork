import {
  FORMAT_DECIMAL_PLACES,
  UPDATE_WAGE_DETAIL,
} from '../salaryAndWagesIntents';
import salaryAndWageReducers from '../salaryAndWageReducer';

describe('salaryAndWageReducer', () => {
  let reducer;
  describe(`intent: ${UPDATE_WAGE_DETAIL.toString()}`, () => {
    beforeEach(() => {
      reducer = salaryAndWageReducers[UPDATE_WAGE_DETAIL];
    });

    it('should update the wage object with the provided key/value', () => {
      const state = {};

      expect(reducer(state, { key: 'key', value: 'new value' })).toMatchObject({
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
      expect(
        reducer(state, { key: 'something else', value: 'value' })
      ).toMatchObject(state);
    });

    describe(`intent: ${FORMAT_DECIMAL_PLACES.toString()}`, () => {
      beforeEach(() => {
        reducer = salaryAndWageReducers[FORMAT_DECIMAL_PLACES];
      });

      it('should default to 0.00 when no value is provided for the key', () => {
        const state = { payrollDetails: { wage: { hourlyRate: '46.00' } } };
        const action = { key: 'hourlyRate' };
        const formattedPayrollDetails = reducer(state, action);
        expect(formattedPayrollDetails).toMatchObject({
          payrollDetails: { wage: { hourlyRate: '0.00' } },
        });
        expect(formattedPayrollDetails).toMatchObject({
          isPageEdited: true,
        });
      });

      it.each([
        ['46.2', '46.20'],
        ['46', '46.00'],
        ['46.23', '46.23'],
        ['46.234', '46.234'],
        ['46.2345', '46.2345'],
        ['46.9999', '46.9999'],
      ])(
        'should format to: %i when given value for key is: %i',
        (actual, expected) => {
          const state = { payrollDetails: { wage: { hourlyRate: '12' } } };
          const action = { key: 'hourlyRate', value: actual };
          const formattedPayrollDetails = reducer(state, action);
          expect(formattedPayrollDetails).toMatchObject({
            payrollDetails: { wage: { hourlyRate: expected } },
          });
          expect(formattedPayrollDetails).toMatchObject({
            isPageEdited: true,
          });
        }
      );
    });
  });
});
