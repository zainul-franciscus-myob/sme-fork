import { SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL } from '../EmployeePayModalIntents';
import employeePayModalReducer from '../employeePayModalReducer';

describe('employeePayModalReducer', () => {
  const reducer = employeePayModalReducer;

  describe('SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL', () => {
    it('sets the correct reversal state when loading a reversal pay transaction', () => {
      const state = { employeePay: { isReversalPreview: false } };
      const action = {
        intent: SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL,
        response: {},
      };

      const actual = reducer(state, action);
      expect(actual.employeePay.isReversalPreview).toBeTruthy();
    });
  });
});
