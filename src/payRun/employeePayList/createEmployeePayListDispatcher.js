import {
  FORMAT_EMPLOYEE_PAY_ITEM,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createEmployeePayListDispatcher = store => ({
  ...createPayRunDispatchers(store),

  updateIsEmployeeSelected: (id) => {
    const intent = UPDATE_IS_EMPLOYEE_SELECTED;
    store.dispatch({ intent, id });
  },

  updateAreAllEmployeesSelected: ({ value }) => {
    const intent = UPDATE_ARE_ALL_EMPLOYEES_SELECTED;
    store.dispatch({ intent, value });
  },

  updateEmployeePayItem: ({
    employeeId, payItemId, key, value,
  }) => {
    const intent = UPDATE_EMPLOYEE_PAY_ITEM;
    store.dispatch({
      intent, employeeId, payItemId, key, value,
    });
  },

  formatEmployeePayItem: ({
    employeeId, payItemId, key, value,
  }) => {
    const intent = FORMAT_EMPLOYEE_PAY_ITEM;
    store.dispatch({
      intent, employeeId, payItemId, key, value,
    });
  },

  updateEmployeeLineAfterRecalculation: ({ employeeId, recalculatedEmployeePay }) => {
    const intent = UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION;
    store.dispatch({
      intent,
      employeeId,
      recalculatedEmployeePay,
    });
  },
});

export default createEmployeePayListDispatcher;
