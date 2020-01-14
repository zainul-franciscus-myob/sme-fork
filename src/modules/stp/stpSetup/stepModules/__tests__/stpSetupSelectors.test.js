import { getSoftwareIdParams } from '../../stpSetupSelectors';
import Role from '../../Role';

describe('stpSetupSelectors', () => {
  describe('getSoftwareIdParams', () => {
    it('should return an object with the agentAbn if tax agent is selected', () => {
      const state = {
        selectedAgentRole: Role.TAX_AGENT,
        agentAbn: '123',
        payerAbn: '321',
      };

      const result = getSoftwareIdParams(state);

      const expected = {
        agentAbn: '123',
      };

      expect(result).toEqual(expected);
    });

    it('should return an object with the agentAbn if BAS agent is selected', () => {
      const state = {
        selectedAgentRole: Role.BAS_AGENT,
        agentAbn: '123',
        payerAbn: '321',
      };

      const result = getSoftwareIdParams(state);

      const expected = {
        agentAbn: '123',
      };

      expect(result).toEqual(expected);
    });

    it('should return an object with the payerAbn if someone from the business is selected', () => {
      const state = {
        selectedAgentRole: Role.SOMEONE_FROM_THE_BUSINESS,
        agentAbn: '123',
        payerAbn: '321',
      };

      const result = getSoftwareIdParams(state);

      const expected = {
        payerAbn: '321',
      };

      expect(result).toEqual(expected);
    });
  });
});
