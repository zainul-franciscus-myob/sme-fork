import {
  FORMAT_EMPLOYEE_PAY_ITEM,
  LOAD_DRAFT_PAY_RUN,
  SET_PAY_ITEM_LINE_DIRTY,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_DAYS_PAID,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../PayRunIntents';
import clearNegatives from '../clearNegativesInPayItems';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';
import getEmployeePayLines from '../getEmployeePayLines';

export const getDraftPayRunDefaultState = () => ({
  payPeriodEmployeeLimit: {},
  isPayItemLineDirty: false,
  lines: [],
  selectedEmployeeId: undefined,
  selectedPayItem: undefined,
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

const formatPayItemHours = (hours) =>
  formatNumberWithDecimalScaleRange(hours, 2, 3);
const formatPayItemAmount = (amount) =>
  formatNumberWithDecimalScaleRange(amount, 2, 2);
const getFormattedPayItems = (payItems, payItemId, key, value) =>
  payItems.map((payItem) =>
    payItem.payItemId === payItemId
      ? {
          ...payItem,
          [key]:
            key === 'hours'
              ? formatPayItemHours(value)
              : formatPayItemAmount(value),
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

const updateTheEditedEmployeePayItems = (
  state,
  employeeId,
  updatedEmployeePay
) =>
  state.lines.map((line) =>
    line.employeeId === employeeId
      ? {
          ...line,
          ...updatedEmployeePay,
          payItems: updatedEmployeePay.payItems.map((payItem) => ({
            ...payItem,
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
    updateTheEditedEmployeePayItems(state, employeeId, updatedEmployeePay),
    [state.baseHourlyWagePayItemId, state.baseSalaryWagePayItemId]
  ),
});

const updateEmployeeDaysPaid = (state, { employeeId, daysPaid }) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId ? { ...line, daysPaid } : line
  ),
});

const setPayItemLineDirty = (state, action) => ({
  ...state,
  isPayItemLineDirty: action.isDirty,
});

const updatePayItem = (payItem, key, value) => ({
  ...payItem,
  [key]: formatNumberWithDecimalScaleRange(value, 2, 3),
});

const updateEmployeeLinePayItem = (employeeLine, payItemId, key, value) => ({
  ...employeeLine,
  payItems: employeeLine.payItems.map((payItem) =>
    payItem.payrollCategoryId === payItemId
      ? updatePayItem(payItem, key, value)
      : payItem
  ),
});

const updateEmployeePayItem = (
  state,
  { employeeId, payItemId, key, value }
) => ({
  ...state,
  lines: state.lines.map((line) =>
    line.employeeId === employeeId
      ? updateEmployeeLinePayItem(line, payItemId, key, value)
      : line
  ),
});

export const draftPayRunHandlers = {
  [LOAD_DRAFT_PAY_RUN]: loadDraftPayRun,
  [FORMAT_EMPLOYEE_PAY_ITEM]: formatEmployeePayItem,
  [UPDATE_IS_EMPLOYEE_SELECTED]: updateIsEmployeeSelected,
  [UPDATE_EMPLOYEE_DAYS_PAID]: updateEmployeeDaysPaid,
  [UPDATE_ARE_ALL_EMPLOYEES_SELECTED]: updateAreAllEmployeesSelected,
  [UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION]: updateEmployeeLineAfterRecalculation,
  [SET_PAY_ITEM_LINE_DIRTY]: setPayItemLineDirty,
  [UPDATE_EMPLOYEE_PAY_ITEM]: updateEmployeePayItem,
};
