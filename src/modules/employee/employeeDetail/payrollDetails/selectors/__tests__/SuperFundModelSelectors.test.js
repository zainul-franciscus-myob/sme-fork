import { getSaveSuperFundPayload } from '../SuperFundModalSelectors';
import savePayload from './fixtures/superFundSavePayload.json';
import state from './fixtures/superFundState.json';

describe('SuperFundModalSelectors', () => {
  describe('getSaveSuperFundPayload', () => {
    it('returns the payload to save super fund', () => {
      const expected = savePayload;
      const actual = getSaveSuperFundPayload(state);

      expect(actual).toEqual(expected);
    });
  });
});
