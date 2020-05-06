
import { getLeaveDetails } from '../LeaveSelectors';

describe('getLeaveDetails', () => {
  it('should get leave details', () => {
    const state = {
      payrollDetails: { leave: { holidayPay: '5.00' } },
    };
    const expected = { holidayPay: '5.00' };

    const actual = getLeaveDetails(state);

    expect(actual).toMatchObject(expected);
  });
});
