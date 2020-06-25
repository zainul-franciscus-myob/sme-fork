import { LOAD_DUPLICATE_RECEIVE_MONEY, LOAD_NEW_RECEIVE_MONEY, LOAD_RECEIVE_MONEY_DETAIL } from '../../../ReceiveMoneyIntents';
import {
  getIsBeforeStartOfFinancialYear,
  getTaxCalculations,
} from '../receiveMoneyDetailSelectors';
import {
  getLoadReceiveMoneyIntent,
  getReceiveMoneyForCreatePayload,
  getReceiveMoneyForUpdatePayload,
  getUrlParams,
} from '../integrationSelectors';

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

    it('should add duplicateId if duplicating receive money', () => {
      const state = {
        businessId: '123',
        receiveMoneyId: 'new',
        duplicateId: '1',
      };

      const urlParams = getUrlParams(state);

      expect(urlParams).toEqual({
        businessId: '123',
        duplicateId: '1',
      });
    });
  });

  describe('getLoadReceiveMoneyIntent', () => {
    it('should return LOAD_DUPLICATE_RECEIVE_MONEY', () => {
      const state = {
        receiveMoneyId: 'new',
        duplicateId: '1',
      };

      const intent = getLoadReceiveMoneyIntent(state);

      expect(intent).toEqual(LOAD_DUPLICATE_RECEIVE_MONEY);
    });

    it('should return LOAD_NEW_RECEIVE_MONEY', () => {
      const state = {
        receiveMoneyId: 'new',
      };

      const intent = getLoadReceiveMoneyIntent(state);

      expect(intent).toEqual(LOAD_NEW_RECEIVE_MONEY);
    });

    it('should return LOAD_RECEIVE_MONEY_DETAIL', () => {
      const state = {
        receiveMoneyId: '1',
      };

      const intent = getLoadReceiveMoneyIntent(state);

      expect(intent).toEqual(LOAD_RECEIVE_MONEY_DETAIL);
    });
  });

  describe('getIsBeforeStartOfFinancialYear', () => {
    it.each([
      ['2014-07-01', '2010-01-01', true],
      ['2014-07-01', '2014-06-30', true],
      ['2014-07-01', '2014-07-01', false],
      ['2014-07-01', '2014-07-02', false],
      ['2014-07-01', '2015-01-01', false],
    ])(
      'when start of financial year date is %s and date is %s, should return %s',
      (startOfFinancialYearDate, date, expected) => {
        const state = {
          receiveMoney: { date },
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      },
    );
  });
});
