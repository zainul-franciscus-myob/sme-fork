import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  SET_EMPLOYEES_SENT,
  SET_PDF_LOADING_STATE,
  SET_TAB,
} from './PreparePaySlipsIntents';

export const getPreparePaySlipsDefaultState = () => ({
  selectedTab: 'email-pay-slips',
  emailPaySlipEmployees: [],
  printPaySlipEmployees: [],
  emailSettings: undefined,
});

export const setTab = (state, { selectedTab }) => ({
  ...state,
  selectedTab,
});

export const emailTabSelectAll = (state, { isSelected }) => ({
  ...state,
  emailPaySlipEmployees: state.emailPaySlipEmployees.map((employee) => ({
    ...employee,
    isSelected,
  })),
});

export const emailTabSelectItem = (state, { isSelected, item }) => ({
  ...state,
  emailPaySlipEmployees: state.emailPaySlipEmployees.map((employee) =>
    employee === item ? { ...employee, isSelected } : employee
  ),
});

export const setEmployeesSent = (state, { employees }) => ({
  ...state,
  emailPaySlipEmployees: state.emailPaySlipEmployees.map((employee) =>
    employees.find((e) => e.id === employee.employeeId)
      ? { ...employee, hasPaySlipEmailSent: true }
      : employee
  ),
});

const setPdfIsLoading = (state, { transactionId, isLoading }) => ({
  ...state,
  emailPaySlipEmployees: state.emailPaySlipEmployees.map((e) =>
    e.transactionId === transactionId ? { ...e, isLoading } : e
  ),
  printPaySlipEmployees: state.printPaySlipEmployees.map((e) =>
    e.transactionId === transactionId ? { ...e, isLoading } : e
  ),
});

export const preparePaySlipsHandlers = {
  [SET_TAB]: setTab,
  [EMAIL_TAB_SELECT_ALL]: emailTabSelectAll,
  [EMAIL_TAB_SELECT_ITEM]: emailTabSelectItem,
  [SET_EMPLOYEES_SENT]: setEmployeesSent,
  [SET_PDF_LOADING_STATE]: setPdfIsLoading,
};
