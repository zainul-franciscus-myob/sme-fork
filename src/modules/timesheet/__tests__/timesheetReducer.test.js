import { ADD_ROW, LOAD_EMPLOYEE_TIMESHEET, SET_TIMESHEET_CELL } from '../timesheetIntents';
import loadEmployeeTimesheet from '../mappings/data/loadEmployeeTimesheet';
import timesheetReducer from '../timesheetReducer';

describe('timesheetReducer', () => {
  describe('LOAD_EMPLOYEE_TIMESHEET', () => {
    it('loads the request payload into the state', () => {
      const state = {
        timesheetRows: [],
      };
      const { timesheetRows } = loadEmployeeTimesheet;
      const action = {
        intent: LOAD_EMPLOYEE_TIMESHEET,
        timesheetRows,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1.00' },
            day2: { hours: '2.00' },
            day3: { hours: '3.00' },
            day4: { hours: '4.00' },
            day5: { hours: '5.00' },
            day6: { hours: '6.00' },
            day7: { hours: '7.00' },
          },
        ],
      });
    });
  });

  describe('ADD_ROW', () => {
    it('adds a row with payItemId', () => {
      const state = {
        timesheetRows: [],
      };

      const action = {
        intent: ADD_ROW,
        rowData: {
          payItemId: '11',
        },
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '11',
            notes: '',
            startStopDescription: '',
            day1: { hours: '' },
            day2: { hours: '' },
            day3: { hours: '' },
            day4: { hours: '' },
            day5: { hours: '' },
            day6: { hours: '' },
            day7: { hours: '' },
          },
        ],
      });
    });

    it('adds a row with notes', () => {
      const state = {
        timesheetRows: [],
      };

      const action = {
        intent: ADD_ROW,
        rowData: {
          notes: 'some new notes',
        },
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '',
            notes: 'some new notes',
            startStopDescription: '',
            day1: { hours: '' },
            day2: { hours: '' },
            day3: { hours: '' },
            day4: { hours: '' },
            day5: { hours: '' },
            day6: { hours: '' },
            day7: { hours: '' },
          },
        ],
      });
    });

    it('adds a row with startStopDescription', () => {
      const state = {
        timesheetRows: [],
      };

      const action = {
        intent: ADD_ROW,
        rowData: {
          startStopDescription: 'some new start stop description',
        },
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '',
            notes: '',
            startStopDescription: 'some new start stop description',
            day1: { hours: '' },
            day2: { hours: '' },
            day3: { hours: '' },
            day4: { hours: '' },
            day5: { hours: '' },
            day6: { hours: '' },
            day7: { hours: '' },
          },
        ],
      });
    });

    it('adds a row with day', () => {
      const state = {
        timesheetRows: [],
      };

      const action = {
        intent: ADD_ROW,
        rowData: {
          day2: '5',
        },
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '',
            notes: '',
            startStopDescription: '',
            day1: { hours: '' },
            day2: { hours: '5' },
            day3: { hours: '' },
            day4: { hours: '' },
            day5: { hours: '' },
            day6: { hours: '' },
            day7: { hours: '' },
          },
        ],
      });
    });
  });

  describe('SET_TIMESHEET_CELL', () => {
    it('updates timesheetRow notes cell value', () => {
      const state = {
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1' },
            day2: { hours: '' },
            day3: { hours: '' },
            day4: { hours: '' },
            day5: { hours: '' },
            day6: { hours: '' },
            day7: { hours: '' },
          },
        ],
      };

      const action = {
        intent: SET_TIMESHEET_CELL,
        index: 0,
        name: 'notes',
        value: 'new note value',
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'new note value',
            startStopDescription: 'some description',
            day1: { hours: '1' },
            day2: { hours: '' },
            day3: { hours: '' },
            day4: { hours: '' },
            day5: { hours: '' },
            day6: { hours: '' },
            day7: { hours: '' },
          },
        ],
      });
    });

    it('updates timesheetRow day cell value', () => {
      const state = {
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1' },
            day2: { hours: '2' },
            day3: { hours: '3' },
            day4: { hours: '4' },
            day5: { hours: '5' },
            day6: { hours: '6' },
            day7: { hours: '7' },
          },
        ],
      };

      const action = {
        intent: SET_TIMESHEET_CELL,
        index: 0,
        name: 'day2',
        value: '10',
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1' },
            day2: { hours: '10' },
            day3: { hours: '3' },
            day4: { hours: '4' },
            day5: { hours: '5' },
            day6: { hours: '6' },
            day7: { hours: '7' },
          },
        ],
      });
    });

    it('updates timesheetRow pay items cell value', () => {
      const state = {
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1' },
            day2: { hours: '2' },
            day3: { hours: '3' },
            day4: { hours: '4' },
            day5: { hours: '5' },
            day6: { hours: '6' },
            day7: { hours: '7' },
          },
        ],
      };

      const action = {
        intent: SET_TIMESHEET_CELL,
        index: 0,
        name: 'payItemId',
        value: '12',
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '12',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1' },
            day2: { hours: '2' },
            day3: { hours: '3' },
            day4: { hours: '4' },
            day5: { hours: '5' },
            day6: { hours: '6' },
            day7: { hours: '7' },
          },
        ],
      });
    });

    it('updates timesheetRow start stop description value', () => {
      const state = {
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1' },
            day2: { hours: '2' },
            day3: { hours: '3' },
            day4: { hours: '4' },
            day5: { hours: '5' },
            day6: { hours: '6' },
            day7: { hours: '7' },
          },
        ],
      };

      const action = {
        intent: SET_TIMESHEET_CELL,
        index: 0,
        name: 'startStopDescription',
        value: 'some new start stop description',
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some new start stop description',
            day1: { hours: '1' },
            day2: { hours: '2' },
            day3: { hours: '3' },
            day4: { hours: '4' },
            day5: { hours: '5' },
            day6: { hours: '6' },
            day7: { hours: '7' },
          },
        ],
      });
    });
  });
});
