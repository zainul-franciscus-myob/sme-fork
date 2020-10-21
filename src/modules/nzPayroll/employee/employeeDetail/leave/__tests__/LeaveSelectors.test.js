import { getLeaveDetails } from '../LeaveSelectors';

describe('getLeaveDetails', () => {
  it('should get leave details', () => {
    const leave = { holidayPayRate: '5.00' };
    const state = { payrollDetails: { leave } };
    const actual = getLeaveDetails(state);
    expect(actual).toMatchObject(leave);
  });
});
