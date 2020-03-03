import { SET_TAX_FILE_NUMBER_STATUS } from '../../../../EmployeeIntents';
import employeeDetailReducer from '../../../employeeDetailReducer';

describe('PayrollTaxReducer', () => {
  describe('SET_TAX_FILE_NUMBER_STATUS', () => {
    it('updates the status', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStatus: 'OLD_VALUE',
            taxFileNumberStates: {
              hasTfn: {
                tfn: '',
                tfnEditable: true,
                hasTfn: true,
              },
              waitingOnTfn: {
                tfn: '111 111 111',
                tfnEditable: false,
                hasTfn: false,
              },
            },
          },
        },
      };

      const action = {
        intent: SET_TAX_FILE_NUMBER_STATUS,
        value: 'hasTfn',
      };

      const result = employeeDetailReducer(state, action);

      expect(result.payrollDetails.tax.taxFileNumberStatus).toEqual('hasTfn');
    });

    it('sets the tax file number', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStatus: 'OLD_VALUE',
            taxFileNumber: '333',
            taxFileNumberStates: {
              hasTfn: {
                tfn: '',
                tfnEditable: true,
                hasTfn: true,
              },
              waitingOnTfn: {
                tfn: '111 111 111',
                tfnEditable: false,
                hasTfn: false,
              },
            },
          },
        },
      };

      const action = {
        intent: SET_TAX_FILE_NUMBER_STATUS,
        value: 'waitingOnTfn',
      };

      const result = employeeDetailReducer(state, action);

      expect(result.payrollDetails.tax.taxFileNumber).toEqual('111 111 111');
    });
  });
});
