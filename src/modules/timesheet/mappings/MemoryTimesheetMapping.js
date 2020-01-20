import { LOAD_EMPLOYEE_TIMESHEET, LOAD_INITIAL_TIMESHEET, LOAD_TIMESHEET } from '../timesheetIntents';
import loadEmployeeTimesheet from './data/loadEmployeeTimesheet';
import loadTimesheet from './data/loadTimesheet';
import loadTimesheetInitial from './data/loadTimesheetInitial';

const MemoryTimesheetMapping = {
  [LOAD_INITIAL_TIMESHEET]: ({ onSuccess }) => onSuccess(loadTimesheetInitial),
  [LOAD_TIMESHEET]: ({ onSuccess }) => onSuccess(loadTimesheet),
  [LOAD_EMPLOYEE_TIMESHEET]: ({ onSuccess }) => onSuccess(loadEmployeeTimesheet),
};

export default MemoryTimesheetMapping;
