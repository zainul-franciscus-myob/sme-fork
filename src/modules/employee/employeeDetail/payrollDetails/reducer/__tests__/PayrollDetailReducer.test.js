import {
  SET_MAIN_TAB,
  SET_TERMINATION_CONFIRM_MODAL,
  UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
} from '../../../../EmployeeIntents';
import employeeDetailReducer from '../../../employeeDetailReducer';

describe('PayrollDetailReducer', () => {
  describe('updatePayrollEmployeeEmail', () => {
    it(
      'sets email to Contact detail when contact email is present, paySlip email is blank and' +
        ' paySlip delivery is to be emailed when delivery method is changed',
      () => {
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
      }
    );

    it(
      'sets email to Contact detail when contact email is present, paySlip email is blank and' +
        ' paySlip delivery is to be printed and emailed when delivery method is changed',
      () => {
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
      }
    );

    it(
      'sets email to Contact detail when contact email is present, paySlip email is blank and' +
        ' paySlip delivery is to be printed and emailed when payroll detail is navigated to',
      () => {
        const email = 'foo@bar.com';
        const state = {
          mainTab: 'contactDetails',
          showAddPayItemButton: false,
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
          showAddPayItemButton: true,
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
      }
    );
  });

  describe('SET_TERMINATION_CONFIRM_MODAL', () => {
    it('opens the termination confirmation modal', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            terminationConfirmModalIsOpen: false,
          },
        },
      };

      const action = {
        intent: SET_TERMINATION_CONFIRM_MODAL,
        isOpen: true,
      };

      const result = employeeDetailReducer(state, action);

      expect(
        result.payrollDetails.employmentDetails.terminationConfirmModalIsOpen
      ).toBe(true);
    });

    it('closes the termination confirmation modal', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            terminationConfirmModalIsOpen: true,
          },
        },
      };

      const action = {
        intent: SET_TERMINATION_CONFIRM_MODAL,
        isOpen: false,
      };

      const result = employeeDetailReducer(state, action);

      expect(
        result.payrollDetails.employmentDetails.terminationConfirmModalIsOpen
      ).toBe(false);
    });
  });

  describe('terminationDate updates', () => {
    describe('originally empty', () => {
      const originalValue = 'ORIGINAL_VALUE';
      const state = {
        payrollDetails: {
          employmentDetails: {
            terminationDate: '',
            terminationDateNewlySet: originalValue,
          },
        },
      };

      it('sets terminationDateNewlySet to true', () => {
        const action = {
          intent: UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
          key: 'terminationDate',
          value: '2020-02-02',
        };
        const actual = employeeDetailReducer(state, action);

        expect(
          actual.payrollDetails.employmentDetails.terminationDateNewlySet
        ).toBe(true);
      });

      it('does not set terminationDateNewlySet when changing a different field', () => {
        const action = {
          intent: UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
          key: 'startDate',
          value: '2020-02-20',
        };
        const actual = employeeDetailReducer(state, action);

        expect(
          actual.payrollDetails.employmentDetails.terminationDateNewlySet
        ).toBe(originalValue);
      });

      it('removes the flag when the termination date is set back to empty', () => {
        const action = {
          intent: UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
          key: 'terminationDate',
          value: '',
        };

        const actual = employeeDetailReducer(state, action);

        expect(
          actual.payrollDetails.employmentDetails.terminationDateNewlySet
        ).toBe(false);
      });
    });

    describe('originally with value', () => {
      const originalValue = 'ORIGINAL_VALUE';
      const state = {
        payrollDetails: {
          employmentDetails: {
            terminationDate: '2020-02-02',
            terminationDateNewlySet: originalValue,
          },
        },
      };

      it('does not change terminationDateNewlySet', () => {
        const action = {
          intent: UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
          key: 'terminationDate',
          value: '2020-02-03',
        };
        const actual = employeeDetailReducer(state, action);
        expect(
          actual.payrollDetails.employmentDetails.terminationDateNewlySet
        ).toBe(originalValue);
      });
    });
  });
});
