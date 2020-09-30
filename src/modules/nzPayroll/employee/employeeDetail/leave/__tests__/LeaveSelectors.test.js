import { getHolidayPay } from '../LeaveSelectors';

describe('getHolidayPay', () => {
  it('should get holiday pay', () => {
    const state = {
      payrollDetails: { holidayPay: { holidayPayRate: '5.00' } },
    };
    const expected = { holidayPayRate: '5.00' };

    const actual = getHolidayPay(state);

    expect(actual).toMatchObject(expected);
  });
});
