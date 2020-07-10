import {
  FORMAT_EMPLOYEE_PAY_ITEM,
  LOAD_EMPLOYEE_PAYS,
  SET_PAY_ITEM_LINE_DIRTY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../../PayRunIntents';
import employeePayList from './fixtures/loadEmployeePayList';
import payRunReducer from '../../payRunReducer';

describe('employeePayListReducer', () => {
  describe('updateIsEmployeeSelected', () => {
    it('should toggle isSelected', () => {
      const state = {
        employeePayList: {
          lines: [
            { employeeId: '1', isSelected: true },
            { employeeId: '2', isSelected: true },
          ],
        },
      };
      const action = {
        intent: UPDATE_IS_EMPLOYEE_SELECTED,
        id: '1',
      };
      const expected = {
        employeePayList: {
          lines: [
            { employeeId: '1', isSelected: false },
            { employeeId: '2', isSelected: true },
          ],
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('updateAreAllEmployeesSelected', () => {
    it('should toggle isSelected for all employees', () => {
      const state = {
        employeePayList: {
          lines: [
            { employeeId: '1', isSelected: true },
            { employeeId: '2', isSelected: true },
          ],
        },
      };
      const action = {
        intent: UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
        value: false,
      };
      const expected = {
        employeePayList: {
          lines: [
            { employeeId: '1', isSelected: false },
            { employeeId: '2', isSelected: false },
          ],
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION', () => {
    it('should update employee line and original employee line', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              payItems: [{
                payItemId: '11',
                payItemName: 'PayGWithholding',
                type: 'Tax',
                amount: '222.00',
                isSubmitting: true,
                hours: '1.00',
              }],
            },
          ],
          originalLines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              payItems: [{
                payItemId: '11',
                payItemName: 'PayGWithholding',
                type: 'Tax',
                amount: '222.00',
                hours: '0.00',
              }],
            },
          ],
        },
      };
      const recalculatedEmployeePay = {
        employeeId: '1',
        name: 'Mary Jones',
        gross: 1500,
        payg: 100,
        deduction: 300,
        netPay: 700,
        super: 150,
        payItems: [
          {
            payItemId: '11',
            payItemName: 'PayGWithholding',
            type: 'Tax',
            amount: '222.00',
            hours: '1.00',
          },
        ],
      };
      const action = {
        intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
        employeeId: '1',
        recalculatedEmployeePay,
      };
      const expected = {
        employeePayList: {
          lines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              payItems: [{
                payItemId: '11',
                payItemName: 'PayGWithholding',
                type: 'Tax',
                isSubmitting: false,
                amount: '222.00',
                hours: '1.00',
              }],
            },
          ],
          originalLines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              payItems: [{
                payItemId: '11',
                payItemName: 'PayGWithholding',
                type: 'Tax',
                amount: '222.00',
                hours: '1.00',
              }],
            },
          ],
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });

    describe('clearing negative values after recalculate', () => {
      const state = {
        employeePayList: {
          baseHourlyWagePayItemId: '11',
          baseSalaryWagePayItemId: '9',
          lines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              payItems: [
                {
                  payItemId: '11',
                  payItemName: 'Base Hourly',
                  type: 'HourlyWage',
                  amount: '0.00',
                  isSubmitting: true,
                  hours: '0.00',
                },
                {
                  payItemId: '10',
                  payItemName: 'Some other wage',
                  type: 'HourlyWage',
                  amount: '-10.00',
                  isSubmitting: true,
                  hours: '-20.00',
                },
              ],
            },
          ],
          originalLines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              payItems: [{
                payItemId: '11',
                payItemName: 'Base Hourly',
                type: 'HourlyWage',
                amount: '-222.00',
                hours: '-1.00',
              },
              {
                payItemId: '10',
                payItemName: 'Some other wage',
                type: 'HourlyWage',
                amount: '-10.00',
                isSubmitting: true,
                hours: '-20.00',
              }],
            },
          ],
        },
      };

      const recalculatedEmployeePay = {
        employeeId: '1',
        name: 'Mary Jones',
        gross: 1500,
        payg: 100,
        deduction: 300,
        netPay: 700,
        super: 150,
        payItems: [
          {
            payItemId: '11',
            payItemName: 'Base Hourly',
            type: 'HourlyWage',
            amount: '-20.00',
            hours: '-1.00',
          },
        ],
      };

      const action = {
        intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
        employeeId: '1',
        recalculatedEmployeePay,
      };

      it('clears the negative amount for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual('0.00');
      });

      it('clears the negative hours for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].hours).toEqual('0.00');
      });

      const recalculatedEmployeePayForNonBaseHourly = {
        employeeId: '1',
        name: 'Mary Jones',
        gross: 1500,
        payg: 100,
        deduction: 300,
        netPay: 700,
        super: 150,
        payItems: [
          {
            payItemId: '11',
            payItemName: 'PayGWithholding',
            type: 'Tax',
            amount: '222.00',
            hours: '1.00',
          },
          {
            payItemId: '10',
            payItemName: 'Some other wage',
            type: 'NonHourlyWage',
            amount: '-10.00',
            isSubmitting: true,
            hours: '-20.00',
          },
        ],
      };

      it('does not clear the negative amount for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: '1',
          recalculatedEmployeePay: recalculatedEmployeePayForNonBaseHourly,
        });

        expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual('-10.00');
      });

      it('does not clear the negative hours for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: '1',
          recalculatedEmployeePay: recalculatedEmployeePayForNonBaseHourly,
        });

        expect(actual.employeePayList.lines[0].payItems[1].hours).toEqual('-20.00');
      });
    });
  });

  describe('formatPayItemAmount', () => {
    const employeeId = '1';
    const payItemId = '2';
    const state = {
      employeePayList: {
        lines: [
          {
            employeeId,
            payItems: [
              {
                payItemId,
              },
            ],
          },
        ],
      },
    };
    const action = {
      intent: FORMAT_EMPLOYEE_PAY_ITEM,
      employeeId,
      payItemId,
      key: 'amount',
      value: '3',
    };

    it('should format the amount field of a particular pay item to 2 decimal places', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual('3.00');
    });

    it('should format the amount field of a particular pay item to 0.00 for a NaN input', () => {
      const modifiedAction = {
        ...action,
        value: '-',
      };

      const actual = payRunReducer(state, modifiedAction);

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual('0.00');
    });

    it('should format the hours field of a particular pay item to 2 decimal places min, and 3 decimal places max',
      () => {
        // The detailed cases of 2 and 3 decimal places are tested in the
        // formatNumberWithDecimalScaleRange function
        const modifiedAction = {
          ...action,
          key: 'hours',
        };

        const actual = payRunReducer(state, modifiedAction);

        expect(actual.employeePayList.lines[0].payItems[0].hours).toEqual('3.00');
      });

    it('should format the hours field of a particular pay item to 0.00 for a NaN input', () => {
      const modifiedAction = {
        ...action,
        key: 'hours',
        value: '-',
      };

      const actual = payRunReducer(state, modifiedAction);

      expect(actual.employeePayList.lines[0].payItems[0].hours).toEqual('0.00');
    });
  });

  describe('LOAD_EMPLOYEE_PAYS', () => {
    const state = {
      employeePayList: {
        baseHourlyWagePayItemId: 11,
        baseSalaryWagePayItemId: 9,
      },
    };

    const action = {
      intent: LOAD_EMPLOYEE_PAYS,
      employeePays: {
        baseHourlyWagePayItemId: 2,
        baseSalaryWagePayItemId: 1,
        employeePays: [
          {
            employeeId: 21,
            payItems: [
              {
                payItemId: 1,
                payItemName: 'Salary Wage',
                amount: '-100.00',
                hours: '0.00',
              },
              {
                payItemId: 2,
                payItemName: 'Hourly Wage',
                amount: '-100.00',
                hours: '-10.00',
              },
              {
                payItemId: 3,
                payItemName: 'Annual leave',
                amount: '-10.00',
                hours: '0.00',
              },
            ],
          },
        ],
      },
    };

    it('sets negative amount to zero for base salary pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual('0.00');
    });

    it('does not set negative amount to zero for other pay items', () => {
      const actual = payRunReducer(state, action);
      expect(actual.employeePayList.lines[0].payItems[2].amount).toEqual('-10.00');
    });

    it('sets negative amount to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual('0.00');
    });

    it('sets negative hours to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[1].hours).toEqual('0.00');
    });

    it('sets days paid', () => {
      const ourAction = {
        intent: LOAD_EMPLOYEE_PAYS,
        employeePays: employeePayList,
      };
      const actual = payRunReducer(state, ourAction);
      expect(actual.employeePayList.lines[0].daysPaid).toEqual(5);
    });

    it('sets take home pay', () => {
      const ourAction = {
        intent: LOAD_EMPLOYEE_PAYS,
        employeePays: employeePayList,
      };
      const actual = payRunReducer(state, ourAction);
      expect(actual.employeePayList.lines[0].takeHomePay).toEqual(700);
    });
  });

  describe('UPDATE_EMPLOYEE_DAYS_PAID', () => {
    it('update daysPaid field in store onChange', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              paye: 100,
              takeHomePay: 700,
              kiwiSaver: 150,
              daysPaid: 0,
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_EMPLOYEE_DAYS_PAID,
        employeeId: '1',
        daysPaid: 1,
      };

      const expected = 1;

      const actual = payRunReducer(state, action).employeePayList.lines[0].daysPaid;

      expect(actual).toEqual(expected);
    });

    it('update daysPaid does not alter other fields', () => {
      const initialState = {
        employeePayList: {
          lines: [
            {
              employeeId: '1',
              name: 'Mary Jones',
              gross: 1500,
              paye: 100,
              takeHomePay: 700,
              kiwiSaver: 150,
              daysPaid: 0,
            },
            {
              employeeId: '2',
              name: 'Tom Jones',
              gross: 1500,
              paye: 100,
              takeHomePay: 700,
              kiwiSaver: 150,
              daysPaid: 12,
            },
          ],
        },
      };

      const expected = initialState;
      expected.employeePayList.lines[0].daysPaid = 1;

      const state = initialState;

      const action = {
        intent: UPDATE_EMPLOYEE_DAYS_PAID,
        employeeId: '1',
        daysPaid: 1,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('SET_PAY_ITEM_LINE_DIRTY', () => {
    it('update daysPaid field in store onChange', () => {
      const state = {
        employeePayList: {
          isPayItemLineDirty: false,
        },
      };

      const action = {
        intent: SET_PAY_ITEM_LINE_DIRTY,
        isDirty: true,
      };

      const expected = {
        employeePayList: {
          isPayItemLineDirty: true,
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
