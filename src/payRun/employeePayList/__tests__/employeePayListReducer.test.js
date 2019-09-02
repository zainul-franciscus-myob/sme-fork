import { UPDATE_ARE_ALL_EMPLOYEES_SELECTED, UPDATE_IS_EMPLOYEE_SELECTED } from '../../PayRunIntents';
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
});
