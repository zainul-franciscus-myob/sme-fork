import {
  SET_SUB_TAB,
  UPDATE_EMPLOYEE,
  UPDATE_PAYMENT_DETAILS,
} from '../../EmployeeIntents';
import employeeDetailReducer from '../employeeDetailReducer';

describe('employeeDetailReducer', () => {
  describe('updateEmployeeDetail', () => {
    it('should update employee detail', () => {
      const state = {
        contactDetail: {
          firstName: 'Bob',
          lastName: 'The builder',
          address: '43 ABC lane',
          suburb: 'Suburb',
          state: 'VIC',
          postcode: '3456',
          country: 'Australia',
          phoneNumbers: [
            '03 93883848',
            '03 94839483',
          ],
          email: 'bob@thebuilder.com',
          notes: "don't trust spuck",
          isInactive: false,
          employeeNumber: '0012',
        },
        payrollDetails: {
          employmentDetails: {
            dateOfBirth: '1978-03-13',
            gender: 'male',
            startDate: '2003-03-13',
            terminationDate: '',
            employmentBasis: 'Individual',
            employmentCategory: 'Permanent',
            employmentStatus: 'FullTime',
            paySlipDelivery: 'ToBeEmailed',
            paySlipEmail: 'bob@thebuilder.com',
          },
          leaveDetails: {
            allocatedLeavePayItems: [],
          },
          deductionDetails: {
            deductionPayItems: [],
          },
          superannuationDetails: {
            selectedSuperFundId: '1',
            employeeMembershipNumber: '123',
            allocatedPayItems: [],
          },
          tax: {
            extraTax: '10.20',
            taxFileNumber: '123 123 123',
            taxTableId: '4',
            totalRebates: '12.12',
            withholdingVariationRate: '23.1234',
            taxPayItems: [],
          },
          wage: {
            selectedPayBasis: 'Salary',
            annualSalary: '38000000000',
            hourlyRate: '20',
            selectedPayCycle: 'Monthly',
            payPeriodHours: '152.0',
            selectedWageExpenseAccount: '2',
            allocatedWagePayItems: [],
          },
          employerExpenseDetails: {
            expensePayItems: [
              {
                id: '61',
                name: 'Employer expense percent',
                type: 'ExpensePayrollCategory',
                displayType: 'Percent',
              },
              {
                id: '62',
                name: 'Employer expense fixed hour',
                type: 'ExpensePayrollCategory',
                displayType: 'Fixed Hour',
              },
            ],
          },
          standardPayDetails: {
            description: 'With great power comes great responsibility',
            standardPayItems: [],
          },
          payHistoryDetails: {
            payHistoryItems: [],
          },
        },
        paymentDetails: {
          paymentMethod: 'Electronic',
          splitPayBetween: '2',
          bankStatementText: 'SALARY',
          bankAccounts: [],
        },
        genderOptions: [],
      };

      const action = {
        intent: UPDATE_EMPLOYEE,
        contactDetail: {
          firstName: 'Updated Bob',
          lastName: 'Updated the builder',
          address: 'Updated 43 ABC lane',
          suburb: 'Updated Suburb',
          state: 'VIC',
          postcode: '3456',
          country: 'Updated Australia',
          phoneNumbers: [
            '03 93883848',
            '03 94839483',
          ],
          email: 'bob@thebuilder.com',
          notes: "don't trust spuck",
          isInactive: false,
          employeeNumber: '0012',
        },
        payrollDetails: {
          employmentDetails: {
            dateOfBirth: '1978-03-13',
            gender: 'male',
            startDate: '2003-03-13',
            terminationDate: '',
            employmentBasis: 'Individual',
            employmentCategory: 'Permanent',
            employmentStatus: 'FullTime',
            paySlipDelivery: 'ToBeEmailed',
            paySlipEmail: 'updatedbob@thebuilder.com',
          },
          leaveDetails: {
            allocatedLeavePayItems: [
              {
                id: '511',
                payItemId: '51',
                name: 'Leave percent',
                carryOver: '43.434',
                yearToDate: '10.5',
                total: '53.5',
              }],
          },
          deductionDetails: {
            deductionPayItems: [
              {
                id: '41',
                name: 'Deduction percent',
                type: 'DeductionPayrollCategory',
                displayType: 'Percent',
              }],
          },
          superannuationDetails: {
            selectedSuperFundId: '1',
            employeeMembershipNumber: '123',
            allocatedPayItems: [
              {
                id: '31',
                name: 'Super deduction before tax',
                type: 'SuperannuationDeductionBeforeTaxPayrollCategory',
                displayType: 'Deduct before tax',
              }],
          },
          tax: {
            extraTax: '10.20',
            taxFileNumber: '123 123 123',
            taxTableId: '4',
            totalRebates: '12.12',
            withholdingVariationRate: '23.1234',
            taxPayItems: [
              {
                id: '21',
                type: 'TaxPayrollCategory',
              },
            ],
          },
          wage: {
            selectedPayBasis: 'Salary',
            annualSalary: '38000000000',
            hourlyRate: '20',
            selectedPayCycle: 'Monthly',
            payPeriodHours: '152.0',
            selectedWageExpenseAccount: '2',
            allocatedWagePayItems: [
              {
                id: '11',
                type: 'WagesPayrollCategory',
              },
            ],
          },
          employerExpenseDetails: {
            expensePayItems: [
              {
                id: '61',
                name: 'Employer expense percent',
                type: 'ExpensePayrollCategory',
                displayType: 'Percent',
              },
            ],
          },
          standardPayDetails: {
            description: 'With great power comes great responsibility',
            standardPayItems: [
              {
                id: '6',
                payItemId: '11',
                hours: '152.0',
                appliedHours: '152.0',
                amount: '90',
              },
            ],
          },
          payHistoryDetails: {
            payHistoryItems: [
              {
                id: '1',
                payItemId: '11',
                payItemType: 'WagesPayrollCategory',
                lines: [
                  {
                    total: '3000.00',
                    activity: 2500.50,
                    month: 'July',
                    hasPayHistory: true,
                  },
                  {
                    total: '4000.00',
                    activity: 2500,
                    month: 'August',
                    hasPayHistory: true,
                  },
                ],
              },
            ],
          },
        },
        paymentDetails: {
          paymentMethod: 'Electronic',
          splitPayBetween: '2',
          bankStatementText: 'SALARY',
          bankAccounts: [
            {
              bsbNumber: '123-321',
              accountNumber: '32321234',
              accountName: 'Bob The builder',
              value: 'Dollars',
              amount: '1000000.00',
            }],
        },
      };

      const expected = {
        contactDetail: {
          firstName: 'Updated Bob',
          lastName: 'Updated the builder',
          address: 'Updated 43 ABC lane',
          suburb: 'Updated Suburb',
          state: 'VIC',
          postcode: '3456',
          country: 'Updated Australia',
          phoneNumbers: [
            '03 93883848',
            '03 94839483',
          ],
          email: 'bob@thebuilder.com',
          notes: "don't trust spuck",
          isInactive: false,
          employeeNumber: '0012',
        },
        payrollDetails: {
          employmentDetails: {
            dateOfBirth: '1978-03-13',
            gender: 'male',
            startDate: '2003-03-13',
            terminationDate: '',
            employmentBasis: 'Individual',
            employmentCategory: 'Permanent',
            employmentStatus: 'FullTime',
            paySlipDelivery: 'ToBeEmailed',
            paySlipEmail: 'updatedbob@thebuilder.com',
          },
          leaveDetails: {
            allocatedLeavePayItems: [
              {
                id: '511',
                payItemId: '51',
                name: 'Leave percent',
                carryOver: '43.434',
                yearToDate: '10.5',
                total: '53.5',
              }],
          },
          deductionDetails: {
            deductionPayItems: [
              {
                id: '41',
                name: 'Deduction percent',
                type: 'DeductionPayrollCategory',
                displayType: 'Percent',
              }],
          },
          superannuationDetails: {
            selectedSuperFundId: '1',
            employeeMembershipNumber: '123',
            allocatedPayItems: [
              {
                id: '31',
                name: 'Super deduction before tax',
                type: 'SuperannuationDeductionBeforeTaxPayrollCategory',
                displayType: 'Deduct before tax',
              }],
          },
          tax: {
            extraTax: '10.20',
            taxFileNumber: '123 123 123',
            taxTableId: '4',
            totalRebates: '12.12',
            withholdingVariationRate: '23.1234',
            taxPayItems: [
              {
                id: '21',
                type: 'TaxPayrollCategory',
              },
            ],
          },
          wage: {
            selectedPayBasis: 'Salary',
            annualSalary: '38000000000.00',
            hourlyRate: '20.00',
            payPeriodHours: '152.00',
            selectedPayCycle: 'Monthly',
            selectedWageExpenseAccount: '2',
            allocatedWagePayItems: [
              {
                id: '11',
                type: 'WagesPayrollCategory',
              },
            ],
          },
          employerExpenseDetails: {
            expensePayItems: [
              {
                id: '61',
                name: 'Employer expense percent',
                type: 'ExpensePayrollCategory',
                displayType: 'Percent',
              },
            ],
          },
          standardPayDetails: {
            description: 'With great power comes great responsibility',
            standardPayItems: [
              {
                id: '6',
                payItemId: '11',
                hours: '152.0',
                appliedHours: '152.0',
                amount: '90',
              },
            ],
          },
          payHistoryDetails: {
            payHistoryItems: [
              {
                id: '1',
                payItemId: '11',
                payItemType: 'WagesPayrollCategory',
                lines: [
                  {
                    total: '3000.00',
                    activity: 2500.50,
                    month: 'July',
                    hasPayHistory: true,
                  },
                  {
                    total: '4000.00',
                    activity: 2500,
                    month: 'August',
                    hasPayHistory: true,
                  },
                ],
              },
            ],
          },
        },
        paymentDetails: {
          paymentMethod: 'Electronic',
          splitPayBetween: '2',
          bankStatementText: 'SALARY',
          bankAccounts: [
            {
              bsbNumber: '123-321',
              accountNumber: '32321234',
              accountName: 'Bob The builder',
              value: 'Dollars',
              amount: '1000000.00',
            }],
        },
        genderOptions: [],
      };

      const actual = employeeDetailReducer(state, action);

      expect(actual.contactDetail).toEqual(expected.contactDetail);
      expect(actual.payrollDetails).toEqual(expected.payrollDetails);
      expect(actual.paymentDetails).toEqual(expected.paymentDetails);
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

    it('resets the showPayItemButtons to true, when sub tab is set', () => {
      const initialState = {
        otherProps: 'other props',
        showAddPayItemButton: false,
        subTab: 'something else',
      };

      const expectedState = {
        showAddPayItemButton: true,
        otherProps: 'other props',
        subTab: 'something',
      };

      const action = {
        intent: SET_SUB_TAB,
        selectedTab: 'something',
      };

      const result = employeeDetailReducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });
});
