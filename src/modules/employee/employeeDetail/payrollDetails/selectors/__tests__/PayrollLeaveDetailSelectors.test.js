import {
  getFilteredLeavePayItemOptions,
  getLeavePayItems,
} from '../PayrollLeaveDetailSelectors';

describe('PayrollLeaveDetailSelectors', () => {
  describe('getFilteredLeavePayItemOptions', () => {
    it('should not contain allocated leave that has already been added to employee', () => {
      const payItemOptions = [{ id: '1' }, { id: '2' }];
      const payItems = [{ payItemId: '1' }];

      const actual = getFilteredLeavePayItemOptions
        .resultFunc(payItemOptions, payItems);

      expect(actual.find(item => item.id === '1')).toBeFalsy();
      expect(actual.find(item => item.id === '2')).toBeTruthy();
    });
  });

  describe('getLeavePayItems', () => {
    it('calculates the sum of the carry over and year to date amounts', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              { balanceAdjustment: '5.5', carryOver: '12.3', yearToDate: '21.21' },
            ],
          },
        },
      };
      const actual = getLeavePayItems(state);
      expect(actual[0].total).toEqual('39.01');
    });

    it('returns 0 when the carry over and balance adjustment amount is not a number', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              { ballanceAdjustment: 'test', carryOver: 'foo', yearToDate: '21.21' },
            ],
          },
        },
      };
      const actual = getLeavePayItems(state);
      expect(actual[0].total).toEqual('21.21');
    });

    it('returns 0 when the balance adjustment amount is not defined', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              { balanceadjustment: 'test' },
            ],
          },
        },
      };
      const actual = getLeavePayItems(state);
      expect(actual[0].total).toEqual('0.00');
    });

    it('returns 0 when the carry over amount is not defined', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              { carryOver: 'foo' },
            ],
          },
        },
      };
      const actual = getLeavePayItems(state);
      expect(actual[0].total).toEqual('0.00');
    });
  });
});
