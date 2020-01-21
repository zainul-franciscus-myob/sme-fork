import { getDeleteTimesheetContent, getSaveTimesheetContent, getTimesheetTotalHours } from '../timesheetSelectors';

describe('timesheetSelectors', () => {
  describe('getTimesheetTotalHours', () => {
    it('returns zero when no hours entered', () => {
      const state = {
        timesheetRows: [{
          day1: { hours: '' },
          day2: { hours: '' },
          day3: { hours: '' },
          day7: { hours: '' },
        }],
      };

      const actual = getTimesheetTotalHours(state);

      expect(actual).toEqual('0.00');
    });

    it('sums up the hours for all rows', () => {
      const state = {
        timesheetRows: [{
          day1: { hours: '1' },
          day2: { hours: '0' },
          day3: { hours: '0' },
          day7: { hours: '1' },
        },
        {
          day4: { hours: '1' },
          day5: { hours: '2' },
          day6: { hours: '1.5' },
          day7: { hours: '2' },
        }],
      };

      const actual = getTimesheetTotalHours(state);

      expect(actual).toEqual('8.50');
    });
  });

  describe('getDeleteTimesheetContent', () => {
    it('builds the request content', () => {
      const state = {
        weekStartDate: '2020-02-02',
        selectedEmployeeId: 2,
        employeeList: [
          {
            name: 'Kent Clark',
            employeeDisplayId: 'EMP002',
            phoneNumber: '0400000022',
            id: 2,
          },
        ],
      };

      const actual = getDeleteTimesheetContent(state);

      expect(actual).toEqual({
        weekStartDate: '2020-02-02',
        employeeName: 'Kent Clark',
      });
    });
  });

  describe('getSaveTimesheetContent', () => {
    it('builds the request content', () => {
      const state = {
        weekStartDate: '2020-02-02',
        selectedEmployeeId: 2,
        employeeList: [
          {
            name: 'Kent Clark',
            employeeDisplayId: 'EMP002',
            phoneNumber: '0400000022',
            id: 2,
          },
        ],
        timesheetRows: [{
          notes: '',
          startStopDescription: '',
          day1: { hours: '1' },
          day2: { hours: '0.00' },
          day3: { hours: '' },
          day4: { hours: '0' },
          day7: { hours: '1.50' },
        }],
      };

      const actual = getSaveTimesheetContent(state);

      expect(actual).toEqual({
        startDate: '2020-02-02',
        employeeName: 'Kent Clark',
        timesheetRows: [{
          notes: null,
          startStopDescription: null,
          day1: { hours: 1 },
          day2: { hours: 0 },
          day3: { hours: 0 },
          day4: { hours: 0 },
          day5: { hours: 0 },
          day6: { hours: 0 },
          day7: { hours: 1.5 },
        }],
      });
    });
  });
});
