import {
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
  SET_ALERT, SET_DELETE_MODAL_OPEN_STATE,
  SET_LOADING_STATE,
} from './ElectronicPaymentsReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  transactions: [],
  transactionDescription: '',
  referenceNumber: '',
  dateOfPayment: '',
  bankStatementDescription: '',
  account: '',
  balance: '',
  alert: '',
  isDeleteModalOpen: false,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setLoadingState = (store, { loadingState }) => ({
  ...store,
  loadingState,
});

const setAlertMessage = (store, { message }) => ({
  ...store,
  alert: message,
});

const setDeleteModalOpenState = (store, { isOpen }) => ({
  ...store,
  isDeleteModalOpen: isOpen,
});

const loadElectronicPaymentDetails = (state, { response }) => ({
  ...state,
  account: response.account,
  balance: response.balance,
  referenceNumber: response.referenceNumber,
  bankStatementDescription: response.bankStatementDescription,
  transactionDescription: response.transactionDescription,
  dateOfPayment: response.dateOfPayment,
  transactions: response.transactions,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlertMessage,
  [SET_DELETE_MODAL_OPEN_STATE]: setDeleteModalOpenState,
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]: loadElectronicPaymentDetails,
};

const electronicPaymentsReadReducer = createReducer(getDefaultState(), handlers);

export default electronicPaymentsReadReducer;
