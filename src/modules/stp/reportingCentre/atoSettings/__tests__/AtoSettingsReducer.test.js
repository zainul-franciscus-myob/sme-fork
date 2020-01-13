import { SET_AGENT_DETAILS, SET_BUSINESS_DETAILS } from '../AtoSettingsIntents';
import AtoSettingsReducer from '../AtoSettingsReducer';

describe('AtoSetingsReducer', () => {
  describe('SET_AGENT_DETAILS', () => {
    it('should set agent details into the state', () => {
      const state = { agentDetails: null };

      const action = {
        intent: SET_AGENT_DETAILS,
        agentDetails: {
          agentDetails: {
            agentAbn: '123',
            agentNumber: '321',
          },
        },
      };

      const result = AtoSettingsReducer(state, action);

      expect(result.agentDetails).toEqual({
        agentAbn: '123',
        agentNumber: '321',
      });
    });

    it('should set agent details as null', () => {
      const state = { agentDetails: null };

      const action = {
        intent: SET_AGENT_DETAILS,
        agentDetails: null,
      };

      const result = AtoSettingsReducer(state, action);

      expect(result.agentDetails).toEqual(null);
    });
  });

  describe('SET_BUSINESS_DETAILS', () => {
    it('should set the postcode to 9999 if the state is OTH', () => {
      const state = {
        businessDetails: {
          state: 'VIC',
          postcode: '3000',
        },
      };

      const action = {
        intent: SET_BUSINESS_DETAILS,
        key: 'state',
        value: 'OTH',
      };

      const result = AtoSettingsReducer(state, action);

      expect(result.businessDetails).toEqual({
        state: 'OTH',
        postcode: '9999',
      });
    });
  });
});
