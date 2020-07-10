import {
  FORMAT_EMPLOYEE_PAY_ITEM,
  LOAD_EMPLOYEE_PAYS,
  SET_PAY_ITEM_LINE_DIRTY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../PayRunIntents';
import clearNegatives from '../clearNegativesInPayItems';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';
import getEmployeePayLines from '../getEmployeePayLines';

export const getEmployeePayListDefaultState = () => ({
  payPeriodEmployeeLimit: {},
  isPayItemLineDirty: false,
  lines: [],
  originalLines: [],
  selectedEmployeeId: undefined,
  selectedPayItem: undefined,
  baseHourlyWagePayItemId: null,
  baseSalaryWagePayItemId: null,
});

const loadEmployeePays = (state, { employeePays }) => ({
  ...state,
  baseHourlyWagePayItemId: employeePays.baseHourlyWagePayItemId,
  baseSalaryWagePayItemId: employeePays.baseSalaryWagePayItemId,
  lines: clearNegatives(
    getEmployeePayLines(employeePays.employeePays, () => (true)),
    [employeePays.baseSalaryWagePayItemId, employeePays.baseHourlyWagePayItemId],
  ),
  originalLines: getEmployeePayLines(employeePays.employeePays, () => (true)),
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

const updateTheEditedEmployeePayItems = (
  state, employeeId, recalculatedEmployeePay,
) => (state.lines.map(line => (
  line.employeeId === employeeId
    ? {
      ...line,
      ...recalculatedEmployeePay,
      payItems: recalculatedEmployeePay.payItems.map(
        payItem => ({
          ...payItem,
          isSubmitting: false,
        }),
      ),
    }
    : line
)));

const updateEmployeeLineAfterRecalculation = (state, { employeeId, recalculatedEmployeePay }) => ({
  ...state,
  lines: clearNegatives(
    updateTheEditedEmployeePayItems(state, employeeId, recalculatedEmployeePay),
    [state.baseHourlyWagePayItemId, state.baseSalaryWagePayItemId],
  ),
  originalLines: state.originalLines.map(originalLine => (
    originalLine.employeeId === employeeId ? {
      ...originalLine,
      ...recalculatedEmployeePay,
    }
      : originalLine
  )),
});

const updateEmployeeDaysPaid = (state, { employeeId, daysPaid }) => ({
  ...state,
  lines: state.lines.map(line => (
    line.employeeId === employeeId
      ? { ...line, daysPaid }
      : line
  )),
});

const setPayItemLineDirty = (state, action) => ({
  ...state,
  isPayItemLineDirty: action.isDirty,
});

export const employeePayListHandlers = {
  [LOAD_EMPLOYEE_PAYS]: loadEmployeePays,
  [FORMAT_EMPLOYEE_PAY_ITEM]: formatEmployeePayItem,
  [UPDATE_IS_EMPLOYEE_SELECTED]: updateIsEmployeeSelected,
  [UPDATE_EMPLOYEE_DAYS_PAID]: updateEmployeeDaysPaid,
  [UPDATE_ARE_ALL_EMPLOYEES_SELECTED]: updateAreAllEmployeesSelected,
  [UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION]: updateEmployeeLineAfterRecalculation,
  [SET_PAY_ITEM_LINE_DIRTY]: setPayItemLineDirty,
};
