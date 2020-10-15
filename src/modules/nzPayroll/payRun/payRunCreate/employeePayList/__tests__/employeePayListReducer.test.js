import {
  FORMAT_EMPLOYEE_PAY_ITEM,
  LOAD_DRAFT_PAY_RUN,
  SET_PAY_ITEM_LINE_DIRTY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_ITEM,
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
    it('should update employee line', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              name: 'Mary Jones',
              id: 217,
              employeeId: 21,
              daysPaid: 5,
              taxCode: 'M',
              gross: '1500.00',
              takeHomePay: '700.00',
              kiwiSaver: '40.00',
              paye: '110.00',
              isSelected: true,
              payItems: [
                {
                  payrollCategoryId: 22,
                  payrollCategoryName: 'Salary Wage',
                  payrollCategoryType: 'SalaryWage',
                  amount: '100000.00',
                  quantity: '0.00',
                  id: 16,
                  calculationType: 'Amount',
                  rate: 0,
                  isSubmitting: true,
                },
              ],
            },
          ],
        },
      };
      const updatedEmployeePay = {
        name: 'Mary Jones',
        id: 217,
        employeeId: 21,
        daysPaid: 5,
        taxCode: 'M',
        gross: '2000.00',
        takeHomePay: '700.00',
        kiwiSaver: '222.00',
        paye: '777.00',
        isSelected: true,
        payItems: [
          {
            payrollCategoryId: 22,
            payrollCategoryName: 'Salary Wage',
            payrollCategoryType: 'SalaryWage',
            amount: '22.00',
            quantity: '0.00',
            id: 16,
            calculationType: 'Amount',
            rate: 0,
          },
        ],
      };
      const action = {
        intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
        employeeId: 21,
        updatedEmployeePay,
      };
      const expected = {
        employeePayList: {
          lines: [
            {
              name: 'Mary Jones',
              id: 217,
              employeeId: 21,
              daysPaid: 5,
              taxCode: 'M',
              gross: '2000.00',
              takeHomePay: '700.00',
              kiwiSaver: '222.00',
              paye: '777.00',
              isSelected: true,
              payItems: [
                {
                  payrollCategoryId: 22,
                  payrollCategoryName: 'Salary Wage',
                  payrollCategoryType: 'SalaryWage',
                  amount: '22.00',
                  quantity: '0.00',
                  id: 16,
                  calculationType: 'Amount',
                  rate: 0,
                  isSubmitting: false,
                },
              ],
            },
          ],
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });

    describe('clearing negative values after update', () => {
      const state = {
        employeePayList: {
          baseHourlyWagePayItemId: 22,
          baseSalaryWagePayItemId: 9,
          lines: [
            {
              name: 'Mary Jones',
              id: 217,
              employeeId: 21,
              daysPaid: 5,
              taxCode: 'M',
              gross: '1500.00',
              takeHomePay: '700.00',
              kiwiSaver: '40.00',
              paye: '110.00',
              isSelected: true,
              payItems: [
                {
                  payrollCategoryId: 22,
                  payrollCategoryName: 'Base Hourly',
                  payrollCategoryType: 'HourlyWage',
                  amount: '0.00',
                  quantity: '0.00',
                  id: 16,
                  calculationType: 'Amount',
                  rate: '0.00',
                  isSubmitting: true,
                },
                {
                  payrollCategoryId: 33,
                  payrollCategoryName: 'Not base hourly',
                  payrollCategoryType: 'HourlyWage',
                  amount: '-20.00',
                  quantity: '-2.00',
                  id: 16,
                  calculationType: 'Amount',
                  rate: '10.00',
                  isSubmitting: true,
                },
              ],
            },
          ],
        },
      };

      const updatedEmployeePay = {
        name: 'Mary Jones',
        id: 217,
        employeeId: 21,
        daysPaid: 5,
        taxCode: 'M',
        gross: '1500.00',
        takeHomePay: '700.00',
        kiwiSaver: '40.00',
        paye: '110.00',
        isSelected: true,
        payItems: [
          {
            payrollCategoryId: 22,
            payrollCategoryName: 'Base Hourly',
            payrollCategoryType: 'HourlyWage',
            amount: '-20.00',
            quantity: '-1.00',
            id: 16,
            calculationType: 'Amount',
            rate: '0.00',
          },
          {
            payrollCategoryId: 33,
            payrollCategoryName: 'Not base hourly',
            payrollCategoryType: 'HourlyWage',
            amount: '-20.00',
            quantity: '-2.00',
            id: 16,
            calculationType: 'Amount',
            rate: '10.00',
          },
        ],
      };

      const action = {
        intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
        employeeId: 21,
        updatedEmployeePay,
      };

      it('clears the negative amount for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
          '0.00'
        );
      });

      it('clears the negative quantity for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].quantity).toEqual(
          '0.00'
        );
      });

      const nonBaseHourlyPayItems = [
        {
          payrollCategoryId: 22,
          payrollCategoryName: 'Tax item',
          payrollCategoryType: 'Tax',
          amount: '-10.00',
          quantity: '-1.00',
          id: 16,
          calculationType: 'Amount',
          rate: '0.00',
        },
        {
          payrollCategoryId: 33,
          payrollCategoryName: 'Not base hourly',
          payrollCategoryType: 'NonHourlyWage',
          amount: '-111.00',
          quantity: '-222.00',
          id: 16,
          calculationType: 'Amount',
          rate: '10.00',
        },
      ];

      it('does not clear the negative amount for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: 21,
          updatedEmployeePay: {
            ...updatedEmployeePay,
            payItems: nonBaseHourlyPayItems,
          },
        });

        expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual(
          '-111.00'
        );
      });

      it('does not clear the negative quantity for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: 21,
          updatedEmployeePay: {
            ...updatedEmployeePay,
            payItems: nonBaseHourlyPayItems,
          },
        });

        expect(actual.employeePayList.lines[0].payItems[1].quantity).toEqual(
          '-222.00'
        );
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

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
        '3.00'
      );
    });

    it('should format the amount field of a particular pay item to 0.00 for a NaN input', () => {
      const modifiedAction = {
        ...action,
        value: '-',
      };

      const actual = payRunReducer(state, modifiedAction);

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
        '0.00'
      );
    });

    it('should format the hours field of a particular pay item to 2 decimal places min, and 3 decimal places max', () => {
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

  describe('LOAD_DRAFT_PAY_RUN', () => {
    const state = {
      employeePayList: {
        baseHourlyWagePayItemId: 11,
        baseSalaryWagePayItemId: 9,
      },
    };

    const action = {
      intent: LOAD_DRAFT_PAY_RUN,
      createdDraftPayRun: {
        draftPayRunId: 7,
        baseHourlyWagePayItemId: 22,
        baseSalaryWagePayItemId: 1,
        employeePays: [
          {
            employeeId: 21,
            payItems: [
              {
                payrollCategoryId: 22,
                payrollCategoryName: 'Base Hourly',
                payrollCategoryType: 'HourlyWage',
                amount: '-200.00',
                quantity: '-10.00',
                id: 16,
                calculationType: 'Amount',
                rate: '20.00',
              },
              {
                payrollCategoryId: 1,
                payrollCategoryName: 'Base Salary',
                payrollCategoryType: 'SalaryWage',
                amount: '-20.00',
                quantity: '-1.00',
                id: 16,
                calculationType: 'Amount',
                rate: '0.00',
              },
              {
                payrollCategoryId: 33,
                payrollCategoryName: 'Not base hourly',
                payrollCategoryType: 'HourlyWage',
                amount: '-20.00',
                quantity: '-2.00',
                id: 16,
                calculationType: 'Amount',
                rate: '10.00',
              },
            ],
          },
        ],
      },
    };

    it('sets negative amount to zero for base salary pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual(
        '0.00'
      );
    });

    it('does not set negative amount to zero for other pay items', () => {
      const actual = payRunReducer(state, action);
      expect(actual.employeePayList.lines[0].payItems[2].amount).toEqual(
        '-20.00'
      );
    });

    it('sets negative amount to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
        '0.00'
      );
    });

    it('sets negative hours to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[0].quantity).toEqual(
        '0.00'
      );
    });

    it('sets days paid', () => {
      const ourAction = {
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun: employeePayList,
      };
      const actual = payRunReducer(state, ourAction);
      expect(actual.employeePayList.lines[0].daysPaid).toEqual(5);
    });

    it('sets take home pay', () => {
      const ourAction = {
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun: employeePayList,
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

      const actual = payRunReducer(state, action).employeePayList.lines[0]
        .daysPaid;

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

  describe('UPDATE_EMPLOYEE_PAY_ITEM', () => {
    it('Employee pay line is updated', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              name: 'Mary Jones',
              id: 217,
              employeeId: 21,
              daysPaid: 5,
              taxCode: 'M',
              gross: '1500.00',
              takeHomePay: '700.00',
              kiwiSaver: '40.00',
              paye: '110.00',
              isSelected: true,
              payItems: [
                {
                  payrollCategoryId: 22,
                  payrollCategoryName: 'Salary Wage',
                  payrollCategoryType: 'SalaryWage',
                  amount: '100000.00',
                  quantity: '0.00',
                  id: 16,
                  calculationType: 'Amount',
                  rate: 0,
                  isSubmitting: true,
                },
              ],
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_EMPLOYEE_PAY_ITEM,
        employeeId: 21,
        payItemId: 22,
        key: 'quantity',
        value: 10,
      };
      const expected = {
        employeePayList: {
          lines: [
            {
              name: 'Mary Jones',
              id: 217,
              employeeId: 21,
              daysPaid: 5,
              taxCode: 'M',
              gross: '1500.00',
              takeHomePay: '700.00',
              kiwiSaver: '40.00',
              paye: '110.00',
              isSelected: true,
              payItems: [
                {
                  payrollCategoryId: 22,
                  payrollCategoryName: 'Salary Wage',
                  payrollCategoryType: 'SalaryWage',
                  amount: '100000.00',
                  quantity: '10.00',
                  id: 16,
                  calculationType: 'Amount',
                  rate: 0,
                  isSubmitting: true,
                },
              ],
            },
          ],
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
