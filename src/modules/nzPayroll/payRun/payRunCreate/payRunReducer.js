import { DRAFT_PAY_RUN, START_PAY_RUN } from './payRunSteps';
import {
  NEXT_STEP,
  SET_ALERT,
  SET_DRAFT_PAY_RUN_ID,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_TAKE_HOME_PAY,
} from './PayRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  draftPayRunHandlers,
  getDraftPayRunDefaultState,
} from './draftPayRun/draftPayRunReducer';
import {
  getStartPayRunDefaultState,
  startPayRunHandlers,
} from './startPayRun/startPayRunReducer';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import wrapHandlers from '../../../../store/wrapHandlers';

const getDefaultState = () => ({
  draftPayRunId: -1,
  loadingState: LoadingState.LOADING,
  step: START_PAY_RUN,
  isSubmitting: false,
  [START_PAY_RUN.key]: getStartPayRunDefaultState(),
  [DRAFT_PAY_RUN.key]: getDraftPayRunDefaultState(),
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const nextStep = (state) => ({
  ...state,
  step: state.step.nextStep,
});

const setTotalTakeHomePay = (state, { totalTakeHomePay }) => ({
  ...state,
  totalTakeHomePay,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setDraftPayRunId = (state, { createdDraftPayRun }) => ({
  ...state,
  draftPayRunId: createdDraftPayRun.draftPayRunId,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TOTAL_TAKE_HOME_PAY]: setTotalTakeHomePay,
  [NEXT_STEP]: nextStep,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [SET_DRAFT_PAY_RUN_ID]: setDraftPayRunId,
  ...wrapHandlers(START_PAY_RUN.key, startPayRunHandlers),
  ...wrapHandlers(DRAFT_PAY_RUN.key, draftPayRunHandlers),
};

const payRunReducer = createReducer(getDefaultState(), handlers);

export default payRunReducer;
