import { CREATE_LEAVE_PAY_ITEM, UPDATE_LEAVE_PAY_ITEM } from '../../../../EmployeeIntents';
import reducers from '../LeavePayItemModalReducer';

describe('LeavePayItemModalReducer', () => {
  describe('updateLeavePayItem', () => {
    it('update leave pay item', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              {
                payItemId: '1', carryOver: '123', name: 'old',
              },
            ],
          },
        },
        leavePayItemOptions: [],
      };

      const action = {
        intent: UPDATE_LEAVE_PAY_ITEM,
        leavePayItem: { payItemId: '1', name: 'new' },
        leavePayItemOptions: [{ payItemId: '1', name: 'new' }],
      };

      const expected = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              {
                payItemId: '1', carryOver: '123', name: 'new',
              },
            ],
          },
        },
        leavePayItemOptions: [{ payItemId: '1', name: 'new' }],
      };

      const actual = reducers[UPDATE_LEAVE_PAY_ITEM](state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('createLeavePayItem', () => {
    it('create leave pay item', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [],
          },
        },
        leavePayItemOptions: [],
      };

      const action = {
        intent: CREATE_LEAVE_PAY_ITEM,
        leavePayItem: { payItemId: '1', name: 'new' },
        leavePayItemOptions: [{ payItemId: '1', name: 'new' }],
      };

      const expected = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              {
                payItemId: '1', carryOver: '0', name: 'new',
              },
            ],
          },
        },
        isPageEdited: true,
        leavePayItemOptions: [{ payItemId: '1', name: 'new' }],
      };

      const actual = reducers[CREATE_LEAVE_PAY_ITEM](state, action);

      expect(actual).toEqual(expected);
    });
  });
});
