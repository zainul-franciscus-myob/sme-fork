import { getTimesheetTotalHours } from '../timesheetSelectors';

describe('timesheetSelectors', () => {
  describe('getTimesheetTotalHours', () => {
    it('returns zero when no hours entered', () => {
      const state = {
        timesheetRows: [{
          day1: { hours: 0 },
          day2: { hours: 0 },
          day3: { hours: 0 },
          day7: { hours: 0 },
        }],
      };

      const actual = getTimesheetTotalHours(state);

      expect(actual).toEqual(0);
    });

    it('sums up the hours for all rows', () => {
      const state = {
        timesheetRows: [{
          day1: { hours: 1 },
          day2: { hours: 0 },
          day3: { hours: 0 },
          day7: { hours: 1 },
        },
        {
          day4: { hours: 1 },
          day5: { hours: 2 },
          day6: { hours: 1.5 },
          day7: { hours: 2 },
        }],
      };

      const actual = getTimesheetTotalHours(state);

      expect(actual).toEqual(8.5);
    });
  });
});
