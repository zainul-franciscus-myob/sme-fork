import {
  UPDATE_PAYMENT_DETAILS,
} from '../../../EmployeeIntents';
import employeeDetailReducer from '../employeeDetailReducer';

describe('employeeDetailReducer', () => {
  describe('updatePaymentDetails', () => {
    it('should add a character to the bank statement text', () => {
      const initialState = {
        paymentDetails: {
          bankStatementText: '',
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'bankStatementText',
        value: 'MY',
      };

      const expected = {
        bankStatementText: 'MY',
      };

      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });

    it('should not allow length of the bank statement text to exceed 18 characters', () => {
      const stringOfLength18 = 'MY NAME IS MATTIAS';
      const initialState = {
        paymentDetails: {
          bankStatementText: stringOfLength18,
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'bankStatementText',
        value: `${stringOfLength18}b`,
      };

      const expected = initialState.paymentDetails;
      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });

    it('should only allow the following special characters: &*./- in the bank statement text', () => {
      const initialState = {
        paymentDetails: {
          bankStatementText: 'BL& NO* // -.',
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'bankStatementText',
        value: 'BL& NO* // -.$',
      };

      const expected = initialState.paymentDetails;
      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });

    it('should allow all numbers, upper case characters and white space in the bank statement text', () => {
      const initialState = {
        paymentDetails: {
          bankStatementText: 'ABC0123456789',
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'bankStatementText',
        value: 'ABC0123456789 ',
      };

      const expected = {
        bankStatementText: 'ABC0123456789 ',
      };

      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });

    it('should convert lower case characters into uppercase characters entered in the bank statement text', () => {
      const initialState = {
        paymentDetails: {
          bankStatementText: 'ABC0123',
        },
      };

      const newTextWithLowerCaseChar = 'ABC0123x';
      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'bankStatementText',
        value: newTextWithLowerCaseChar,
      };

      const expected = {
        bankStatementText: 'ABC0123X',
      };

      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });
  });
});
