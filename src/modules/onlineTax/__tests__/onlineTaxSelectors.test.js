import { getLodgeStatementLink } from '../onlineTaxSelectors';

describe('onlineTaxSelectors', () => {
  describe('getLodgeStatementLink', () => {
    it('nz region', () => {
      const state = {
        businessId: '123',
        region: 'NZ',
      };

      const actual = getLodgeStatementLink(state);

      expect(actual).toMatch('/#/dashboard/arl/NZ/egst/123');
    });

    it('au region', () => {
      const state = {
        businessId: '123',
        region: 'AU',
      };

      const actual = getLodgeStatementLink(state);

      expect(actual).toMatch('/#/dashboard/arl/AU/bas/123');
    });
  });
});
