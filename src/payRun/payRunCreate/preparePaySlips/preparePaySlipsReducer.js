import {
  EMAIL_TAB_SELECT_ALL, EMAIL_TAB_SELECT_ITEM, SET_TAB,
} from './PreparePaySlipsIntents';

export const getPreparePaySlipsDefaultState = () => ({
  selectedTab: 'email-pay-slips',
  emailTab: {
    employees: [],
  },
  printTab: {
    employees: [],
  },
});

export const setTab = (state, { selectedTab }) => ({
  ...state,
  selectedTab,
});

export const emailTabSelectAll = (state, { isSelected }) => ({
  ...state,
  recordedPayments: {
    ...state.recordedPayments,
    emailPaySlipEmployees: state.recordedPayments.emailPaySlipEmployees.map(employee => ({
      ...employee,
      isSelected,
    })),
  },
});

export const emailTabSelectItem = (state, { isSelected, item }) => ({
  ...state,
  recordedPayments: {
    ...state.recordedPayments,
    emailPaySlipEmployees: state.recordedPayments.emailPaySlipEmployees.map(employee => (
      employee === item ? { ...employee, isSelected } : employee
    )),
  },
});

export const preparePaySlipsHandlers = {
  [SET_TAB]: setTab,
  [EMAIL_TAB_SELECT_ALL]: emailTabSelectAll,
  [EMAIL_TAB_SELECT_ITEM]: emailTabSelectItem,
};
