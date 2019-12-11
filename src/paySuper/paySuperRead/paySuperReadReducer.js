import { LOAD_PAY_SUPER_READ, SET_IS_LOADING } from './paySuperReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

export const getDefaultState = () => ({
  businessEventId: null,
  batchPaymentId: '',
  businessId: null,
  status: '',
  displayId: '',
  account: '',
  description: '',
  date: '',
  superPaymentLines: [],
  isLoading: true,
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
  superPaymentLines: response.superPaymentLines,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_LOADING]: setIsLoading,
  [LOAD_PAY_SUPER_READ]: loadPaySuperRead,
};

const paySuperReadReducer = createReducer(getDefaultState(), handlers);

export default paySuperReadReducer;
