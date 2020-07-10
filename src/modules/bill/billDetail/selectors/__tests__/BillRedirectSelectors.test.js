import { getBillPaymentUrl } from '../BillRedirectSelectors';
import BillLineType from '../../types/BillLineType';

describe('BillRedirectSelectors', () => {
  describe('getBillPaymentUrl', () => {
    [
      {
        name: '',
        value: '2',
        expected: '2',
      },
      {
        name: '',
        value: '-2',
        expected: '2',
      },
    ].forEach((test) => {
      it(`should do things for ${test.name}`, () => {
        const state = {
          region: 'au',
          businessId: 'some-business',
          billId: '1',
          bill: {
            isTaxInclusive: true,
            lines: [
              {
                type: BillLineType.SERVICE,
                taxExclusiveAmount: test.value,
                taxAmount: '0',
              },
            ],
            taxExclusiveFreightAmount: '0',
            freightTaxAmount: '0',
            supplierId: '1',
          },
        };

        const expected = `/#/au/some-business/billPayment/new?supplierId=1&paymentAmount=${test.expected}&applyPaymentToBillId=1`;

        const actual = getBillPaymentUrl(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
