import { getFinalRedirectUrl } from '../BillRedirectSelectors';

describe('BillRedirectSelectors', () => {
  describe('getFinalRedirectUrl', () => {
    it('returns intray url when is creating from intray', () => {
      const state = {
        billId: 'new',
        inTrayDocumentId: 'b',
        businessId: 'a',
        region: 'au',
      };

      const actual = getFinalRedirectUrl(state);

      expect(actual).toEqual('/#/au/a/inTray');
    });

    it('returns bill list url when is not creating from intray', () => {
      const state = {
        billId: 'new',
        businessId: 'a',
        region: 'au',
      };

      const actual = getFinalRedirectUrl(state);

      expect(actual).toEqual('/#/au/a/bill');
    });
  });
});
