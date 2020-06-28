import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_LOADING_STATE,
} from './PayRunIntents';
import { START_PAY_RUN } from './payRunSteps';
import { getStartPayRunDefaultState, startPayRunHandlers } from './startPayRun/startPayRunReducer';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';
import wrapHandlers from '../../../../store/wrapHandlers';

const getDefaultState = () => ({
  payRunId: uuid(),
  loadingState: LoadingState.LOADING,
  step: START_PAY_RUN,
  [START_PAY_RUN.key]: getStartPayRunDefaultState(),
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

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  ...wrapHandlers(START_PAY_RUN.key, startPayRunHandlers),
};

const payRunReducer = createReducer(getDefaultState(), handlers);

export default payRunReducer;
