import { LOAD_ELECTRONIC_PAYMENT_DETAILS } from './ElectronicPaymentsReadIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
} from '../ElectronicPaymentsIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  isTableLoading: true,
  electronicPayments: [],
  orderBy: 'DateOccurred',
  transactionDescription: '',
  referenceNumber: '',
  dateOfPayment: '',
  bankStatementDescription: '',
  account: '',
  balance: '',
  sortOrder: 'desc',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
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

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const loadElectronicPaymentDetails = (state, action) => ({
  ...state,
  account: action.response.account || [],
  balance: action.response.balance || '',
  referenceNumber: action.response.referenceNumber || '',
  bankStatementDescription: action.response.bankStatementDescription || '',
  transactionDescription: action.response.transactionDescription || '',
  dateOfPayment: action.response.dateOfPayment || '',
  electronicPayments: action.response.electronicPayments || [],
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]: loadElectronicPaymentDetails,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_ELECTRONIC_PAYMENTS]: sortAndFilterElectronicPayments,
};

const electronicPaymentsReadReducer = createReducer(getDefaultState(), handlers);

export default electronicPaymentsReadReducer;
