import { LOAD_PAY_SUPER_LIST, SET_IS_LOADING } from './paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

export const getDefaultState = () => ({
  businessId: null,
  isRegistered: null,
  superPayments: [],
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

const loadPaySuperList = (state, { response }) => ({
  ...state,
  isRegistered: response.isRegistered,
  superPayments: response.superPayments,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_LOADING]: setIsLoading,
  [LOAD_PAY_SUPER_LIST]: loadPaySuperList,
};

const paySuperListReducer = createReducer(getDefaultState(), handlers);

export default paySuperListReducer;
