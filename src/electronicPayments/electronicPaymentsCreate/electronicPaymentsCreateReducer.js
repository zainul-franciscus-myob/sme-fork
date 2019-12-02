import { addDays, addMonths } from 'date-fns';

import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
  OPEN_MODAL,
  SELECT_ALL_ELECTRONIC_PAYMENTS,
  SELECT_ITEM_ELECTRONIC_PAYMENT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_BANK_FILE_DETAILS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from '../ElectronicPaymentsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addDays(addMonths(new Date(), -1), 1);

const getDefaultState = () => ({
  isLoading: true,
  isTableLoading: true,
  electronicPayments: [],
  selectedAccountId: '',
  orderBy: 'DateOccurred',
  transactionDescription: '',
  referenceNumber: '',
  dateOfPayment: '',
  bankStatementDescription: '',
  accounts: [],
  filterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
  },
  appliedFilterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
  },
  sortOrder: 'desc',
  alert: undefined,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadAccountsAndElectronicPayments = (state, action) => ({
  ...state,
  accounts: action.response.accounts || [],
  referenceNumber: action.response.referenceNumber || '',
  bankStatementDescription: action.response.bankStatementDescription || '',
  transactionDescription: action.response.transactionDescription || '',
  dateOfPayment: action.response.dateOfPayment || '',
  electronicPayments: action.response.electronicPayments
    ? action.response.electronicPayments.map(e => ({
      ...e,
      isSelected: false,
    })) : [],
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
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

const sortAndFilterElectronicPayments = (state, action) => ({
  ...state,
  electronicPayments: action.entries,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const selectAllElectronicPayments = (state, action) => ({
  ...state,
  electronicPayments: state.electronicPayments.map(e => ({
    ...e,
    isSelected: action.isSelected,
  })),
});

const selectElectronicPaymentItem = (state, action) => ({
  ...state,
  electronicPayments: state.electronicPayments.map(e => (
    e === action.item ? { ...action.item, isSelected: action.isSelected } : e
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

const resetState = () => (getDefaultState());

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
  [LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS]: loadAccountsAndElectronicPayments,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_APPLIED_FILTER_OPTIONS]: updateAppliedFilterOptions,
  [UPDATE_SELECTED_ACCOUNT_ID]: updateSelectedAccountId,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_ELECTRONIC_PAYMENTS]: sortAndFilterElectronicPayments,
  [SELECT_ALL_ELECTRONIC_PAYMENTS]: selectAllElectronicPayments,
  [SELECT_ITEM_ELECTRONIC_PAYMENT]: selectElectronicPaymentItem,
  [UPDATE_BANK_FILE_DETAILS]: updateBankFileDetails,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const electronicPaymentsCreateReducer = createReducer(getDefaultState(), handlers);

export default electronicPaymentsCreateReducer;
