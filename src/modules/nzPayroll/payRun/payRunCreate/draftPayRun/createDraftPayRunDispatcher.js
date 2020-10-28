import {
  FORMAT_EMPLOYEE_PAY_LINE,
  SET_PAY_LINE_DIRTY,
  SET_TOTAL_TAKE_HOME_PAY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_LINE,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createDraftPayRunDispatcher = (store) => ({
  ...createPayRunDispatchers(store),

  updateEmployeeDaysPaid: (employeeId, daysPaid) => {
    const intent = UPDATE_EMPLOYEE_DAYS_PAID;
    store.dispatch({ intent, employeeId, daysPaid });
  },

  updateIsEmployeeSelected: (id) => {
    store.dispatch({ intent: UPDATE_IS_EMPLOYEE_SELECTED, id });
  },

  updateAreAllEmployeesSelected: ({ value }) => {
    store.dispatch({ intent: UPDATE_ARE_ALL_EMPLOYEES_SELECTED, value });
  },

  setPayLineDirty: (isDirty) => {
    store.dispatch({
      intent: SET_PAY_LINE_DIRTY,
      isDirty,
    });
  },

  updateEmployeePayLine: ({ employeeId, payItemId, key, value }) => {
    store.dispatch({
      intent: UPDATE_EMPLOYEE_PAY_LINE,
      employeeId,
      payItemId,
      key,
      value,
    });
  },

  formatEmployeePayLine: ({ employeeId, payItemId, key, value }) => {
    store.dispatch({
      intent: FORMAT_EMPLOYEE_PAY_LINE,
      employeeId,
      payItemId,
      key,
      value,
    });
  },

  updateEmployeeLineAfterRecalculation: ({
    employeeId,
    updatedEmployeePay,
  }) => {
    store.dispatch({
      intent: UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
      employeeId,
      updatedEmployeePay,
    });
  },

  setTotalTakeHomePay: (totalTakeHomePay) => {
    const intent = SET_TOTAL_TAKE_HOME_PAY;
    store.dispatch({
      intent,
      totalTakeHomePay,
    });
  },
});

export default createDraftPayRunDispatcher;
