import {
  LOAD_PAY_SUPER_READ,
  PREPARE_UI_FOR_REVERSE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_STATUS,
} from './paySuperReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
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
  loadingState: LoadingState.LOADING,
  modalType: null,
  alert: null,
});

export const resetState = () => getDefaultState();

export const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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

const prepareUiForReverse = (state) => ({
  ...state,
  superPayments: state.superPayments.map((s) => ({
    ...s,
    amount: -s.amount,
  })),
});

const setStatus = (state, { status }) => ({
  ...state,
  status,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_PAY_SUPER_READ]: loadPaySuperRead,
  [SET_MODAL_TYPE]: setModalType,
  [SET_ALERT]: setAlert,
  [PREPARE_UI_FOR_REVERSE]: prepareUiForReverse,
  [SET_STATUS]: setStatus,
};

const paySuperReadReducer = createReducer(getDefaultState(), handlers);

export default paySuperReadReducer;
