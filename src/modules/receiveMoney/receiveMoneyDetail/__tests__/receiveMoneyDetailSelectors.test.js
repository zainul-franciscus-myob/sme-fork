import {
  getReceiveMoneyForCreatePayload,
  getReceiveMoneyForUpdatePayload,
  getTaxCalculations,
  getUrlParams,
} from '../receiveMoneyDetailSelectors';

describe('receiveMoneySelectors', () => {
  const input = {
    receiveMoney: {
      referenceId: 'foo',
      selectedPayFromAccountId: 'bar',
      selectedPayToContactId: 'contactId',
      date: '12-1-2017',
      description: 'txt',
      isReportable: 'true',
      isTaxInclusive: 'false',
      originalReferenceId: '1234',
      lines: [{ a: 'foo' }],
    },
  };

  describe('getReceiveMoneyForUpdatePayload', () => {
    it('removes extraneous fields from the payload', () => {
      const actual = getReceiveMoneyForUpdatePayload(input);
      expect(actual.originalReferenceId).toBeUndefined();
    });
  });

  describe('getReceiveMoneyForCreatePayload', () => {
    it('removes extraneous fields from the payload', () => {
      const actual = getReceiveMoneyForCreatePayload(input);
      expect(actual.originalReferenceId).toBeUndefined();
    });
  });

  describe('getTaxCalculations', () => {
    it.each([
      ['Tax inclusive', true, '$2.00', '$0.18', '$2.00'],
      ['Tax exclusive', false, '$2.00', '$0.20', '$2.20'],
    ])('should returns calculated lines and totals for %s', (
      scenario, isTaxInclusive, subTotal, totalTax, totalAmount,
    ) => {
      const lines = [
        {
          taxCodeId: '2', amount: '1', units: '1', lineTypeId: '6',
        },
        {
          taxCodeId: '2', amount: '1', units: '1', lineTypeId: '6',
        },
      ];

      const state = {
        receiveMoney: { isTaxInclusive, lines },
        taxCodeOptions: [
          {
            id: '2',
            displayName: 'GST',
            description: 'Goods & Service Tax',
            displayRate: '10%',
            codeType: 'GST_VAT',
            rate: 10,
            threshold: 0,
            childrenCalculationCollection: [],
            calculationMethod: 2,
            roundingMethod: 2,
            collectedBehaviour: 1,
            payedBehaviour: 1,
            isWithholding: false,
            thresholdRate: 10,
            includeInGstReturn: false,
          },
        ],
      };

      const expected = {
        lines,
        totals: { subTotal, totalTax, totalAmount },
      };

      const actual = getTaxCalculations(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getUrlParams', () => {
    it('should add receiveMoneyId if updating receive money', () => {
      const state = {
        businessId: '123',
        receiveMoneyId: '1',
      };

      const urlParams = getUrlParams(state);

      expect(urlParams).toEqual({
        businessId: '123',
        receiveMoneyId: '1',
      });
    });

    it('should not add receiveMoneyId if creating receive money', () => {
      const state = {
        businessId: '123',
        receiveMoneyId: 'new',
      };

      const urlParams = getUrlParams(state);

      expect(urlParams).toEqual({
        businessId: '123',
      });
    });
  });
});
