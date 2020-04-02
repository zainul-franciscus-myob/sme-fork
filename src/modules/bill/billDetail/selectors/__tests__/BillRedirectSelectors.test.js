import { getBillPaymentUrl } from '../BillRedirectSelectors';

describe('BillRedirectSelectors', () => {
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
