import {
  SET_MAIN_TAB,
  UPDATE_PAYMENT_DETAILS,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
} from '../../EmployeeIntents';
import employeeDetailReducer from '../employeeDetailReducer';

describe('employeeDetailReducer', () => {
  describe('updatePayrollEmployeeEmail', () => {
    it('sets email to Contact detail when contact email is present, paySlip email is blank and'
      + ' paySlip delivery is to be emailed when delivery method is changed', () => {
      const email = 'foo@bar.com';
      const state = {
        contactDetail: {
          email,
        },
        payrollDetails: {
          employmentDetails: {
            paySlipEmail: '',
            paySlipDelivery: 'ToBePrinted',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
        key: 'paySlipDelivery',
        value: 'ToBeEmailed',
      };

      const expected = {
        contactDetail: {
          email,
        },
        payrollDetails: {
          employmentDetails: {
            paySlipEmail: email,
            paySlipDelivery: 'ToBeEmailed',
          },
        },
        isPageEdited: true,
      };

      const actual = employeeDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('sets email to Contact detail when contact email is present, paySlip email is blank and'
      + ' paySlip delivery is to be printed and emailed when delivery method is changed', () => {
      const email = 'foo@bar.com';
      const state = {
        contactDetail: {
          email,
        },
        payrollDetails: {
          employmentDetails: {
            paySlipEmail: '',
            paySlipDelivery: 'ToBePrinted',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
        key: 'paySlipDelivery',
        value: 'ToBePrintedAndEmailed',
      };

      const expected = {
        contactDetail: {
          email,
        },
        payrollDetails: {
          employmentDetails: {
            paySlipEmail: email,
            paySlipDelivery: 'ToBePrintedAndEmailed',
          },
        },
        isPageEdited: true,
      };

      const actual = employeeDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('sets email to Contact detail when contact email is present, paySlip email is blank and'
      + ' paySlip delivery is to be printed and emailed when payroll detail is navigated to', () => {
      const email = 'foo@bar.com';
      const state = {
        mainTab: 'contactDetails',
        contactDetail: {
          email,
        },
        payrollDetails: {
          employmentDetails: {
            paySlipEmail: '',
            paySlipDelivery: 'ToBeEmailed',
          },
        },
      };

      const action = {
        intent: SET_MAIN_TAB,
        selectedTab: 'payrollDetails',
      };

      const expected = {
        mainTab: 'payrollDetails',
        contactDetail: {
          email,
        },
        payrollDetails: {
          employmentDetails: {
            paySlipEmail: email,
            paySlipDelivery: 'ToBeEmailed',
          },
        },
      };

      const actual = employeeDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

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
        value: 'my',
      };

      const expected = {
        bankStatementText: 'my',
      };

      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });

    it('should not allow length of the bank statement text to exceed 18 characters', () => {
      const stringOfLength18 = 'my name is mattias';
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
          bankStatementText: 'bl& no* // -.',
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'bankStatementText',
        value: 'bl& no* // -.$',
      };

      const expected = initialState.paymentDetails;
      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });

    it('should allow all numbers, characters and white space in the bank statement text', () => {
      const initialState = {
        paymentDetails: {
          bankStatementText: 'abc0123456789',
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'bankStatementText',
        value: 'abc0123456789 ',
      };

      const expected = {
        bankStatementText: 'abc0123456789 ',
      };

      const { paymentDetails } = employeeDetailReducer(initialState, action);
      expect(paymentDetails).toEqual(expected);
    });
  });
});
