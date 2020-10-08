import { addDays, addMonths } from 'date-fns';

import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_TRANSACTIONS,
  OPEN_MODAL,
  RESET_FILTER_OPTIONS,
  SELECT_ALL_TRANSACTIONS,
  SELECT_ITEM_TRANSACTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTIONS,
  UPDATE_BANK_FILE_DETAILS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from './ElectronicPaymentsCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addDays(addMonths(new Date(), -1), 1);

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: true,
  transactions: [],
  selectedAccountId: '',
  orderBy: 'DateOccurred',
  transactionDescription: '',
  referenceNumber: '',
  dateOfPayment: formatIsoDate(new Date()),
  bankStatementDescription: '',
  accounts: [],
  paymentTypes: [],
  filterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    paymentType: '',
  },
  sortOrder: 'desc',
  alert: undefined,
  startOfFinancialYearDate: '',
});

const getEnabledValues = (featureTogglesConfig) => {
  let values = ['PayEmployees'];

  if (featureTogglesConfig.isSpendMoneyEnabled) {
    values = ['SpendMoney', ...values];
  }

  if (featureTogglesConfig.isElectronicPaymentEnabled) {
    values = ['All', 'PayBills', ...values];
  }

  return values;
};

const paymentTypeMappings = (featureTogglesConfig) => {
  const enabledValues = getEnabledValues(featureTogglesConfig);

  return [
    {
      name: 'All',
      value: 'All',
    },
    {
      name: 'Pay Bills',
      value: 'PayBills',
    },
    {
      name: 'Pay Employees',
      value: 'PayEmployees',
    },
    {
      name: 'Spend Money',
      value: 'SpendMoney',
    },
  ].filter(({ value }) => enabledValues.includes(value));
};

const setInitialState = (state, { context }) => {
  const {
    paymentType,
    isSpendMoneyEnabled,
    isElectronicPaymentEnabled,
  } = context;
  const paymentTypes = paymentTypeMappings({
    isSpendMoneyEnabled,
    isElectronicPaymentEnabled,
  });

  return {
    ...state,
    ...context,
    paymentTypes,
    filterOptions: {
      ...state.filterOptions,
      paymentType: paymentTypes.some((option) => option.value === paymentType)
        ? paymentType
        : paymentTypes[0].value,
    },
  };
};

const loadAccountsAndTransactions = (state, { response }) => ({
  ...state,
  accounts: response.accounts,
  referenceNumber: response.referenceNumber,
  bankStatementDescription: response.bankStatementDescription,
  transactionDescription: response.transactionDescription,
  transactions: response.transactions.map((e) => ({
    ...e,
    isSelected: false,
  })),
  selectedAccountId:
    response.accounts && response.accounts[0] && response.accounts[0].id,
  startOfFinancialYearDate: response.startOfFinancialYearDate,
});

const updateFilterOptions = (state, { key, value }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [key]: value,
  },
});

const resetFilterOptions = (state) => ({
  ...state,
  filterOptions: {
    ...getDefaultState().filterOptions,
    paymentType: state.paymentTypes[0].value,
  },
});

const updateSelectedAccountId = (state, action) => ({
  ...state,
  selectedAccountId: action.value,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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
});

const selectAllTransactions = (state, action) => ({
  ...state,
  transactions: state.transactions.map((e) => ({
    ...e,
    isSelected: action.isSelected,
  })),
});

const selectItem = (state, action) => ({
  ...state,
  transactions: state.transactions.map((e) =>
    e.id === action.item.id ? { ...e, isSelected: action.isSelected } : e
  ),
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

const closeModal = (state) => ({
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
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [UPDATE_SELECTED_ACCOUNT_ID]: updateSelectedAccountId,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_TRANSACTIONS]: sortAndFilterTransactions,
  [SELECT_ALL_TRANSACTIONS]: selectAllTransactions,
  [SELECT_ITEM_TRANSACTIONS]: selectItem,
  [UPDATE_BANK_FILE_DETAILS]: updateBankFileDetails,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const electronicPaymentsCreateReducer = createReducer(
  getDefaultState(),
  handlers
);

export default electronicPaymentsCreateReducer;
