import {
  SET_INITIAL_STATE,
  SET_JOB_MAKER_INITIAL,
  SET_LOADING_STATE,
} from './JobMakerIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isDirty: false,
  employees: [],
  currentPayrollYearLabel: '',
  currentPeriodDetails: {
    period: '',
    periodStart: '',
    periodEnd: '',
    claimStart: '',
    claimBestBefore: '',
    claimEnd: '',
  },
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setJobMakerInitial = (state, { response }) => ({
  ...state,
  ...response,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_JOB_MAKER_INITIAL]: setJobMakerInitial,
};

const jobMakerReducer = createReducer(getDefaultState(), handlers);

export default jobMakerReducer;
