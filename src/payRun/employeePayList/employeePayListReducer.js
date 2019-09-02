import { LOAD_EMPLOYEE_PAYS, UPDATE_ARE_ALL_EMPLOYEES_SELECTED, UPDATE_IS_EMPLOYEE_SELECTED } from '../PayRunIntents';

export const getEmployeePayListDefaultState = {
  lines: [
    {
      employeeId: '21',
      name: 'Mary Jones',
      gross: 1500,
      payg: 100,
      deduction: 300,
      netPay: 700,
      super: 150,
      isSelected: true,
    },
    {
      employeeId: '22',
      name: 'Mary Smith',
      gross: 1500,
      payg: 100,
      deduction: 300,
      netPay: 700,
      super: 150,
    },
  ],
};

const loadEmployeePays = (state, { employeePays }) => ({
  ...state,
  lines: employeePays.map(employeePay => ({ ...employeePay, isSelected: true })),
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

export const employeePayListHandlers = {
  [LOAD_EMPLOYEE_PAYS]: loadEmployeePays,
  [UPDATE_IS_EMPLOYEE_SELECTED]: updateIsEmployeeSelected,
  [UPDATE_ARE_ALL_EMPLOYEES_SELECTED]: updateAreAllEmployeesSelected,
};
