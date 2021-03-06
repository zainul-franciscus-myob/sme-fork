import {
  ADD_ROW,
  CLOSE_UNSAVED_CHANGES_MODAL,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_JOB_AFTER_CREATE,
  REMOVE_ROW,
  SET_MODAL,
  SET_TIMESHEET_CELL,
} from '../timesheetIntents';
import ModalType from '../ModalType';
import UnsavedChangesModalActions from '../UnsavedChangesModalActions';
import loadEmployeeTimesheet from '../mappings/data/loadEmployeeTimesheet';
import timesheetReducer from '../timesheetReducer';

describe('timesheetReducer', () => {
  const jobOptions = [
    {
      id: '1',
      jobNumber: '100',
      jobName: 'Job 1',
      isActive: false,
    },
    {
      id: '2',
      jobNumber: '200',
      jobName: 'Job 2 with a long name',
      isActive: false,
    },
    {
      id: '3',
      jobNumber: '12345678901234',
      jobName: 'Job 3 with an even longer name',
      isActive: true,
    },
  ];

  describe('LOAD_EMPLOYEE_TIMESHEET', () => {
    it('loads the request payload into the state', () => {
      const state = {
        timesheetRows: [],
        employeeAllowedPayItems: [],
        jobOptions,
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
        jobOptions,
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
            jobOptions: [
              {
                id: '1',
                jobNumber: '100',
                jobName: 'Job 1',
                isActive: false,
              },
              {
                id: '3',
                jobNumber: '12345678901234',
                jobName: 'Job 3 with an even longer name',
                isActive: true,
              },
            ],
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
        timesheetIsDirty: false,
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '',
            jobOptions: [],
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
        timesheetIsDirty: false,
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '',
            jobId: '',
            jobOptions: [],
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
        timesheetIsDirty: false,
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '',
            jobId: '',
            jobOptions: [],
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
        timesheetIsDirty: false,
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '',
            jobId: '',
            jobOptions: [],
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

    it('adds a row with active jobs options', () => {
      const state = {
        timesheetIsDirty: false,
        timesheetRows: [],
        jobOptions,
      };

      const action = {
        intent: ADD_ROW,
        rowData: {},
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        timesheetIsDirty: true,
        jobOptions,
        timesheetRows: [
          {
            payItemId: '',
            jobId: '',
            jobOptions: [
              {
                id: '3',
                jobNumber: '12345678901234',
                jobName: 'Job 3 with an even longer name',
                isActive: true,
              },
            ],
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
  });

  describe('REMOVE_ROW', () => {
    it('removes the timesheet row', () => {
      const state = {
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: true,
        timesheetRows: [],
      });
    });

    it('removes the correct timesheet row', () => {
      const state = {
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '10',
            jobId: '1',
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
            jobId: '1',
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
            jobId: '1',
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '10',
            jobId: '1',
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
            jobId: '1',
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
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '12',
            jobId: '1',
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
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '11',
            jobId: '1',
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

  describe('CLOSE_UNSAVED_CHANGES_MODAL', () => {
    it('clears the modal and modal action', () => {
      const state = {
        modal: ModalType.UNSAVED,
        modalAction: {
          action: 'FOO',
          other: 'bar',
        },
      };
      const action = {
        intent: CLOSE_UNSAVED_CHANGES_MODAL,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        modal: null,
        modalAction: null,
      });
    });
  });

  describe('SET_MODAL', () => {
    it('sets the modal type', () => {
      const state = {
        modal: null,
      };

      const action = {
        intent: SET_MODAL,
        modal: ModalType.UNSAVED,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        modal: ModalType.UNSAVED,
      });
    });

    it('stores the modal action for navigation', () => {
      const state = {
        modal: null,
        modalAction: null,
      };
      const modalAction = {
        action: UnsavedChangesModalActions.NAVIGATION,
        url: '#/some-url',
      };
      const action = {
        intent: SET_MODAL,
        modal: ModalType.UNSAVED,
        action: modalAction,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        modal: ModalType.UNSAVED,
        modalAction,
      });
    });

    it('stores the modal action for date change', () => {
      const state = {
        modal: null,
        modalAction: null,
      };
      const modalAction = {
        action: UnsavedChangesModalActions.DATE_CHANGE,
        newDate: '9999-99-99',
      };
      const action = {
        intent: SET_MODAL,
        modal: ModalType.UNSAVED,
        action: modalAction,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        modal: ModalType.UNSAVED,
        modalAction,
      });
    });

    it('stores the modal action for employee change', () => {
      const state = {
        modal: null,
        modalAction: null,
      };
      const modalAction = {
        action: UnsavedChangesModalActions.EMPLOYEE_CHANGE,
        employeeId: '123',
      };
      const action = {
        intent: SET_MODAL,
        modal: ModalType.UNSAVED,
        action: modalAction,
      };

      const result = timesheetReducer(state, action);

      expect(result).toEqual({
        modal: ModalType.UNSAVED,
        modalAction,
      });
    });
  });

  describe('LOAD_JOB_AFTER_CREATE', () => {
    it('adds new job to jobOptions in state', () => {
      const state = {
        timesheetIsDirty: false,
        timesheetRows: [
          {
            payItemId: '',
            jobId: '',
            jobOptions,
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
        jobOptions,
      };
      const newJob = {
        id: '4',
        jobNumber: 'homelander',
        jobName: 'Job 4 created from quick add modal',
        isActive: true,
      };
      const action = {
        intent: LOAD_JOB_AFTER_CREATE,
        ...newJob,
      };

      const result = timesheetReducer(state, action);

      expect(result.jobOptions).toEqual([newJob, ...jobOptions]);
      expect(result.timesheetRows[0].jobOptions).toEqual([
        newJob,
        ...jobOptions,
      ]);
      expect(result.timesheetIsDirty).toEqual(true);
    });

    it('adds new job to jobOptions in each timesheetRow', () => {
      const state = {
        timesheetIsDirty: true,
        timesheetRows: [
          {
            payItemId: '',
            jobId: '',
            jobOptions: [
              {
                id: '3',
                jobNumber: '12345678901234',
                jobName: 'Job 3 with an even longer name',
                isActive: true,
              },
            ],
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
        jobOptions,
      };
      const newJob = {
        id: '4',
        jobNumber: 'homelander',
        jobName: 'Job 4 created from quick add modal',
        isActive: true,
      };
      const action = {
        intent: LOAD_JOB_AFTER_CREATE,
        ...newJob,
      };

      const result = timesheetReducer(state, action);

      result.timesheetRows.forEach((row) => {
        expect(row.jobOptions).toEqual([
          newJob,
          {
            id: '3',
            jobNumber: '12345678901234',
            jobName: 'Job 3 with an even longer name',
            isActive: true,
          },
        ]);
      });
    });
  });
});
