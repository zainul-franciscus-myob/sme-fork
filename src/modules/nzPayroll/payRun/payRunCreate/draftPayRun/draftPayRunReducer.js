import {
  FORMAT_EMPLOYEE_PAY_LINE,
  LOAD_DRAFT_PAY_RUN,
  SET_PAY_LINE_DIRTY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_LINE,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../PayRunIntents';
import clearNegatives from '../clearNegativesInPayLines';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';
import getEmployeePayLines from '../getEmployeePayLines';

export const getDraftPayRunDefaultState = () => ({
  payPeriodEmployeeLimit: {},
  isPayLineDirty: false,
  lines: [],
  selectedEmployeeId: undefined,
  selectedPayLine: undefined,
  baseHourlyWagePayItemId: null,
  baseSalaryWagePayItemId: null,
});

const loadDraftPayRun = (state, { createdDraftPayRun }) => ({
  ...state,
  baseHourlyWagePayItemId: createdDraftPayRun.baseHourlyWagePayItemId,
  baseSalaryWagePayItemId: createdDraftPayRun.baseSalaryWagePayItemId,
  lines: clearNegatives(
    getEmployeePayLines(createdDraftPayRun.employeePays, () => true),
    [
      createdDraftPayRun.baseSalaryWagePayItemId,
      createdDraftPayRun.baseHourlyWagePayItemId,
    ]
  ),
  originalLines: getEmployeePayLines(
    createdDraftPayRun.employeePays,
    () => true
  ),
});

const formatPayLineHours = (hours) =>
  formatNumberWithDecimalScaleRange(hours, 2, 3);
const formatPayLineAmount = (amount) =>
  formatNumberWithDecimalScaleRange(amount, 2, 2);
const getFormattedPayLines = (payLines, payItemId, key, value) =>
  payLines.map((payLine) =>
    payLine.payItemId === payItemId
      ? {
          ...payLine,
          [key]:
            key === 'hours'
              ? formatPayLineHours(value)
              : formatPayLineAmount(value),
          isSubmitting: true,
        }
      : {
          ...payLine,
          isSubmitting: true,
        }
  );

const formatEmployeePayLine = (
  state,
  { employeeId, payItemId, key, value }
) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          payLines: getFormattedPayLines(line.payLines, payItemId, key, value),
        }
      : line
  ),
});

const updateIsEmployeeSelected = (state, { id }) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === id ? { ...line, isSelected: !line.isSelected } : line
  ),
});

const updateAreAllEmployeesSelected = (state, { value }) => ({
  ...state,
  lines: state.lines.map((line) => ({
    ...line,
    isSelected: value,
  })),
});

const updateTheEditedEmployeePayLines = (
  state,
  employeeId,
  updatedEmployeePay
) =>
  state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          ...updatedEmployeePay,
          payLines: updatedEmployeePay.payLines.map((payLine) => ({
            ...payLine,
            isSubmitting: false,
          })),
        }
      : line
  );

const updateEmployeeLineAfterRecalculation = (
  state,
  { employeeId, updatedEmployeePay }
) => ({
  ...state,
  lines: clearNegatives(
    updateTheEditedEmployeePayLines(state, employeeId, updatedEmployeePay),
    [state.baseHourlyWagePayItemId, state.baseSalaryWagePayItemId]
  ),
});

const updateEmployeeDaysPaid = (state, { employeeId, daysPaid }) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId ? { ...line, daysPaid } : line
  ),
});

const setPayLineDirty = (state, action) => ({
  ...state,
  isPayLineDirty: action.isDirty,
});

const updatePayLine = (payLine, key, value) => ({
  ...payLine,
  [key]: formatNumberWithDecimalScaleRange(value, 2, 3),
});

const updateEmployeeLinePayLine = (employeeLine, payItemId, key, value) => ({
  ...employeeLine,
  payLines: employeeLine.payLines.map((payLine) =>
    payLine.payItemId === payItemId
      ? updatePayLine(payLine, key, value)
      : payLine
  ),
});

const updateEmployeePayLine = (
  state,
  { employeeId, payItemId, key, value }
) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId
      ? updateEmployeeLinePayLine(line, payItemId, key, value)
      : line
  ),
});

export const draftPayRunHandlers = {
  [LOAD_DRAFT_PAY_RUN]: loadDraftPayRun,
  [FORMAT_EMPLOYEE_PAY_LINE]: formatEmployeePayLine,
  [UPDATE_IS_EMPLOYEE_SELECTED]: updateIsEmployeeSelected,
  [UPDATE_EMPLOYEE_DAYS_PAID]: updateEmployeeDaysPaid,
  [UPDATE_ARE_ALL_EMPLOYEES_SELECTED]: updateAreAllEmployeesSelected,
  [UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION]: updateEmployeeLineAfterRecalculation,
  [SET_PAY_LINE_DIRTY]: setPayLineDirty,
  [UPDATE_EMPLOYEE_PAY_LINE]: updateEmployeePayLine,
};
