import {
  getInvoiceItemCalculateAmountChangePayload,
  getInvoiceItemCalculateLineChangePayload,
  getInvoiceItemCalculateTaxCodeChangePayload,
  getInvoiceItemCalculateTaxInclusiveChangePayload,
} from '../itemLayoutSelectors';
import { getIsAnAmountInput } from '../../../../bill/billDetail/billItem/billItemSelectors';

describe('itemLayoutSelectors', () => {
  describe('getIsAnAmountLineInput', () => {
    it.each([
      ['id', false],
      ['units', true],
      ['itemId', false],
      ['description', false],
      ['unitPrice', true],
      ['discount', true],
      ['displayDiscount', false],
      ['taxCodeId', false],
      ['amount', true],
      ['displayAmount', false],
      ['accountId', false],
    ])('when key is %s, should return %s', (key, expected) => {
      const actual = getIsAnAmountInput(key);

      expect(actual).toEqual(expected);
    });
  });

  describe('calculation payload', () => {
    const lines = [
      {
        id: '1',
        units: '2',
        itemId: '3',
        description: 'Cooler Large',
        unitPrice: '520',
        discount: '10',
        displayDiscount: '10.00',
        taxCodeId: '2',
        amount: '850.9111',
        displayAmount: '850.91',
        accountId: '92',
      },
    ];
    const state = {
      invoice: {
        isTaxInclusive: true,
        amountPaid: '10.00',
        lines,
      },
    };

    describe('getInvoiceItemCalculateTaxInclusiveChangePayload', () => {
      it('should build payload for request', () => {
        const expected = {
          isTaxInclusive: true,
          isLineAmountsTaxInclusive: false,
          amountPaid: '10.00',
          lines,
        };

        const actual = getInvoiceItemCalculateTaxInclusiveChangePayload(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('getInvoiceItemCalculateLineChangePayload', () => {
      it('should build payload for request', () => {
        const index = 0;
        const itemId = '3';

        const expected = {
          index,
          itemId,
          isTaxInclusive: true,
          amountPaid: '10.00',
          lines,
        };

        const actual = getInvoiceItemCalculateLineChangePayload({ state, index, itemId });

        expect(actual).toEqual(expected);
      });
    });

    describe('getInvoiceItemCalculateAmountChangePayload', () => {
      it('should build payload for request', () => {
        const index = 0;
        const key = 'units';

        const expected = {
          index,
          key,
          isTaxInclusive: true,
          amountPaid: '10.00',
          lines,
        };

        const actual = getInvoiceItemCalculateAmountChangePayload(state, index, key);

        expect(actual).toEqual(expected);
      });
    });

    describe('getInvoiceItemCalculateTaxCodeChangePayload', () => {
      it('should build payload for request', () => {
        const expected = {
          isTaxInclusive: true,
          amountPaid: '10.00',
          lines,
        };

        const actual = getInvoiceItemCalculateTaxCodeChangePayload(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
