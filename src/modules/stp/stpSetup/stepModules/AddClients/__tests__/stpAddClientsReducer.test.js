import { SET_AGENT_ROLE } from '../StpAddClientsIntents';
import stpAddClientsReducer from '../stpAddClientsReducer';

describe('StpAddClientsReducer', () => {
  describe('SET_AGENT_ROLE', () => {
    it('sets the agent role', () => {
      const state = {
        agentRole: null,
      };
      const action = {
        intent: SET_AGENT_ROLE,
        agentRole: 'bas agent',
      };

      const resultingState = stpAddClientsReducer(state, action);

      expect(resultingState).toEqual({
        agentRole: 'bas agent',
      });
    });
  });
});
