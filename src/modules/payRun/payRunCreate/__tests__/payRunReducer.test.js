import { DELETE_PAY_RUN_DRAFT, EDIT_EXISTING_PAY_RUN } from '../PayRunIntents';
import payRunReducer from '../payRunReducer';

describe('payRunReducer', () => {
  describe('DELETE_PAY_RUN_DRAFT', () => {
    it('sets sets currentEditingPayRun and removes draft and new', () => {
      const state = {
        otherThings: '123',
        startPayRun: {
          thing: 'abc',
          currentEditingPayRun: { newPayRunInfo: 'new pay run information' },
          draftPayRun: { draftInfo: 'draft pay run information' },
        },
      };

      const action = {
        intent: DELETE_PAY_RUN_DRAFT,
      };

      const result = payRunReducer(state, action);

      const expected = {
        otherThings: '123',
        startPayRun: {
          thing: 'abc',
          currentEditingPayRun: { newPayRunInfo: 'new pay run information' },
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('EDIT_EXISTING_PAY_RUN', () => {
    const state = {
      otherThings: '123',
      startPayRun: {
        thing: 'abc',
        currentEditingPayRun: { current: 'Current pay run info' },
        draftPayRun: { something: 'blah' },
      },
    };

    const draftData = {
      draftInfo: 'draft pay run information',
      moreDraftInfo: 'More draft info',
    };

    const action = {
      intent: EDIT_EXISTING_PAY_RUN,
      draftPayRun: {
        ...draftData,
        selectedEmployeeIds: [22, 23],
        employeePays: [
          {
            employeeId: 21,
            payInfo: 'pay information 1',
            payItems: [{ line: 1 }, { line: 2 }],
          },
          {
            employeeId: 22,
            payInfo: 'pay information 2',
            payItems: [{ line: 3 }, { line: 4 }],
          },
        ],
      },
    };

    const result = payRunReducer(state, action);

    it('removes the draftPayRun from startPayRun', () => {
      expect(result.startPayRun.draftPayRun).toBeUndefined();
    });

    it('sets currentEditingPayRun to be equal to the input draftPayRun minus selectedEmployees and employeePays', () => {
      expect(result.startPayRun.currentEditingPayRun).toEqual(draftData);
    });

    it('sets the employeePayList as expected', () => {
      const expected = {
        lines: [
          {
            employeeId: 21,
            payInfo: 'pay information 1',
            isSelected: false,
            payItems: [
              {
                line: 1,
                isSubmitting: false,
                ignoreUnderAllocationWarning: true,
              },
              {
                line: 2,
                isSubmitting: false,
                ignoreUnderAllocationWarning: true,
              },
            ],
          },
          {
            employeeId: 22,
            payInfo: 'pay information 2',
            isSelected: true,
            payItems: [
              {
                line: 3,
                isSubmitting: false,
                ignoreUnderAllocationWarning: true,
              },
              {
                line: 4,
                isSubmitting: false,
                ignoreUnderAllocationWarning: true,
              },
            ],
          },
        ],
        originalLines: [
          {
            employeeId: 21,
            payInfo: 'pay information 1',
            payItems: [{ line: 1 }, { line: 2 }],
          },
          {
            employeeId: 22,
            payInfo: 'pay information 2',
            payItems: [{ line: 3 }, { line: 4 }],
          },
        ],
      };

      expect(result.employeePayList).toEqual(expected);
    });

    describe('clear negative values for base pay items', () => {
      const actionWithNegativeValues = {
        intent: EDIT_EXISTING_PAY_RUN,
        draftPayRun: {
          ...draftData,
          selectedEmployeeIds: [22, 23],
          baseHourlyWagePayItemId: 2,
          baseSalaryWagePayItemId: 1,
          employeePays: [
            {
              employeeId: 21,
              name: 'Jones Mary',
              payItems: [
                {
                  payItemId: 1,
                  payItemName: 'Salary Wage',
                  amount: '-100.00',
                  hours: '-10.00',
                },
                {
                  payItemId: 2,
                  payItemName: 'Hourly Wage',
                  amount: '-200.00',
                  hours: '-20.00',
                },
                {
                  payItemId: 3,
                  payItemName: 'Other Wage',
                  amount: '-200.00',
                  hours: '-20.00',
                },
              ],
            },
          ],
        },
      };

      const actual = payRunReducer(state, actionWithNegativeValues);

      it('sets negative amount to zero for base salary pay item in lines', () => {
        expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
          '0.00'
        );
      });

      it('sets negative hours to zero for base salary pay item in lines', () => {
        expect(actual.employeePayList.lines[0].payItems[0].hours).toEqual(
          '0.00'
        );
      });

      it('sets negative amount to zero for base hourly pay item in lines', () => {
        expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual(
          '0.00'
        );
      });

      it('sets negative hours to zero for base hourly pay item in lines', () => {
        expect(actual.employeePayList.lines[0].payItems[1].hours).toEqual(
          '0.00'
        );
      });

      it('does not set negative amount to zero for other pay items in lines', () => {
        expect(actual.employeePayList.lines[0].payItems[2].amount).toEqual(
          '-200.00'
        );
      });

      it('does not set negative hours to zero for other pay items in lines', () => {
        expect(actual.employeePayList.lines[0].payItems[2].hours).toEqual(
          '-20.00'
        );
      });
    });
  });
});
