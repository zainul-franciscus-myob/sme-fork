import { getRedirectURL } from '../LinkUserSelectors';

describe('LinkUserSelectors', () => {
  describe('getRedirectURL', () => {
    it('should return the redirectURL if it exists', () => {
      const state = {
        redirectURL: 'https://www.something.com/#/au/businessId/invoice',
      };

      const actual = getRedirectURL(state);

      expect(actual).toEqual(
        'https://www.something.com/#/au/businessId/invoice'
      );
    });

    it('should return the defaultURL if it exists', () => {
      const state = {
        redirectURL: undefined,
        region: 'au',
        businessId: 'some-id',
      };

      const actual = getRedirectURL(state);

      expect(actual).toEqual('#/au/some-id/dashboard');
    });

    it('should return the defaultURL if redirectURL is invalid url', () => {
      const state = {
        redirectURL: 'some-url',
        region: 'au',
        businessId: 'some-id',
      };

      const actual = getRedirectURL(state);

      expect(actual).toEqual('#/au/some-id/dashboard');
    });

    it('should return the defaultURL if redirectURL is an error page', () => {
      const state = {
        redirectURL: 'https://www.something.com/#/au/businessId/error',
        region: 'au',
        businessId: 'some-id',
      };

      const actual = getRedirectURL(state);

      expect(actual).toEqual('#/au/some-id/dashboard');
    });
  });
});
