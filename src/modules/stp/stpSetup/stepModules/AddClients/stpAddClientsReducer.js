import { SET_AGENT_ROLE, SET_ERROR_MESSAGE } from './StpAddClientsIntents';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
  agentRole: null,
});

const setAgentRole = (state, { agentRole }) => ({
  ...state,
  agentRole,
});


const setErrorMessage = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
});

const handlers = {
  [SET_AGENT_ROLE]: setAgentRole,
  [SET_ERROR_MESSAGE]: setErrorMessage,
};

const stpAddClientsReducer = createReducer(getDefaultState(), handlers);

export default stpAddClientsReducer;
