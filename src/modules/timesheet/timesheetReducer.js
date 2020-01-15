import {
  LOAD_CONTEXT,
  LOAD_INITIAL_TIMESHEET,
  SET_SELECTED_EMPLOYEE,
} from './timesheetIntents';
import { RESET_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: null,
  region: null,
  isLoading: false,
  isTimesheetSetUp: false,
  weekStartDate: null,
  weekDayLabels: [],
  employeeList: [],
  payItems: [],
  lineItems: [],
  displayStartStopTimes: false,
  selectedEmployeeId: null,
});

const loadInitialTimesheet = (state, { response }) => ({
  ...state,
  ...response,
});

const loadContext = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setSelectedEmployeeId = (state, { selectedEmployeeId }) => ({
  ...state,
  selectedEmployeeId,
});

const timesheetReducer = createReducer(getDefaultState(), {
  [LOAD_INITIAL_TIMESHEET]: loadInitialTimesheet,
  [LOAD_CONTEXT]: loadContext,
  [RESET_STATE]: resetState,
  [SET_SELECTED_EMPLOYEE]: setSelectedEmployeeId,
});

export default timesheetReducer;
