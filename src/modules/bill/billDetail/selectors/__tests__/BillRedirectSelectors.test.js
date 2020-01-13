import { getBillPaymentUrl, getFinalRedirectUrl } from '../BillRedirectSelectors';

describe('BillRedirectSelectors', () => {
  describe('getFinalRedirectUrl', () => {
    it('returns intray url when is creating from intray', () => {
      const state = {
        billId: 'new',
        source: 'inTray',
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

  describe('getBillPaymentUrl', () => {
    [
      {
        name: 'empty',
        value: '',
        expected: '',
      },
      {
        name: '',
        value: '$2.00',
        expected: '2.00',
      },
      {
        name: '',
        value: '-$2.00',
        expected: '2.00',
      },
      {
        name: '',
        value: '2.00',
        expected: '2.00',
      },
    ].forEach((test) => {
      it(`should do things for ${test.name}`, () => {
        const state = {
          region: 'au',
          businessId: 'some-business',
          billId: '1',
          bill: {
            supplierId: '1',
          },
          totals: {
            amountDue: test.value,
          },
        };

        const expected = `/#/au/some-business/billPayment/new?supplierId=1&paymentAmount=${test.expected}&applyPaymentToBillId=1`;

        const actual = getBillPaymentUrl(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
