import {
  CHANGE_ETP_CODE,
  CHANGE_ETP_CODE_CATEGORY,
  CLEAR_MODIFYING_STATE,
  CLOSE_ETP_MODAL,
  FORMAT_EMPLOYEE_PAY_ITEM,
  HIDE_WARNING_TOOLTIP,
  LOAD_EMPLOYEE_PAYS,
  OPEN_ETP_MODAL,
  SAVE_ETP,
  SET_MODIFYING_STATE,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../../PayRunIntents';
import EtpCode from '../types/EtpCode';
import EtpCodeCategory from '../types/EtpCodeCategory';
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
          isPageEdited: true,
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
  describe('setModifyingState', () => {
    it('should set modifyingPayItemId, modifyingKey, modifyingEmployeeId ', () => {
      const state = {
        employeePayList: {},
      };
      const payItemId = 1;
      const employeeId = 25;
      const key = 'hours';
      const action = {
        intent: SET_MODIFYING_STATE,
        payItemId,
        employeeId,
        key,
      };
      const expected = {
        employeePayList: {
          modifyingPayItemId: payItemId,
          modifyingKey: key,
          modifyingEmployeeId: employeeId,
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('clearModifyingState', () => {
    it('should clear modifying modifyingPayItemId, modifyingKey, modifyingEmployeeId', () => {
      const state = {
        employeePayList: {
          modifyingPayItemId: 1,
          modifyingKey: 25,
          modifyingEmployeeId: 'amount',
        },
      };

      const action = {
        intent: CLEAR_MODIFYING_STATE,
      };
      const expected = {
        employeePayList: {
          modifyingPayItemId: null,
          modifyingKey: null,
          modifyingEmployeeId: null,
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
          isPageEdited: true,
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('OPEN_ETP_MODAL', () => {
    it('opens etp modal with given employee id', () => {
      const state = {
        employeePayList: {
          etp: {},
        },
      };
      const action = {
        intent: OPEN_ETP_MODAL,
        employeeId: '1',
      };

      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.etp).toEqual({
        employeeId: '1',
        isOpen: true,
      });
    });
  });

  describe('CLOSE_ETP_MODAL', () => {
    it('resets etp modal to default closed state', () => {
      const state = {
        employeePayList: {
          etp: {},
        },
      };
      const action = {
        intent: CLOSE_ETP_MODAL,
      };

      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.etp).toEqual({
        employeeId: '',
        isOpen: false,
      });
    });
  });

  describe('CHANGE_ETP_CODE', () => {
    it('changes etp code', () => {
      const state = {
        employeePayList: {
          etp: {
            code: EtpCode.B,
          },
        },
      };
      const action = {
        intent: CHANGE_ETP_CODE,
        etpCode: EtpCode.D,
      };

      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.etp.code).toEqual(EtpCode.D);
    });
  });

  describe('CHANGE_ETP_CODE_CATEGORY', () => {
    it('changes etp code', () => {
      const state = {
        employeePayList: {
          etp: {
            category: EtpCodeCategory.LIFE,
          },
        },
      };
      const action = {
        intent: CHANGE_ETP_CODE_CATEGORY,
        etpCodeCategory: EtpCodeCategory.DEATH,
      };

      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.etp.category).toEqual(
        EtpCodeCategory.DEATH
      );
    });
  });

  describe('SAVE_ETP', () => {
    it('saves etp code to the corresponding employee', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '1',
            },
          ],
          etp: {
            employeeId: '1',
            code: EtpCode.B,
          },
        },
      };
      const action = {
        intent: SAVE_ETP,
      };

      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines).toEqual([
        {
          employeeId: '1',
          etpCode: EtpCode.B,
        },
      ]);
    });
  });

  describe('old UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION when toggle is off', () => {
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
              payItems: [
                {
                  payItemId: '11',
                  payItemName: 'PayGWithholding',
                  type: 'Tax',
                  amount: '222.00',
                  isSubmitting: true,
                  hours: '1.00',
                  ignoreUnderAllocationWarning: true,
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
              payItems: [
                {
                  payItemId: '11',
                  payItemName: 'PayGWithholding',
                  type: 'Tax',
                  amount: '222.00',
                  hours: '0.00',
                },
              ],
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
        isAllowNegativesInPayRuns: false,
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
              payItems: [
                {
                  payItemId: '11',
                  payItemName: 'PayGWithholding',
                  type: 'Tax',
                  isSubmitting: false,
                  amount: '222.00',
                  hours: '1.00',
                  ignoreUnderAllocationWarning: true,
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
              payItems: [
                {
                  payItemId: '11',
                  payItemName: 'PayGWithholding',
                  type: 'Tax',
                  amount: '222.00',
                  hours: '1.00',
                },
              ],
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
              payItems: [
                {
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
                },
              ],
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
        isAllowNegativesInPayRuns: false,
      };

      it('clears the negative amount for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
          '0.00'
        );
      });

      it('clears the negative hours for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].hours).toEqual(
          '0.00'
        );
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

        expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual(
          '-10.00'
        );
      });

      it('does not clear the negative hours for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: '1',
          recalculatedEmployeePay: recalculatedEmployeePayForNonBaseHourly,
        });

        expect(actual.employeePayList.lines[0].payItems[1].hours).toEqual(
          '-20.00'
        );
      });
    });
  });

  describe('new UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION when toggle is on', () => {
    it('should update employee lines only', () => {
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
              payItems: [
                {
                  payItemId: '11',
                  payItemName: 'PayGWithholding',
                  type: 'Tax',
                  amount: '222.00',
                  isSubmitting: true,
                  hours: '0.00',
                  calculatedAmount: 222,
                  calculatedHours: 0,
                  ignoreUnderAllocationWarning: true,
                },
              ],
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
            calculatedAmount: 222,
            calculatedHours: 1,
          },
        ],
      };
      const action = {
        intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
        employeeId: '1',
        recalculatedEmployeePay,
        isAllowNegativesInPayRuns: true,
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
              payItems: [
                {
                  payItemId: '11',
                  payItemName: 'PayGWithholding',
                  type: 'Tax',
                  isSubmitting: false,
                  amount: '222.00',
                  hours: '1.00',
                  calculatedAmount: 222,
                  calculatedHours: 1,
                  ignoreUnderAllocationWarning: true,
                },
              ],
            },
          ],
        },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });

    describe('not clearing negative values after recalculate', () => {
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
                  calculatedAmount: 0,
                  calculatedHours: 0,
                },
                {
                  payItemId: '10',
                  payItemName: 'Some other wage',
                  type: 'HourlyWage',
                  amount: '-10.00',
                  isSubmitting: true,
                  hours: '-20.00',
                  calculatedAmount: -10,
                  calculatedHours: -20,
                },
              ],
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
            calculatedAmount: 0,
            calculatedHours: -1,
          },
        ],
      };

      const action = {
        intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
        employeeId: '1',
        recalculatedEmployeePay,
        isAllowNegativesInPayRuns: true,
      };

      it('does not clear the negative amount for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
          '-20.00'
        );
        expect(
          actual.employeePayList.lines[0].payItems[0].calculatedAmount
        ).toEqual(0);
      });

      it('does not clear the negative hours for base hourly', () => {
        const actual = payRunReducer(state, action);

        expect(actual.employeePayList.lines[0].payItems[0].hours).toEqual(
          '-1.00'
        );
        expect(
          actual.employeePayList.lines[0].payItems[0].calculatedHours
        ).toEqual(-1);
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
            calculatedAmount: 222,
            calculatedHours: 1,
          },
          {
            payItemId: '10',
            payItemName: 'Some other wage',
            type: 'NonHourlyWage',
            amount: '-10.00',
            isSubmitting: true,
            hours: '-20.00',
            calculatedAmount: -10,
            calculatedHours: -20,
          },
        ],
      };

      it('does not clear the negative amount for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: '1',
          recalculatedEmployeePay: recalculatedEmployeePayForNonBaseHourly,
          isAllowNegativesInPayRuns: true,
        });

        expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual(
          '-10.00'
        );
        expect(
          actual.employeePayList.lines[0].payItems[1].calculatedAmount
        ).toEqual(-10);
      });

      it('does not clear the negative hours for non base hourly', () => {
        const actual = payRunReducer(state, {
          intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
          employeeId: '1',
          recalculatedEmployeePay: recalculatedEmployeePayForNonBaseHourly,
          isAllowNegativesInPayRuns: true,
        });

        expect(actual.employeePayList.lines[0].payItems[1].hours).toEqual(
          '-20.00'
        );
        expect(
          actual.employeePayList.lines[0].payItems[1].calculatedHours
        ).toEqual(-20);
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

  describe('new LOAD_EMPLOYEE_PAYS when toggle is on', () => {
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
                calculatedAmount: -100,
                calculatedHours: 0,
              },
              {
                payItemId: 2,
                payItemName: 'Hourly Wage',
                amount: '-100.00',
                hours: '-10.00',
                calculatedAmount: -200,
                calculatedHours: -1.11,
              },
              {
                payItemId: 3,
                payItemName: 'Annual leave',
                amount: '-10.00',
                hours: '-10.00',
                calculatedAmount: -10,
                calculatedHours: -10,
              },
            ],
          },
        ],
      },
      isAllowNegativesInPayRuns: true,
    };

    it('does not transfer negative amount to zero for base salary pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
        '-100.00'
      );
      expect(
        actual.employeePayList.lines[0].payItems[0].calculatedAmount
      ).toEqual(-100);
    });

    it('does not transfer negative amount to zero for other pay items', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[2].amount).toEqual(
        '-10.00'
      );
      expect(
        actual.employeePayList.lines[0].payItems[2].calculatedAmount
      ).toEqual(-10);
    });

    it('does not transfer negative amount to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual(
        '-100.00'
      );
      expect(
        actual.employeePayList.lines[0].payItems[1].calculatedAmount
      ).toEqual(-200);
    });

    it('does not transfer negative hours to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[1].hours).toEqual(
        '-10.00'
      );
      expect(
        actual.employeePayList.lines[0].payItems[1].calculatedHours
      ).toEqual(-1.11);
    });
  });

  describe('old LOAD_EMPLOYEE_PAYS when toggle is off', () => {
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
      isAllowNegativesInPayRuns: false,
    };

    it('sets negative amount to zero for base salary pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[0].amount).toEqual(
        '0.00'
      );
    });

    it('does not set negative amount to zero for other pay items', () => {
      const actual = payRunReducer(state, action);
      expect(actual.employeePayList.lines[0].payItems[2].amount).toEqual(
        '-10.00'
      );
    });

    it('sets negative amount to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[1].amount).toEqual(
        '0.00'
      );
    });

    it('sets negative hours to zero for base hourly pay item in the lines', () => {
      const actual = payRunReducer(state, action);

      expect(actual.employeePayList.lines[0].payItems[1].hours).toEqual('0.00');
    });
  });

  describe('HIDE_WARNING_TOOLTIP', () => {
    const state = {
      employeePayList: {
        lines: [
          {
            employeeId: '1',
            payItems: [
              {
                payItemId: '11',
                ignoreUnderAllocationWarning: false,
              },
              {
                payItemId: '12',
                ignoreUnderAllocationWarning: false,
              },
            ],
          },
        ],
        selectedPayItem: {
          payItemId: '11',
        },
        selectedEmployeeId: '1',
      },
    };
    const action = {
      intent: HIDE_WARNING_TOOLTIP,
      status: true,
    };
    const actual = payRunReducer(state, action);

    it('should update ignoreUnderAllocationWarning on correct payItem', () => {
      expect(
        actual.employeePayList.lines[0].payItems[0].ignoreUnderAllocationWarning
      ).toBeTruthy();
    });

    it('should update ignoreUnderAllocationWarning on correct payItem', () => {
      expect(
        actual.employeePayList.lines[0].payItems[1].ignoreUnderAllocationWarning
      ).toBeFalsy();
    });
  });
});
