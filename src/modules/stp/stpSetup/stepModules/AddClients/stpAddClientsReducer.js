import { SET_AGENT_ROLE } from './StpAddClientsIntents';
import createReducer from '../../../../../store/createReducer';

const getDefaultState = () => ({
  agentRole: null,
});

const setAgentRole = (state, { agentRole }) => ({
  ...state,
  agentRole,
});

const handlers = {
  [SET_AGENT_ROLE]: setAgentRole,
};

const stpAddClientsReducer = createReducer(getDefaultState(), handlers);

export default stpAddClientsReducer;
