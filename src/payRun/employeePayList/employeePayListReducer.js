import {
  FORMAT_EMPLOYEE_PAY_ITEM,
  LOAD_EMPLOYEE_PAYS,
  UPDATE_ARE_ALL_EMPLOYEES_SELECTED,
  UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION,
  UPDATE_EMPLOYEE_PAY_ITEM,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../PayRunIntents';
import formatNumberWithDecimalScaleRange from '../../valueFormatters/formatNumberWithDecimalScaleRange';

export const getEmployeePayListDefaultState = {
  lines: [],
};

const loadEmployeePays = (state, { employeePays }) => ({
  ...state,
  lines: employeePays.map(employeePay => ({
    ...employeePay,
    isSelected: true,
    payItems: employeePay.payItems.map(
      payItem => ({
        ...payItem,
        isSubmitting: false,
      }),
    ),
  })),
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

export const employeePayListHandlers = {
  [LOAD_EMPLOYEE_PAYS]: loadEmployeePays,
  [UPDATE_IS_EMPLOYEE_SELECTED]: updateIsEmployeeSelected,
  [UPDATE_ARE_ALL_EMPLOYEES_SELECTED]: updateAreAllEmployeesSelected,
  [UPDATE_EMPLOYEE_PAY_ITEM]: updateEmployeePayItem,
  [FORMAT_EMPLOYEE_PAY_ITEM]: formatEmployeePayItem,
  [UPDATE_EMPLOYEE_LINE_AFTER_RECALCULATION]: updateEmployeeLineAfterRecalculation,
};
