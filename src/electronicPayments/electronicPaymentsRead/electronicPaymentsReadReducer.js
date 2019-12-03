import { LOAD_ELECTRONIC_PAYMENT_DETAILS } from './ElectronicPaymentsReadIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_TABLE_LOADING_STATE,
} from '../ElectronicPaymentsIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  isTableLoading: true,
  electronicPayments: [],
  transactionDescription: '',
  referenceNumber: '',
  dateOfPayment: '',
  bankStatementDescription: '',
  account: '',
  balance: '',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
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
};

const electronicPaymentsReadReducer = createReducer(getDefaultState(), handlers);

export default electronicPaymentsReadReducer;
