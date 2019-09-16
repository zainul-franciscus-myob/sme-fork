import {
  CHANGE_ETP_CODE,
  CHANGE_ETP_CODE_CATEGORY,
  CLOSE_ETP_MODAL,
  FORMAT_EMPLOYEE_PAY_ITEM,
  OPEN_ETP_MODAL,
  SAVE_ETP,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
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
        EtpCodeCategory.DEATH,
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
});
