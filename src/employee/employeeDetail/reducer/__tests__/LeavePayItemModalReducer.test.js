import {
  CREATE_LEAVE_PAY_ITEM,
  UPDATE_LEAVE_PAY_ITEM,
  UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS_AMOUNTS,
} from '../../../EmployeeIntents';
import {
  createLeavePayItem,
  updateLeavePayItem,
  updateLeavePayItemModalCalculationBasisAmounts,
} from '../LeavePayItemModalReducer';

describe('LeavePayItemModalReducer', () => {
  describe('updateLeavePayItemModalCalculationBasisAmounts', () => {
    it('should format percentages', () => [
      ['many decimal places', '25.00006', '25.00006'],
      ['trailing zeros', '25.00050', '25.0005'],
      ['1 decimal place', '25.50000', '25.50'],
      ['whole number', '25.00000', '25.00'],
      ['hyphen', '-', '0.00'],
    ].forEach((i) => {
      const [, input, expected] = i;

      const state = {
        leavePayItemModal: {},
      };

      const action = {
        intent: UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS_AMOUNTS,
        key: 'calculationBasisPercentage',
        value: input,
      };

      const actual = updateLeavePayItemModalCalculationBasisAmounts(state, action);

      expect(actual.leavePayItemModal.leavePayItem.calculationBasisPercentage).toEqual(expected);
    }));
  });

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

      const actual = updateLeavePayItem(state, action);

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

      const actual = createLeavePayItem(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
