import {
  getIsBeforeStartOfFinancialYear,
  getTaxCalculations,
  getUniqueSelectedJobIds,
} from '../receiveMoneyDetailSelectors';

describe('receiveMoneySelectors', () => {
  describe('getTaxCalculations', () => {
    it.each([
      ['Tax inclusive', true, '$2.00', '$0.18', '$2.00'],
      ['Tax exclusive', false, '$2.00', '$0.20', '$2.20'],
    ])(
      'should returns calculated lines and totals for %s',
      (scenario, isTaxInclusive, subTotal, totalTax, totalAmount) => {
        const lines = [
          {
            taxCodeId: '2',
            amount: '1',
            units: '1',
            lineTypeId: '6',
          },
          {
            taxCodeId: '2',
            amount: '1',
            units: '1',
            lineTypeId: '6',
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
      }
    );
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
      }
    );
  });

  describe('getUniqueSelectedJobIds', () => {
    it('returns a list of unique selected job ids excluding empty ids', () => {
      const state = {
        receiveMoney: {
          lines: [
            { jobId: '1' },
            { jobId: '2' },
            { jobId: '' },
            { jobId: '1' },
          ],
        },
      };

      const actual = getUniqueSelectedJobIds(state);

      expect(actual).toEqual(['1', '2']);
    });
  });
});
