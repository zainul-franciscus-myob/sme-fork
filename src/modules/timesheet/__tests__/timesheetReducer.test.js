import {
  ADD_ROW, LOAD_EMPLOYEE_TIMESHEET, REMOVE_ROW, SET_TIMESHEET_CELL,
} from '../timesheetIntents';
import loadEmployeeTimesheet from '../mappings/data/loadEmployeeTimesheet';
import timesheetReducer from '../timesheetReducer';

describe('timesheetReducer', () => {
  describe('LOAD_EMPLOYEE_TIMESHEET', () => {
    it('loads the request payload into the state', () => {
      const state = {
        timesheetRows: [],
        employeeAllowedPayItems: [],
      };
      const { timesheetRows, allowedPayItems } = loadEmployeeTimesheet;
      const action = {
        intent: LOAD_EMPLOYEE_TIMESHEET,
        timesheetRows,
        allowedPayItems,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        employeeAllowedPayItems: ['39'],
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1.00', readonly: true },
            day2: { hours: '2.00', readonly: false },
            day3: { hours: '3.00', readonly: false },
            day4: { hours: '4.00', readonly: false },
            day5: { hours: '5.00', readonly: false },
            day6: { hours: '6.00', readonly: false },
            day7: { hours: '7.00', readonly: false },
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
            day1: { hours: '', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
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
            day1: { hours: '', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
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
            day1: { hours: '', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
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
            day1: { hours: '', readonly: false },
            day2: { hours: '5', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
        ],
      });
    });
  });

  describe('REMOVE_ROW', () => {
    it('removes the timesheet row', () => {
      const state = {
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
        ],
      };

      const action = {
        intent: REMOVE_ROW,
        rowIndex: 0,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [],
      });
    });

    it('removes the correct timesheet row', () => {
      const state = {
        timesheetRows: [
          {
            payItemId: '10',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
          {
            payItemId: '12',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
        ],
      };

      const action = {
        intent: REMOVE_ROW,
        rowIndex: 1,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetRows: [
          {
            payItemId: '10',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
          {
            payItemId: '12',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
        ],
      });
    });

    it('does not remove the row if it has read only values', () => {
      const state = {
        timesheetRows: [
          {
            payItemId: '11',
            notes: 'some notes',
            startStopDescription: 'some description',
            day1: { hours: '1', readonly: true },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
          },
        ],
      };

      const action = {
        intent: REMOVE_ROW,
        rowIndex: 0,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual(state);
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '', readonly: false },
            day3: { hours: '', readonly: false },
            day4: { hours: '', readonly: false },
            day5: { hours: '', readonly: false },
            day6: { hours: '', readonly: false },
            day7: { hours: '', readonly: false },
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '2', readonly: false },
            day3: { hours: '3', readonly: false },
            day4: { hours: '4', readonly: false },
            day5: { hours: '5', readonly: false },
            day6: { hours: '6', readonly: false },
            day7: { hours: '7', readonly: false },
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '10', readonly: false },
            day3: { hours: '3', readonly: false },
            day4: { hours: '4', readonly: false },
            day5: { hours: '5', readonly: false },
            day6: { hours: '6', readonly: false },
            day7: { hours: '7', readonly: false },
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '2', readonly: false },
            day3: { hours: '3', readonly: false },
            day4: { hours: '4', readonly: false },
            day5: { hours: '5', readonly: false },
            day6: { hours: '6', readonly: false },
            day7: { hours: '7', readonly: false },
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '2', readonly: false },
            day3: { hours: '3', readonly: false },
            day4: { hours: '4', readonly: false },
            day5: { hours: '5', readonly: false },
            day6: { hours: '6', readonly: false },
            day7: { hours: '7', readonly: false },
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '2', readonly: false },
            day3: { hours: '3', readonly: false },
            day4: { hours: '4', readonly: false },
            day5: { hours: '5', readonly: false },
            day6: { hours: '6', readonly: false },
            day7: { hours: '7', readonly: false },
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
            day1: { hours: '1', readonly: false },
            day2: { hours: '2', readonly: false },
            day3: { hours: '3', readonly: false },
            day4: { hours: '4', readonly: false },
            day5: { hours: '5', readonly: false },
            day6: { hours: '6', readonly: false },
            day7: { hours: '7', readonly: false },
          },
        ],
      });
    });
  });
});
