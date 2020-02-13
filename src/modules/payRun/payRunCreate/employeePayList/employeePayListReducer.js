import {
  CHANGE_ETP_CODE,
  CHANGE_ETP_CODE_CATEGORY,
  CLOSE_ETP_MODAL,
  FORMAT_EMPLOYEE_PAY_ITEM,
  LOAD_EMPLOYEE_PAYS,
  OPEN_ETP_MODAL,
  SAVE_ETP,
  SET_PAY_ITEM_LINE_DIRTY,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
  UPDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
  VALIDATE_ETP,
} from '../PayRunIntents';
import formatNumberWithDecimalScaleRange from '../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';
import getEmployeePayLines from '../getEmployeePayLines';

export const getEmployeePayListDefaultState = () => ({
  payPeriodEmployeeLimit: {},
  isUpgradeModalShowing: false,
  isPayItemLineDirty: false,
  lines: [],
  invalidEtpNames: [],
  etp: {
    employeeId: '',
    category: undefined,
    code: undefined,
    isOpen: false,
  },
  baseHourlyWagePayItemId: null,
  baseSalaryWagePayItemId: null,
});

const loadEmployeePays = (state, { employeePays }) => ({
  ...state,
  baseHourlyWagePayItemId: employeePays.baseHourlyWagePayItemId,
  baseSalaryWagePayItemId: employeePays.baseSalaryWagePayItemId,
  lines: getEmployeePayLines(employeePays.employeePays, () => (true)),
});

const updateIsEmployeeSelected = (state, { id }) => ({
  ...state,
  lines: state.lines.map(line => (
    line.employeeId === id
      ? { ...line, isSelected: !line.isSelected }
      : line
  )),
});

const updateAreAllEmployeesSelected = (state, { value }) => ({
  ...state,
  lines: state.lines.map(line => ({
    ...line,
    isSelected: value,
  })),
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

const closeEtpModal = state => ({
  ...state,
  etp: {
    ...getEmployeePayListDefaultState().etp,
  },
});

const saveEtp = state => ({
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
});

const validateEtp = (state, { invalidEtpNames }) => ({
  ...state,
  invalidEtpNames,
});

const updatePayPeriodEmployeeLimit = (state, { payPeriodEmployeeLimit }) => ({
  ...state,
  payPeriodEmployeeLimit,
});

const setPayItemLineDirty = (state, action) => ({
  ...state,
  isPayItemLineDirty: action.isDirty,
});

const getUpdatedPayItems = (payItems, payItemId, key, value) => payItems.map(payItem => (
  payItem.payItemId === payItemId
    ? {
      ...payItem,
      [key]: value,
    }
    : payItem
));

const updateEmployeePayItem = (state, {
  employeeId, payItemId, key, value,
}) => ({
  ...state,
  lines: state.lines.map(line => (
    line.employeeId === employeeId
      ? {
        ...line,
        payItems: getUpdatedPayItems(line.payItems, payItemId, key, value),
      }
      : line
  )),
});

const formatPayItemHours = hours => formatNumberWithDecimalScaleRange(hours, 2, 3);
const formatPayItemAmount = amount => formatNumberWithDecimalScaleRange(amount, 2, 2);
const getFormattedPayItems = (payItems, payItemId, key, value) => payItems.map(payItem => (
  payItem.payItemId === payItemId
    ? {
      ...payItem,
      [key]: key === 'hours' ? formatPayItemHours(value) : formatPayItemAmount(value),
      isSubmitting: true,
    }
    : {
      ...payItem,
      isSubmitting: true,
    }

));
const formatEmployeePayItem = (state, {
  employeeId, payItemId, key, value,
}) => ({
  ...state,
  lines: state.lines.map(line => (
    line.employeeId === employeeId
      ? {
        ...line,
        payItems: getFormattedPayItems(line.payItems, payItemId, key, value),
      }
      : line
  )),
});

const updateEmployeeLineAfterRecalculation = (state, { employeeId, recalculatedEmployeePay }) => ({
  ...state,
  lines: state.lines.map(line => (
    line.employeeId === employeeId
      ? {
        ...line,
        ...recalculatedEmployeePay,
        payItems: recalculatedEmployeePay.payItems.map(
          payItem => ({ ...payItem, isSubmitting: false }),
        ),
      }
      : line
  )),
});

const setUpgradeModalShowing = (state, { isUpgradeModalShowing }) => ({
  ...state,
  isUpgradeModalShowing,
});

export const employeePayListHandlers = {
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
};
