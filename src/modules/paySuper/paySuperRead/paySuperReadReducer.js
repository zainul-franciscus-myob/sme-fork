import {
  LOAD_PAY_SUPER_READ, SET_ALERT, SET_IS_LOADING, SET_MODAL_TYPE,
} from './paySuperReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

export const getDefaultState = () => ({
  businessEventId: null,
  batchPaymentId: '',
  businessId: null,
  status: '',
  displayId: '',
  account: '',
  description: '',
  date: '',
  superPayments: [],
  isLoading: true,
  modalType: null,
  alert: null,
});

export const resetState = () => getDefaultState();

export const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const loadPaySuperRead = (state, { response }) => ({
  ...state,
  batchPaymentId: response.batchPaymentId,
  status: response.status,
  referenceNumber: response.displayId,
  account: response.payFromAccount,
  description: response.description,
  date: response.date,
  superPayments: response.superPayments,
});

const setModalType = (state, { modalType }) => ({
  ...state,
  modalType,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_LOADING]: setIsLoading,
  [LOAD_PAY_SUPER_READ]: loadPaySuperRead,
  [SET_MODAL_TYPE]: setModalType,
  [SET_ALERT]: setAlert,
};

const paySuperReadReducer = createReducer(getDefaultState(), handlers);

export default paySuperReadReducer;
