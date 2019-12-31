import { getRegistrationUrl, getUrlParams } from '../ReportingCentreSelectors';

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
});
