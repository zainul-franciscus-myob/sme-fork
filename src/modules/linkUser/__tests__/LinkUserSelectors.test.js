import { getRedirectURL } from '../LinkUserSelectors';

describe('LinkUserSelectors', () => {
  describe('getRedirectURL', () => {
    it('should return the redirectURL if it exists', () => {
      const state = {
        redirectURL: 'some-url',
      };

      const actual = getRedirectURL(state);

      expect(actual).toEqual('some-url');
    });
    it('should return the defaultURL if it exists', () => {
      const state = {
        redirectURL: undefined,
        region: 'au',
        businessId: 'some-id',
      };

      const actual = getRedirectURL(state);

      expect(actual).toEqual('#/au/some-id/transactionList');
    });
  });
});
