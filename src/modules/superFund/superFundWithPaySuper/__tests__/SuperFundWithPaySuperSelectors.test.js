import { getSaveSuperFundPayload } from '../SuperFundWithPaySuperSelectors';
import savePayload from './fixtures/savePayload.json';
import state from './fixtures/state.json';

describe('SuperFundWithPaySuperSelectors', () => {
  describe('getSaveSuperFundPayload', () => {
    it('returns the payload to save super fund', () => {
      const expected = savePayload;
      const actual = getSaveSuperFundPayload(state);

      expect(actual).toEqual(expected);
    });
  });
});
