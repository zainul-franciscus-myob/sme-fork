import { getAgentDetails, getRegistrationUrl, getUrlParams } from '../ReportingCentreSelectors';

describe('ReportingCentreSelectors', () => {
  describe('getURLParams', () => {
    it('should get the Url params', () => {
      const state = {
        tab: 'finalisation',
      };

      const result = getUrlParams(state);

      expect(result).toEqual({ tab: 'finalisation' });
    });
  });

  describe('getRegistrationUrl', () => {
    it('should get the registration Url', () => {
      const state = {
        region: 'au',
        businessId: 'test1234',
      };

      const result = getRegistrationUrl(state);

      expect(result).toEqual('/#/au/test1234/stp/getStarted');
    });
  });

  describe('getAgentDetails', () => {
    it('should return the details if AgentAbn and AgentNumber exists', () => {
      const state = {
        something: 'else',
        foo: 'bar',
        agentAbn: '123',
        agentNumber: '321',
      };

      const result = getAgentDetails(state);

      const expected = {
        agentDetails: {
          agentAbn: '123',
          agentNumber: '321',
        },
      };

      expect(result).toEqual(expected);
    });

    it('should return null if AgentAbn does not exist', () => {
      const state = {
        something: 'else',
        foo: 'bar',
        agentNumber: '321',
      };

      const result = getAgentDetails(state);

      expect(result).toEqual(null);
    });

    it('should return null if AgentNumber does not exist', () => {
      const state = {
        something: 'else',
        foo: 'bar',
        agentAbn: '123',
      };

      const result = getAgentDetails(state);

      expect(result).toEqual(null);
    });

    it('should return null if both AgentAbn and AgentNumber does not exist', () => {
      const state = {
        something: 'else',
        foo: 'bar',
      };

      const result = getAgentDetails(state);

      expect(result).toEqual(null);
    });
  });
});
