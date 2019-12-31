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
            payItems: [
              { line: 1 },
              { line: 2 },
            ],
          },
          {
            employeeId: 22,
            payInfo: 'pay information 2',
            payItems: [
              { line: 3 },
              { line: 4 },
            ],
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
              { line: 1, isSubmitting: false },
              { line: 2, isSubmitting: false },
            ],
          },
          {
            employeeId: 22,
            payInfo: 'pay information 2',
            isSelected: true,
            payItems: [
              { line: 3, isSubmitting: false },
              { line: 4, isSubmitting: false },
            ],
          },
        ],
      };

      expect(result.employeePayList).toEqual(expected);
    });
  });
});
