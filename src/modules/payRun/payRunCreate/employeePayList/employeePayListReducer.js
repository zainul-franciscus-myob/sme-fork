import {
  CHANGE_ETP_CODE,
  CHANGE_ETP_CODE_CATEGORY,
  CLEAR_MODIFYING_STATE,
  CLOSE_ETP_MODAL,
  CLOSE_JOB_LIST_MODAL,
  EDIT_PAY_ITEM_JOBS,
  FORMAT_EMPLOYEE_PAY_ITEM,
  GET_DETAIL_JOB_LIST,
  HIDE_WARNING_TOOLTIP,
  LOAD_EMPLOYEE_PAYS,
  OPEN_ETP_MODAL,
  OPEN_JOB_LIST_MODAL,
  SAVE_ETP,
  SAVE_PAY_ITEM_JOBS,
  SET_EMPLOYEE_PAY_LIST_UNSAVED_MODAL,
  SET_JOB_LIST_MODAL_LOADING_STATE,
  SET_MODIFYING_STATE,
  SET_PAY_ITEM_LINE_DIRTY,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_NOTE,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
  UPDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
  VALIDATE_ETP,
} from '../PayRunIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import clearNegatives from '../clearNegativesInPayItems';
import formatNumberWithDecimalScaleRange from '../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';
import getEmployeePayLines from '../getEmployeePayLines';

export const getEmployeePayListDefaultState = () => ({
  payPeriodEmployeeLimit: {},
  isUpgradeModalShowing: false,
  isPayItemLineDirty: false,
  isJobListModalOpen: false,
  jobListModalLoadingState: LoadingState.LOADING,
  jobs: [],
  lines: [],
  originalLines: [],
  invalidEtpNames: [],
  etp: {
    employeeId: '',
    category: undefined,
    code: undefined,
    isOpen: false,
  },
  modifyingEmployeeId: null,
  modifyingKey: null,
  modifyingPayItemId: null,
  selectedEmployeeId: undefined,
  selectedPayItem: undefined,
  baseHourlyWagePayItemId: null,
  baseSalaryWagePayItemId: null,
  isPageEdited: false,
  unsavedModalIsOpen: false,
});

const loadEmployeePays = (state, { employeePays, isAllowNegativesInPayRuns }) =>
  isAllowNegativesInPayRuns
    ? {
        ...state,
        baseHourlyWagePayItemId: employeePays.baseHourlyWagePayItemId,
        baseSalaryWagePayItemId: employeePays.baseSalaryWagePayItemId,
        lines: getEmployeePayLines(employeePays.employeePays, () => true),
      }
    : {
        ...state,
        baseHourlyWagePayItemId: employeePays.baseHourlyWagePayItemId,
        baseSalaryWagePayItemId: employeePays.baseSalaryWagePayItemId,
        lines: clearNegatives(
          getEmployeePayLines(employeePays.employeePays, () => true),
          [
            employeePays.baseSalaryWagePayItemId,
            employeePays.baseHourlyWagePayItemId,
          ]
        ),
        originalLines: getEmployeePayLines(
          employeePays.employeePays,
          () => true
        ),
      };

const updateIsEmployeeSelected = (state, { id }) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === id ? { ...line, isSelected: !line.isSelected } : line
  ),
  isPageEdited: true,
});

const updateAreAllEmployeesSelected = (state, { value }) => ({
  ...state,
  lines: state.lines.map((line) => ({
    ...line,
    isSelected: value,
  })),
  isPageEdited: true,
});

const changeEtpCodeCategory = (state, { etpCodeCategory }) => ({
  ...state,
  etp: {
    ...state.etp,
    category: etpCodeCategory,
  },
});

const changeEtpCode = (state, { etpCode }) => ({
  ...state,
  etp: {
    ...state.etp,
    code: etpCode,
  },
});

const openEtpModal = (state, { employeeId }) => ({
  ...state,
  etp: {
    ...getEmployeePayListDefaultState().etp,
    employeeId,
    isOpen: true,
  },
});

