import {
  DELETE_TIMESHEET,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_TIMESHEET,
  SAVE_TIMESHEET,
} from '../timesheetIntents';

const HttpTimesheetMapping = {
  [LOAD_INITIAL_TIMESHEET]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/timesheet/load_initial_timesheet`,
  },
  [LOAD_TIMESHEET]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/timesheet/load_timesheet`,
  },
  [LOAD_EMPLOYEE_TIMESHEET]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/timesheet/load_employee_timesheet`,
  },
  [SAVE_TIMESHEET]: {
    method: 'POST',
    getPath: ({ businessId, employeeId }) => `/${businessId}/timesheet/save_timesheet_old/${employeeId}`,
  },
  [DELETE_TIMESHEET]: {
    method: 'DELETE',
    getPath: ({ businessId, employeeId }) => `/${businessId}/timesheet/delete_timesheet/${employeeId}`,
  },
};

export default HttpTimesheetMapping;
