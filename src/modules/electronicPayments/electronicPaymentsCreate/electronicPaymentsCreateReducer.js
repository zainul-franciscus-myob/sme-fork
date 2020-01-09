import { addDays, addMonths } from 'date-fns';

import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_TRANSACTIONS,
  OPEN_MODAL,
  SELECT_ALL_TRANSACTIONS,
  SELECT_ITEM_TRANSACTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTIONS,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_BANK_FILE_DETAILS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from './ElectronicPaymentsCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addDays(addMonths(new Date(), -1), 1);

const getDefaultState = () => ({
  isLoading: true,
  isTableLoading: true,
  transactions: [],
  selectedAccountId: '',
  orderBy: 'DateOccurred',
  transactionDescription: '',
  referenceNumber: '',
  dateOfPayment: '',
  bankStatementDescription: '',
  accounts: [],
  paymentTypes: [],
  filterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    paymentType: '',
  },
  appliedFilterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    paymentType: '',
  },
  sortOrder: 'desc',
  alert: undefined,
});

// const setInitialState = (state, { context }) => {
//   const { paymentType } = context;
//   return {
//     ...state,
//     ...context,
//     filterOptions: {
//       ...state.filterOptions,
//       paymentType,
//     },
//     appliedFilterOptions: {
//       ...state.appliedFilterOptions,
//       paymentType,
//     },
//   };
// };

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
  filterOptions: {
    ...state.filterOptions,
    paymentType: 'EmployeePay',
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    paymentType: 'EmployeePay',
  },
});

const loadAccountsAndTransactions = (state, { response }) => ({
  ...state,
  accounts: response.accounts,
  paymentTypes: response.paymentTypes,
  referenceNumber: response.referenceNumber,
  bankStatementDescription: response.bankStatementDescription,
  transactionDescription: response.transactionDescription,
  dateOfPayment: response.dateOfPayment,
  transactions: response.transactions.map(e => ({
    ...e,
    isSelected: false,
  })),
  selectedAccountId: response.accounts && response.accounts[0] && response.accounts[0].id,
});

const updateFilterOptions = (state, { key, value }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [key]: value,
  },
});

const updateAppliedFilterOptions = (state, action) => ({
  ...state,
  appliedFilterOptions: {
    ...action.filterOptions,
  },
});

const updateSelectedAccountId = (state, action) => ({
  ...state,
  selectedAccountId: action.value,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const sortAndFilterTransactions = (state, { response }) => ({
  ...state,
  transactions: response.transactions,
  appliedFilterOptions: response.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const selectAllTransactions = (state, action) => ({
  ...state,
  transactions: state.transactions.map(e => ({
    ...e,
    isSelected: action.isSelected,
  })),
});

const selectItem = (state, action) => ({
  ...state,
  transactions: state.transactions.map(e => (
    e.id === action.item.id ? { ...e, isSelected: action.isSelected } : e
  )),
});

const updateBankFileDetails = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const resetState = () => getDefaultState();

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ALERT]: setAlert,
  [LOAD_ACCOUNTS_AND_TRANSACTIONS]: loadAccountsAndTransactions,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_APPLIED_FILTER_OPTIONS]: updateAppliedFilterOptions,
  [UPDATE_SELECTED_ACCOUNT_ID]: updateSelectedAccountId,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_TRANSACTIONS]: sortAndFilterTransactions,
  [SELECT_ALL_TRANSACTIONS]: selectAllTransactions,
  [SELECT_ITEM_TRANSACTIONS]: selectItem,
  [UPDATE_BANK_FILE_DETAILS]: updateBankFileDetails,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const electronicPaymentsCreateReducer = createReducer(getDefaultState(), handlers);

export default electronicPaymentsCreateReducer;