const openJobListModal = (state, { payItem, employeeId }) => ({
  ...state,
  isJobListModalOpen: true,
  selectedPayItem: payItem,
  selectedEmployeeId: employeeId,
});

const closeJobListModal = (state) => ({
  ...state,
  isJobListModalOpen: false,
  selectedPayItem: undefined,
  selectedEmployeeId: undefined,
});

const getJobList = (state, action) => ({
  ...state,
  jobs: action.entries,
});

const closeEtpModal = (state) => ({
  ...state,
  etp: {
    ...getEmployeePayListDefaultState().etp,
  },
});

const editPayItemJobs = (state, { payItem }) => ({
  ...state,
  selectedPayItem: {
    ...state.selectedPayItem,
    jobs: payItem.jobs,
  },
});

const savePayItemJobs = (state, { payItem, employeeId }) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          payItems: line.payItems.map((pi) =>
            pi.payItemId === payItem.payItemId ? payItem : pi
          ),
        }
      : line
  ),
  isPageEdited: true,
});

const saveEtp = (state) => ({
  ...state,
  lines: state.lines.map((line) => {
    if (line.employeeId === state.etp.employeeId) {
      return {
        ...line,
        etpCode: state.etp.code,
      };
    }
    return line;
  }),
  isPageEdited: true,
});

const validateEtp = (state, { invalidEtpNames }) => ({
  ...state,
  invalidEtpNames,
});

const updatePayPeriodEmployeeLimit = (state, { payPeriodEmployeeLimit }) => ({
  ...state,
  payPeriodEmployeeLimit,
  isPageEdited: true,
});

const setPayItemLineDirty = (state, action) => ({
  ...state,
  isPayItemLineDirty: action.isDirty,
});

const getUpdatedPayItems = (payItems, payItemId, key, value) =>
  payItems.map((payItem) =>
    payItem.payItemId === payItemId
      ? {
          ...payItem,
          [key]: value,
          ignoreUnderAllocationWarning: false,
        }
      : payItem
  );

const updateEmployeePayItem = (
  state,
  { employeeId, payItemId, key, value }
) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          payItems: getUpdatedPayItems(line.payItems, payItemId, key, value),
        }
      : line
  ),
  isPageEdited: true,
});

const formatPayItemHours = (hours) =>
  formatNumberWithDecimalScaleRange(hours, 2, 3);
const formatPayLineAmount = (amount) =>
  formatNumberWithDecimalScaleRange(amount, 2, 2);
const getFormattedPayItems = (payItems, payItemId, key, value) =>
  payItems.map((payItem) =>
    payItem.payItemId === payItemId
      ? {
          ...payItem,
          [key]:
            key === 'hours'
              ? formatPayItemHours(value)
              : formatPayLineAmount(value),
          isSubmitting: true,
        }
      : {
          ...payItem,
          isSubmitting: true,
        }
  );
const formatEmployeePayItem = (
  state,
  { employeeId, payItemId, key, value }
) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          payItems: getFormattedPayItems(line.payItems, payItemId, key, value),
        }
      : line
  ),
});

const setModifyingState = (state, { employeeId, payItemId, key }) => ({
  ...state,
  modifyingEmployeeId: employeeId,
  modifyingPayItemId: payItemId,
  modifyingKey: key,
});

const clearModifyingState = (state) => ({
  ...state,
  modifyingEmployeeId: null,
  modifyingPayItemId: null,
  modifyingKey: null,
});

const updateEmployeeNote = (state, { employeeId, note }) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          note,
        }
      : line
  ),
});

const findIgnoreWarningFromCurrentLine = (line, recalculatedPayItem) => {
  const correspondingItem = line.payItems.find(
    (item) => item.payItemId === recalculatedPayItem.payItemId
  );
  return correspondingItem
    ? correspondingItem.ignoreUnderAllocationWarning
    : false;
};

const updateTheEditedEmployeePayItems = (
  state,
  employeeId,
  recalculatedEmployeePay
) =>
  state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          ...recalculatedEmployeePay,
          payItems: recalculatedEmployeePay.payItems.map((payItem) => ({
            ...payItem,
            isSubmitting: false,
            ignoreUnderAllocationWarning: findIgnoreWarningFromCurrentLine(
              line,
              payItem
            ),
            jobs: line.payItems.find((q) => q.payItemId === payItem.payItemId)
              ?.jobs,
          })),
        }
      : line
  );

