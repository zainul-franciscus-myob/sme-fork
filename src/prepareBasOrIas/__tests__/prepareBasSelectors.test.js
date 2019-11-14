import { getLodgeStatementLink } from '../prepareBasSelectors';

describe('prepareBasSelectors', () => {
  describe('getLodgeStatementLink', () => {
    it('nz region', () => {
      const state = {
        businessId: '123',
        region: 'NZ',
      };

      const actual = getLodgeStatementLink(state);

      expect(actual).toEqual('https://lodge.myob.com/#/dashboard/arl/NZ/egst/123?client=sme-web');
    });

    it('au region', () => {
      const state = {
        businessId: '123',
        region: 'AU',
      };

      const actual = getLodgeStatementLink(state);

      expect(actual).toEqual('https://lodge.myob.com/#/dashboard/arl/AU/bas/123?client=sme-web');
    });
  });
});
