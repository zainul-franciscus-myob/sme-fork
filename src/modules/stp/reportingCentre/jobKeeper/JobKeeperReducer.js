import { SET_JOB_KEEPER_INITIAL, SET_LOADING_STATE } from './JobKeeperIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  payrollYears: [],
  selectedPayrollYear: '',
  eventId: uuid(),
  employees: [],
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setJobKeeperInitial = (state, { response }) => ({
  ...state,
  ...response,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_JOB_KEEPER_INITIAL]: setJobKeeperInitial,
};

const jobKeeperReducer = createReducer(getDefaultState(), handlers);

export default jobKeeperReducer;
