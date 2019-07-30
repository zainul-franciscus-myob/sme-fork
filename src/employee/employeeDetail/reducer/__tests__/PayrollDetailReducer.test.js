import {
  SET_MAIN_TAB,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
} from '../../../EmployeeIntents';
import employeeDetailReducer from '../employeeDetailReducer';

describe('PayrollDetailReducer', () => {
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
});
