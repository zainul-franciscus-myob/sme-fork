import {
  getAUTitleAndStatement,
  getLodgeStatementLink,
} from '../onlineTaxSelectors';

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

  describe('getAUTitleAndStatement', () => {
    const IAS = {
      statement: 'Instalment Activity Statement (IAS)',
      title: 'Prepare IAS',
    };
    const BASAndIAS = {
      statement: 'activity statement (BAS or IAS)',
      title: 'Prepare BAS or IAS',
    };
    it('BASAndIAS when isCustomizedForNonGstEnabled toggle is off', () => {
      const state = {
        isRegisteredForGst: true,
        isCustomizedForNonGstEnabled: false,
      };
      const actual = getAUTitleAndStatement(state);
      expect(actual).toEqual(BASAndIAS);
    });

    it('BASAndIAS when isCustomizedForNonGstEnabled toggle is on and is gst user', () => {
      const state = {
        isRegisteredForGst: true,
        isCustomizedForNonGstEnabled: true,
      };
      const actual = getAUTitleAndStatement(state);
      expect(actual).toEqual(BASAndIAS);
    });

    it('IAS when isCustomizedForNonGstEnabled toggle is on and is non-gst user', () => {
      const state = {
        isRegisteredForGst: false,
        isCustomizedForNonGstEnabled: true,
      };
      const actual = getAUTitleAndStatement(state);
      expect(actual).toEqual(IAS);
    });
  });
});
