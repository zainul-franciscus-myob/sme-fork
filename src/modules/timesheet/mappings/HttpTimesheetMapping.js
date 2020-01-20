import { LOAD_EMPLOYEE_TIMESHEET, LOAD_INITIAL_TIMESHEET, LOAD_TIMESHEET } from '../timesheetIntents';

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
};

export default HttpTimesheetMapping;
