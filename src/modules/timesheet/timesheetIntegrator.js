import {
  DELETE_TIMESHEET,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_JOB_AFTER_CREATE,
  LOAD_TIMESHEET,
  SAVE_TIMESHEET,
} from './timesheetIntents';
import {
  getBusinessId,
  getDeleteTimesheetContent,
  getLoadAddedJobUrlParams,
  getSaveTimesheetContent,
  getSelectedEmployeeId,
  getWeekStartDate,
} from './timesheetSelectors';

const createTimesheetIntegrator = (store, integration) => ({
  loadJobAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_JOB_AFTER_CREATE;
    const urlParams = getLoadAddedJobUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadInitialTimesheet: ({ onSuccess, onFailure }) => {
    const intent = LOAD_INITIAL_TIMESHEET;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };
    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadSelectedEmployeeTimesheet: ({ value, onSuccess, onFailure }) => {
    const intent = LOAD_EMPLOYEE_TIMESHEET;
    const params = {
      date: getWeekStartDate(store.getState()),
      employeeId: value,
    };

    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };
    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadTimesheet: ({ value, onSuccess, onFailure }) => {
    const intent = LOAD_TIMESHEET;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };
    const params = {
      weekStartDate: value,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  saveTimesheet: ({ onSuccessFunc, onFailureFunc }) => {
    const content = getSaveTimesheetContent(store.getState());
    const intent = SAVE_TIMESHEET;

    const urlParams = {
      businessId: getBusinessId(store.getState()),
      employeeId: getSelectedEmployeeId(store.getState()),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess: onSuccessFunc,
      onFailure: onFailureFunc,
    });
  },

  deleteTimesheet: ({ onSuccess, onFailure }) => {
    const intent = DELETE_TIMESHEET;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
      employeeId: getSelectedEmployeeId(store.getState()),
    };
    const content = getDeleteTimesheetContent(store.getState());

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createTimesheetIntegrator;
