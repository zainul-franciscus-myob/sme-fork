import {
  UPDATE_PAYROLL_WAGE_ANNUAL_SALARY,
  UPDATE_PAYROLL_WAGE_HOURLY_RATE,
  UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE,
  UPDATE_PAYROLL_WAGE_PAY_BASIS,
  UPDATE_PAYROLL_WAGE_PAY_CYCLE,
} from '../../../../EmployeeIntents';
import employeeDetailReducer from '../../../employeeDetailReducer';

describe('PayrollWageReducer', () => {
  describe('updatePayrollWagePayBasis', () => {
    it('should allocate base salary wage pay item and unallocate base hourly wage pay item is pay basis is salary',
      () => {
        const state = {
          payrollDetails: {
            wage: {
              selectedPayBasis: 'Hourly',
              allocatedWagePayItems: [
                { id: '2' },
              ],
            },
          },
          baseSalaryWagePayItemId: '1',
          baseHourlyWagePayItemId: '2',
          wagePayItems: [
            { id: '1' },
            { id: '2' },
          ],
        };

        const action = {
          intent: UPDATE_PAYROLL_WAGE_PAY_BASIS,
          value: 'Salary',
        };

        const expected = {
          isPageEdited: true,
          payrollDetails: {
            wage: {
              selectedPayBasis: 'Salary',
              allocatedWagePayItems: [
                { id: '1' },
              ],
            },
          },
          baseSalaryWagePayItemId: '1',
          baseHourlyWagePayItemId: '2',
          wagePayItems: [
            { id: '1' },
            { id: '2' },
          ],
        };

        const actual = employeeDetailReducer(state, action);

        expect(actual).toEqual(expected);
      });

    it('should allocate base hourly wage pay item and unallocate base salary wage pay item is pay basis is hourly',
      () => {
        const state = {
          payrollDetails: {
            wage: {
              selectedPayBasis: 'Salary',
              allocatedWagePayItems: [
                { id: '1' },
              ],
            },
          },
          baseSalaryWagePayItemId: '1',
          baseHourlyWagePayItemId: '2',
          wagePayItems: [
            { id: '1' },
            { id: '2' },
          ],
        };

        const action = {
          intent: UPDATE_PAYROLL_WAGE_PAY_BASIS,
          value: 'Hourly',
        };

        const expected = {
          isPageEdited: true,
          payrollDetails: {
            wage: {
              selectedPayBasis: 'Hourly',
              allocatedWagePayItems: [
                { id: '2' },
              ],
            },
          },
          baseSalaryWagePayItemId: '1',
          baseHourlyWagePayItemId: '2',
          wagePayItems: [
            { id: '1' },
            { id: '2' },
          ],
        };

        const actual = employeeDetailReducer(state, action);

        expect(actual).toEqual(expected);
      });
  });

  describe('updatePayrollWageHourlyRate', () => {
    it.each([
      ['Weekly', '5200.00'],
      ['Fortnightly', '2600.00'],
      ['TwiceAMonth', '2400.00'],
      ['Monthly', '1200.00'],
    ])('should calculate annual salary for a %s pay cycle', (payCycle, expectedAnnualSalary) => {
      const state = {
        payrollDetails: {
          wage: {
            payPeriodHours: '10',
            selectedPayCycle: payCycle,
          },
        },
      };

      const action = {
        intent: UPDATE_PAYROLL_WAGE_HOURLY_RATE,
        value: '10',
      };

      const actual = employeeDetailReducer(state, action);

      const expected = {
        isPageEdited: true,
        payrollDetails: {
          wage: {
            payPeriodHours: '10',
            hourlyRate: '10.00',
            selectedPayCycle: payCycle,
            annualSalary: expectedAnnualSalary,
          },
        },
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('updatePayrollWageAnnualSalary', () => {
    it.each([
      ['Weekly', '40', '25.00'],
      ['Fortnightly', '80', '25.00'],
      ['TwiceAMonth', '88', '24.6212'],
      ['Monthly', '173.3333', '25.00'],
      ['Quarterly', '520', '25.00'],
    ])('should calculate hourly rate for a %s pay cycle', (payCycle, payPeriodHours, expectedHourlyRate) => {
      const state = {
        payrollDetails: {
          wage: {
            payPeriodHours,
            selectedPayCycle: payCycle,
          },
        },
      };

      const action = {
        intent: UPDATE_PAYROLL_WAGE_ANNUAL_SALARY,
        value: '52000',
      };

      const actual = employeeDetailReducer(state, action);

      const expected = {
        isPageEdited: true,
        payrollDetails: {
          wage: {
            payPeriodHours,
            hourlyRate: expectedHourlyRate,
            selectedPayCycle: payCycle,
            annualSalary: '52000.00',
          },
        },
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('updatePayrollWageHoursInPayCycle', () => {
    it.each([
      ['annual salary', '10.00', 'Hourly', 'Weekly', '5200.00', '10.00'],
      ['annual salary', '10.00', 'Hourly', 'Fortnightly', '2600.00', '10.00'],
      ['annual salary', '10.00', 'Hourly', 'TwiceAMonth', '2400.00', '10.00'],
      ['annual salary', '10.00', 'Hourly', 'Monthly', '1200.00', '10.00'],

      ['hourly rate', '10.00', 'Salary', 'Weekly', '10000', '19.2308'],
      ['hourly rate', '10.00', 'Salary', 'Fortnightly', '10000', '38.4615'],
      ['hourly rate', '10.00', 'Salary', 'TwiceAMonth', '10000', '41.6667'],
      ['hourly rate', '10.00', 'Salary', 'Monthly', '10000', '83.3333'],

      ['hourly rate', '0.00', 'Salary', 'Monthly', '10000', '0.00'],
      ['annual salary', '0.00', 'Hourly', 'Monthly', '0.00', '10.00'],
    ])('should calculate %s for %s hours on %s basis for %s pay cycle', (_, hours, payBasis, payCycle, expectedAnnualSalary, expectedHourlyRate) => {
      const state = {
        payrollDetails: {
          wage: {
            selectedPayBasis: payBasis,
            hourlyRate: '10.00',
            annualSalary: '10000',
            selectedPayCycle: payCycle,
          },
        },
      };

      const action = {
        intent: UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE,
        value: hours,
      };

      const actual = employeeDetailReducer(state, action);

      const expected = {
        isPageEdited: true,
        payrollDetails: {
          wage: {
            payPeriodHours: hours,
            selectedPayBasis: payBasis,
            selectedPayCycle: payCycle,
            annualSalary: expectedAnnualSalary,
            hourlyRate: expectedHourlyRate,
          },
        },
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('updatePayrollWagePayCycle', () => {
    it.each([
      ['Weekly', 'Fortnightly', '40', '80.00'],
      ['Weekly', 'TwiceAMonth', '40', '86.667'],
      ['Weekly', 'Monthly', '40', '173.333'],

      ['Fortnightly', 'Weekly', '80', '40.00'],
      ['Fortnightly', 'TwiceAMonth', '80', '86.667'],
      ['Fortnightly', 'Monthly', '80', '173.333'],

      ['TwiceAMonth', 'Weekly', '86.667', '40.00'],
      ['TwiceAMonth', 'Fortnightly', '86.667', '80.00'],
      ['TwiceAMonth', 'Monthly', '86.667', '173.334'],

      ['Monthly', 'Weekly', '173.334', '40.00'],
      ['Monthly', 'Fortnightly', '173.334', '80.00'],
      ['Monthly', 'TwiceAMonth', '173.334', '86.667'],
    ])('should update hours in pay cycle when changed from %s to %s', (origPayCycle, newPayCycle, hoursPerPeriod, expectedHoursPerPeriod) => {
      const state = {
        payrollDetails: {
          wage: {
            selectedPayCycle: origPayCycle,
            payPeriodHours: hoursPerPeriod,
          },
        },
      };

      const action = {
        intent: UPDATE_PAYROLL_WAGE_PAY_CYCLE,
        value: newPayCycle,
      };

      const actual = employeeDetailReducer(state, action);

      const expected = {
        isPageEdited: true,
        payrollDetails: {
          wage: {
            selectedPayCycle: newPayCycle,
            payPeriodHours: expectedHoursPerPeriod,
          },
        },
      };

      expect(actual).toEqual(expected);
    });

    it.each([
      ['Salary', '100', '0.1923'],
      ['Hourly', '5200.00', '10.00'],
    ])('should update hourly rate when pay basis is %s', (selectedPayBasis, expectedAnnualSalary, expectedHourlyRate) => {
      const state = {
        payrollDetails: {
          wage: {
            selectedPayBasis,
            selectedPayCycle: 'Weekly',
            annualSalary: '100',
            hourlyRate: '10.00',
            payPeriodHours: '10',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYROLL_WAGE_PAY_CYCLE,
        value: 'Fortnightly',
      };

      const { annualSalary, hourlyRate } = employeeDetailReducer(state, action)
        .payrollDetails.wage;
      const actual = { annualSalary, hourlyRate };

      const expected = {
        annualSalary: expectedAnnualSalary,
        hourlyRate: expectedHourlyRate,
      };

      expect(actual).toEqual(expected);
    });
  });
});
