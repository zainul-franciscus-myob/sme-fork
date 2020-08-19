import {
  CHANGE_ETP_CODE,
  CHANGE_ETP_CODE_CATEGORY,
  CLOSE_ETP_MODAL,
  CLOSE_JOB_LIST_MODAL,
  EDIT_PAY_ITEM_JOBS,
  FORMAT_EMPLOYEE_PAY_ITEM,
  GET_DETAIL_JOB_LIST,
  HIDE_WARNING_TOOLTIP,
  OPEN_ETP_MODAL,
  OPEN_JOB_LIST_MODAL,
  SAVE_ETP,
  SAVE_PAY_ITEM_JOBS,
  SET_EMPLOYEE_PAY_LIST_UNSAVED_MODAL,
  SET_JOB_LIST_MODAL_LOADING_STATE,
  SET_PAY_ITEM_LINE_DIRTY,
  SET_TOTAL_NET_PAY,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_NOTE,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
  UPDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
  VALIDATE_ETP,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createEmployeePayListDispatcher = (store) => ({
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

  setTotalNetPay: (totalNetPay) => {
    const intent = SET_TOTAL_NET_PAY;
    store.dispatch({
      intent,
      totalNetPay,
    });
  },

  openJobListModal: ({ payItem, employeeId }) => {
    store.dispatch({
      intent: OPEN_JOB_LIST_MODAL,
      payItem,
      employeeId,
    });
  },

  closeJobListModal: () => {
    store.dispatch({
      intent: CLOSE_JOB_LIST_MODAL,
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

  editPayItemJobs: (payItem) => {
    store.dispatch({
      intent: EDIT_PAY_ITEM_JOBS,
      payItem,
    });
  },

  savePayItemJobs: (payItem, employeeId) => {
    store.dispatch({
      intent: SAVE_PAY_ITEM_JOBS,
      payItem,
      employeeId,
    });
  },

  updatePayPeriodEmployeeLimit: (payPeriodEmployeeLimit) =>
    store.dispatch({
      intent: UPDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
      payPeriodEmployeeLimit,
    }),

  setPayItemLineDirty: (isDirty) => {
    store.dispatch({
      intent: SET_PAY_ITEM_LINE_DIRTY,
      isDirty,
    });
  },

  setJobListModalLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_JOB_LIST_MODAL_LOADING_STATE,
      loadingState,
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

  showUpgradeModal: () => {
    store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: true,
    });
  },

  hideUpgradeModal: () => {
    store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: false,
    });
  },

  setEmployeePayListIsUnsavedModalOpen: ({ isOpen }) => {
    store.dispatch({
      intent: SET_EMPLOYEE_PAY_LIST_UNSAVED_MODAL,
      isOpen,
    });
  },

  loadDetailJobList: (payload) => {
    store.dispatch({ intent: GET_DETAIL_JOB_LIST, ...payload });
  },

  updateEmployeeNote: ({ employeeId, note }) => {
    store.dispatch({
      intent: UPDATE_EMPLOYEE_NOTE,
      employeeId,
      note,
    });
  },

  hideWarningTooltip: (status) => {
    store.dispatch({
      intent: HIDE_WARNING_TOOLTIP,
      status,
    });
  },
});

export default createEmployeePayListDispatcher;
