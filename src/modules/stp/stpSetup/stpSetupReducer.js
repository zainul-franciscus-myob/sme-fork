import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_CURRENT_STEP_INDEX, SET_SELECTED_AGENT_ROLE_DETAILS } from './stpSetupIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  modal: null,
  currentStepIndex: 0,
  selectedAgentRole: null,
  agentAbn: null,
  agentNumber: null,
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

const setSelectedAgentRoleDetails = (state, { roleDetails }) => ({
  ...state,
  ...roleDetails,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_CURRENT_STEP_INDEX]: setCurrentStepIndex,
  [SET_SELECTED_AGENT_ROLE_DETAILS]: setSelectedAgentRoleDetails,
};

const stpSetupReducer = createReducer(getDefaultState(), handlers);

export default stpSetupReducer;
