import {
  CHANGE_ETP_CODE,
  CHANGE_ETP_CODE_CATEGORY,
  CLOSE_ETP_MODAL,
  FORMAT_EMPLOYEE_PAY_ITEM,
  OPEN_ETP_MODAL,
  SAVE_ETP,
  SET_PAY_ITEM_LINE_DIRTY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
  VALIDATE_ETP,
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

  changeEtpCodeCategory: ({ etpCodeCategory }) => {
    store.dispatch({
      intent: CHANGE_ETP_CODE_CATEGORY,
      etpCodeCategory,
    });
  },

  changeEtpCode: ({ etpCode }) => {
    store.dispatch({
      intent: CHANGE_ETP_CODE,
      etpCode,
    });
  },

  openEtpModal: ({ employeeId }) => {
    store.dispatch({
      intent: OPEN_ETP_MODAL,
      employeeId,
    });
  },

  closeEtpModal: () => {
    store.dispatch({
      intent: CLOSE_ETP_MODAL,
    });
  },

  saveEtp: () => {
    store.dispatch({
      intent: SAVE_ETP,
    });
  },

  validateEtp: ({ invalidEtpNames }) => {
    store.dispatch({
      intent: VALIDATE_ETP,
      invalidEtpNames,
    });
  },

  setPayItemLineDirty: (isDirty) => {
    store.dispatch({
      intent: SET_PAY_ITEM_LINE_DIRTY,
      isDirty,
    });
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
