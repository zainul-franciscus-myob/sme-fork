import {
  LOAD_PAY_SUPER_LIST,
  LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
  SET_ACCESS_TOKEN,
  SET_ALERT,
  SET_IS_TABLE_LOADING,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
} from './paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

export const getDefaultState = () => ({
  businessId: null,
  isRegistered: null,
  superPayments: [],
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  sortDescending: true,
  orderBy: 'date',
  alert: null,
  accessToken: '',
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

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const loadPaySuperList = (state, { response }) => ({
  ...state,
  isRegistered: response.isRegistered,
  superPayments: response.superPayments,
  paySuperUrl: response.paySuperUrl,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const sortColumnUnchanged = (clickedColumn, currentColumn) =>
  clickedColumn === currentColumn;
const DESCENDING = true;

const setSortOrder = (state, { orderBy }) => {
  const sortDescending = sortColumnUnchanged(orderBy, state.orderBy)
    ? !state.sortDescending
    : DESCENDING;

  return {
    ...state,
    orderBy,
    sortDescending,
  };
};

const updateSuperPaymentStatus = (state, { response }) => ({
  ...state,
  superPayments: state.superPayments.map((p) => {
    const updatedPayment = response.find(
      (r) => r.batchPaymentId === p.batchPaymentId
    );
    return {
      ...p,
      status: updatedPayment ? updatedPayment.status : p.status,
    };
  }),
});

const setAccessToken = (state, { accessToken }) => ({
  ...state,
  accessToken,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_IS_TABLE_LOADING]: setIsTableLoading,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_ALERT]: setAlert,
  [SET_ACCESS_TOKEN]: setAccessToken,
  [LOAD_PAY_SUPER_LIST]: loadPaySuperList,
  [LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST]: updateSuperPaymentStatus,
};

const paySuperListReducer = createReducer(getDefaultState(), handlers);

export default paySuperListReducer;
