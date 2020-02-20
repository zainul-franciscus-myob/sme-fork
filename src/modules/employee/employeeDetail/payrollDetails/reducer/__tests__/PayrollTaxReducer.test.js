import { UPDATE_TAX_FILE_NUMBER } from '../../../../EmployeeIntents';
import employeeDetailReducer from '../../../employeeDetailReducer';

describe('PayrollTaxReducer', () => {
  describe('updateTaxFileNumber', () => {
    it('should update the TFN', () => {
      const expected = '123123123';
      const state = {
        payrollDetails: {
          tax: {},
        },
      };
      const action = {
        intent: UPDATE_TAX_FILE_NUMBER,
        taxFileNumber: '123123123',
      };

      const actual = employeeDetailReducer(state, action);

      expect(actual.payrollDetails.tax.taxFileNumber).toEqual(expected);
    });
  });
});