const updateEmployeeLineAfterRecalculation = (
  state,
  { employeeId, recalculatedEmployeePay, isAllowNegativesInPayRuns }
) =>
  isAllowNegativesInPayRuns
    ? {
        ...state,
        lines: updateTheEditedEmployeePayItems(
          state,
          employeeId,
          recalculatedEmployeePay
        ),
      }
    : {
        ...state,
        lines: clearNegatives(
          updateTheEditedEmployeePayItems(
            state,
            employeeId,
            recalculatedEmployeePay
          ),
          [state.baseHourlyWagePayItemId, state.baseSalaryWagePayItemId]
        ),
        originalLines: state.originalLines.map((originalLine) =>
          originalLine.employeeId === employeeId
            ? {
                ...originalLine,
                ...recalculatedEmployeePay,
              }
            : originalLine
        ),
      };

const setUpgradeModalShowing = (state, { isUpgradeModalShowing }) => ({
  ...state,
  isUpgradeModalShowing,
});

const setEmployeePayListUnsavedModal = (state, { isOpen }) => ({
  ...state,
  unsavedModalIsOpen: isOpen,
});

const setJobListModalLoadingState = (state, { loadingState }) => ({
  ...state,
  jobListModalLoadingState: loadingState,
});

const hideWarningTooltip = (state, { status }) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === state.selectedEmployeeId
      ? {
          ...line,
          payItems: line.payItems.map((pi) =>
            pi.payItemId === state.selectedPayItem.payItemId
              ? { ...pi, ignoreUnderAllocationWarning: status }
              : pi
          ),
        }
      : line
  ),
});

export const employeePayListHandlers = {
  [SET_JOB_LIST_MODAL_LOADING_STATE]: setJobListModalLoadingState,
  [OPEN_JOB_LIST_MODAL]: openJobListModal,
  [CLOSE_JOB_LIST_MODAL]: closeJobListModal,
  [LOAD_EMPLOYEE_PAYS]: loadEmployeePays,
  [UPDATE_IS_EMPLOYEE_SELECTED]: updateIsEmployeeSelected,
  [UPDATE_ARE_ALL_EMPLOYEES_SELECTED]: updateAreAllEmployeesSelected,
  [CHANGE_ETP_CODE_CATEGORY]: changeEtpCodeCategory,
  [CHANGE_ETP_CODE]: changeEtpCode,
  [OPEN_ETP_MODAL]: openEtpModal,
  [CLOSE_ETP_MODAL]: closeEtpModal,
  [SAVE_ETP]: saveEtp,
  [VALIDATE_ETP]: validateEtp,
  [UPDATE_PAY_PERIOD_EMPLOYEE_LIMIT]: updatePayPeriodEmployeeLimit,
  [SET_PAY_ITEM_LINE_DIRTY]: setPayItemLineDirty,
  [UPDATE_EMPLOYEE_PAY_ITEM]: updateEmployeePayItem,
  [FORMAT_EMPLOYEE_PAY_ITEM]: formatEmployeePayItem,
  [UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION]: updateEmployeeLineAfterRecalculation,
  [SET_UPGRADE_MODAL_SHOWING]: setUpgradeModalShowing,
  [SET_EMPLOYEE_PAY_LIST_UNSAVED_MODAL]: setEmployeePayListUnsavedModal,
  [GET_DETAIL_JOB_LIST]: getJobList,
  [EDIT_PAY_ITEM_JOBS]: editPayItemJobs,
  [SAVE_PAY_ITEM_JOBS]: savePayItemJobs,
  [UPDATE_EMPLOYEE_NOTE]: updateEmployeeNote,
  [HIDE_WARNING_TOOLTIP]: hideWarningTooltip,
  [SET_MODIFYING_STATE]: setModifyingState,
  [CLEAR_MODIFYING_STATE]: clearModifyingState,
};
