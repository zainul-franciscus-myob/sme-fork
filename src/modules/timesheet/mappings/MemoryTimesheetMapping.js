import { LOAD_INITIAL_TIMESHEET } from '../timesheetIntents';
import loadTimesheetInitial from './data/loadTimesheetInitial';

const MemoryTimesheetMapping = {
  [LOAD_INITIAL_TIMESHEET]: ({ onSuccess }) => onSuccess(loadTimesheetInitial),
};

export default MemoryTimesheetMapping;
