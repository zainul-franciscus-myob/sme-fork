import {
  LOAD_PAY_RUN_DETAILS,
  SET_LOADING_STATE,
} from './payRunDetailNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  alert: null,
  totalTakeHomePay: '',
  paymentPeriodStart: '',
  paymentPeriodEnd: '',
  paymentDate: '',
  payRunId: null,
});

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setInitialState = (state, { context }) => ({
  ...state,
  businessId: context.businessId,
  payRunId: context.payRunId,
  region: context.region,
});

const loadPayRunDetails = (state, action) => ({
  ...state,
  totalTakeHomePay: action.response.totalTakeHomePay,
  paymentPeriodStart: action.response.paymentPeriodStart,
  paymentPeriodEnd: action.response.paymentPeriodEnd,
  paymentDate: action.response.paymentDate,
  employeeList: action.response.employeeList,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_PAY_RUN_DETAILS]: loadPayRunDetails,
};

const payRunDetailNzReducer = createReducer(getDefaultState(), handlers);

export default payRunDetailNzReducer;
