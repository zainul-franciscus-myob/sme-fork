import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_AGENT_ROLE_SELECTED, SET_CURRENT_STEP_INDEX } from './stpSetupIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  modal: null,
  currentStepIndex: 0,
  agentRoleSelected: null,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setCurrentStepIndex = (state, { currentStepIndex }) => ({
  ...state,
  currentStepIndex,
});

const setAgentRoleSelected = (state, { agentRoleSelected }) => ({
  ...state,
  agentRoleSelected,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_CURRENT_STEP_INDEX]: setCurrentStepIndex,
  [SET_AGENT_ROLE_SELECTED]: setAgentRoleSelected,
};

const stpSetupReducer = createReducer(getDefaultState(), handlers);

export default stpSetupReducer;
