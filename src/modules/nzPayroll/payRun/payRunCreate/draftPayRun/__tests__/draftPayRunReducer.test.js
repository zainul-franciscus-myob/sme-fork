import {
  CANCEL_ADD_HOLIDAYS_AND_LEAVE_MODAL,
  FORMAT_EMPLOYEE_PAY_LINE,
  LOAD_DRAFT_PAY_RUN,
  OPEN_ADD_HOLIDAYS_AND_LEAVE_MODAL,
  SET_PAY_LINE_DIRTY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_DAYS_PAID_FAILED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_LINE,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../../PayRunIntents';
import draftPayRun from './fixtures/loadDraftPayRun';
import payRunReducer from '../../payRunReducer';

describe('draftPayRunReducer', () => {
  describe('updateIsEmployeeSelected', () => {
    it('should toggle isSelected', () => {
      const state = {
        draftPayRun: {
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
        draftPayRun: {
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
        draftPayRun: {
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
        draftPayRun: {
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
        draftPayRun: {
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
              payLines: [
                {
                  payItemId: 22,
                  name: 'Salary Wage',
                  type: 'Earnings',
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
        payLines: [
          {
            payItemId: 22,
            name: 'Salary Wage',
            type: 'Earnings',
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
        draftPayRun: {
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
              payLines: [
                {
                  payItemId: 22,
                  name: 'Salary Wage',
                  type: 'Earnings',
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
        draftPayRun: {
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
              payLines: [
                {
                  payItemId: 22,
                  name: 'Base Hourly',
                  type: 'Earnings',
                  amount: '0.00',
                  quantity: '0.00',
                  id: 16,
                  calculationType: 'Amount',
                  rate: '0.00',
                  isSubmitting: true,
                },
                {
                  payItemId: 33,
                  name: 'Not base hourly',
                  type: 'Earnings',
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
        payLines: [
          {
            payItemId: 22,
            name: 'Base Hourly',
            type: 'Earnings',
            amount: '-20.00',
            quantity: '-1.00',
            id: 16,
            calculationType: 'Amount',
            rate: '0.00',
          },
          {
            payItemId: 33,
            name: 'Not base hourly',
            type: 'Earnings',
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

        expect(actual.draftPayRun.lines[0].payLines[0].amount).toEqual('0.00');
      });

      it('clears the negative quantity for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.draftPayRun.lines[0].payLines[0].quantity).toEqual(
          '0.00'
        );
      });

      const nonBaseHourlyPayLines = [
        {
          payItemId: 22,
          name: 'Tax item',
          type: 'Taxes',
          amount: '-10.00',
          quantity: '-1.00',
          id: 16,
          calculationType: 'Amount',
          rate: '0.00',
        },
        {
          payItemId: 33,
          name: 'Not base hourly',
          type: 'NonHourlyWage',
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
            payLines: nonBaseHourlyPayLines,
          },
        });

        expect(actual.draftPayRun.lines[0].payLines[1].amount).toEqual(
          '-111.00'
        );
      });

      it('does not clear the negative quantity for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: 21,
          updatedEmployeePay: {
            ...updatedEmployeePay,
            payLines: nonBaseHourlyPayLines,
          },
        });

        expect(actual.draftPayRun.lines[0].payLines[1].quantity).toEqual(
          '-222.00'
        );
      });
    });
  });

  describe('formatPayLineAmount', () => {
    const employeeId = '1';
    const payItemId = '2';
    const state = {
      draftPayRun: {
        lines: [
          {
            employeeId,
            payLines: [
              {
                payItemId,
              },
            ],
          },
        ],
      },
    };
    const action = {
      intent: FORMAT_EMPLOYEE_PAY_LINE,
      employeeId,
      payItemId,
      key: 'amount',
      value: 3,
    };

    it('should format the amount field of a particular pay item to 2 decimal places', () => {
      const actual = payRunReducer(state, action);

      expect(actual.draftPayRun.lines[0].payLines[0].amount).toEqual('3.00');
    });

    it('should format the amount field of a particular pay item to 0.00 for a NaN input', () => {
      const modifiedAction = {
        ...action,
        value: '-',
      };

      const actual = payRunReducer(state, modifiedAction);

      expect(actual.draftPayRun.lines[0].payLines[0].amount).toEqual('0.00');
    });

    it('should format the hours field of a particular pay item to 2 decimal places min, and 3 decimal places max', () => {
      // The detailed cases of 2 and 3 decimal places are tested in the
      // formatNumberWithDecimalScaleRange function
      const modifiedAction = {
        ...action,
        key: 'hours',
      };

      const actual = payRunReducer(state, modifiedAction);

      expect(actual.draftPayRun.lines[0].payLines[0].hours).toEqual('3.00');
    });

    it('should format the hours field of a particular pay item to 0.00 for a NaN input', () => {
      const modifiedAction = {
        ...action,
        key: 'hours',
        value: '-',
      };

      const actual = payRunReducer(state, modifiedAction);

      expect(actual.draftPayRun.lines[0].payLines[0].hours).toEqual('0.00');
    });
  });

  describe('LOAD_DRAFT_PAY_RUN', () => {
    const state = {
      draftPayRun: {
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
            payLines: [
              {
                payItemId: 22,
                name: 'Base Hourly',
                type: 'Earnings',
                amount: '-200.00',
                quantity: '-10.00',
                id: 16,
                calculationType: 'Amount',
                rate: '20.00',
              },
              {
                payItemId: 1,
                name: 'Base Salary',
                type: 'Earnings',
                amount: '-20.00',
                quantity: '-1.00',
                id: 16,
                calculationType: 'Amount',
                rate: '0.00',
              },
              {
                payItemId: 33,
                name: 'Not base hourly',
                type: 'Earnings',
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

      expect(actual.draftPayRun.lines[0].payLines[1].amount).toEqual('0.00');
    });

    it('does not set negative amount to zero for other pay items', () => {
      const actual = payRunReducer(state, action);
      expect(actual.draftPayRun.lines[0].payLines[2].amount).toEqual('-20.00');
    });

    it('sets negative amount to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.draftPayRun.lines[0].payLines[0].amount).toEqual('0.00');
    });

    it('sets negative hours to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.draftPayRun.lines[0].payLines[0].quantity).toEqual('0.00');
    });

    it('sets days paid', () => {
      const ourAction = {
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun: draftPayRun,
      };
      const actual = payRunReducer(state, ourAction);
      expect(actual.draftPayRun.lines[0].daysPaid).toEqual(5);
    });

    it('sets take home pay', () => {
      const ourAction = {
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun: draftPayRun,
      };
      const actual = payRunReducer(state, ourAction);
      expect(actual.draftPayRun.lines[0].takeHomePay).toEqual(700);
    });
  });

  describe('UPDATE_EMPLOYEE_DAYS_PAID', () => {
    it('update daysPaid field in store onChange', () => {
      const state = {
        draftPayRun: {
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

      const actual = payRunReducer(state, action).draftPayRun.lines[0].daysPaid;

      expect(actual).toEqual(expected);
    });

    it('not update daysPaid field in store in case of failure', () => {
      const state = {
        draftPayRun: {
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
          originalLines: [
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
        intent: UPDATE_EMPLOYEE_DAYS_PAID_FAILED,
        employeeId: '1',
        daysPaid: 8,
      };

      const expected = 0;

      const actual = payRunReducer(state, action).draftPayRun.lines[0].daysPaid;

      expect(actual).toEqual(expected);
    });

    it('update daysPaid does not alter other fields', () => {
      const initialState = {
        draftPayRun: {
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
      expected.draftPayRun.lines[0].daysPaid = 1;

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
        draftPayRun: {
          isPayLineDirty: false,
        },
      };

      const action = {
        intent: SET_PAY_LINE_DIRTY,
        isDirty: true,
      };

      const expected = {
        draftPayRun: {
          isPayLineDirty: true,
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('UPDATE_EMPLOYEE_PAY_ITEM', () => {
    it('Employee pay line is updated', () => {
      const state = {
        draftPayRun: {
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
              payLines: [
                {
                  payItemId: 22,
                  name: 'Salary Wage',
                  type: 'Earnings',
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
        intent: UPDATE_EMPLOYEE_PAY_LINE,
        employeeId: 21,
        payItemId: 22,
        key: 'quantity',
        value: 10,
      };
      const expected = {
        draftPayRun: {
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
              payLines: [
                {
                  payItemId: 22,
                  name: 'Salary Wage',
                  type: 'Earnings',
                  amount: '100000.00',
                  quantity: 10,
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

  describe('Open Holidays and leave modal', () => {
    it('should set isAddHolidaysAndLeaveModalOpen to true ', () => {
      const state = {
        draftPayRun: {
          isAddHolidaysAndLeaveModalOpen: false,
        },
      };

      const action = {
        intent: OPEN_ADD_HOLIDAYS_AND_LEAVE_MODAL,
      };

      const expected = {
        draftPayRun: {
          isAddHolidaysAndLeaveModalOpen: true,
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Cancel Holidays and leave modal', () => {
    it('should set isAddHolidaysAndLeaveModalOpen to false ', () => {
      const state = {
        draftPayRun: {
          isAddHolidaysAndLeaveModalOpen: true,
        },
      };

      const action = {
        intent: CANCEL_ADD_HOLIDAYS_AND_LEAVE_MODAL,
      };

      const expected = {
        draftPayRun: {
          isAddHolidaysAndLeaveModalOpen: false,
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
