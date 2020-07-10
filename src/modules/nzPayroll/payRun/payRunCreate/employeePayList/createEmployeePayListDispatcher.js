import {
  FORMAT_EMPLOYEE_PAY_ITEM,
  SET_PAY_ITEM_LINE_DIRTY,
  SET_TOTAL_TAKE_HOME_PAY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createEmployeePayListDispatcher = (store) => ({
  ...createPayRunDispatchers(store),

  updateEmployeeDaysPaid: (employeeId, daysPaid) => {
    const intent = UPDATE_EMPLOYEE_DAYS_PAID;
    store.dispatch({ intent, employeeId, daysPaid });
  },

  updateIsEmployeeSelected: (id) => {
    const intent = UPDATE_IS_EMPLOYEE_SELECTED;
    store.dispatch({ intent, id });
  },

  updateAreAllEmployeesSelected: ({ value }) => {
    const intent = UPDATE_ARE_ALL_EMPLOYEES_SELECTED;
    store.dispatch({ intent, value });
  },

  setPayItemLineDirty: (isDirty) => {
    store.dispatch({
      intent: SET_PAY_ITEM_LINE_DIRTY,
      isDirty,
    });
  },

  updateEmployeePayItem: ({ employeeId, payItemId, key, value }) => {
    const intent = UPDATE_EMPLOYEE_PAY_ITEM;
    store.dispatch({
      intent,
      employeeId,
      payItemId,
      key,
      value,
    });
  },

  formatEmployeePayItem: ({ employeeId, payItemId, key, value }) => {
    const intent = FORMAT_EMPLOYEE_PAY_ITEM;
    store.dispatch({
      intent,
      employeeId,
      payItemId,
      key,
      value,
    });
  },

  updateEmployeeLineAfterRecalculation: ({
    employeeId,
    recalculatedEmployeePay,
  }) => {
    const intent = UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION;
    store.dispatch({
      intent,
      employeeId,
      recalculatedEmployeePay,
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

export default createEmployeePayListDispatcher;
