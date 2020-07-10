import {
  getIsBeforeStartOfFinancialYear,
  getRefundForCreate,
} from '../receiveRefundSelectors';

describe('receiveRefundSelectors', () => {
  describe('getRefundForCreate', () => {
    [
      ['should return custom reference id', 'ABC001', 'ABC001'],
      [
        'should return undefined if reference id is the same as auto-generated value',
        'CR0001',
        undefined,
      ],
      ['should return empty string if reference id empty string', '', ''],
    ].forEach((args) => {
      const [scenario, referenceId, expectedReferenceId] = args;

      it(scenario, () => {
        const state = {
          refund: {
            referenceId,
          },
          originalReferenceId: 'CR0001',
        };

        const actual = getRefundForCreate(state);

        expect(actual.referenceId).toEqual(expectedReferenceId);
      });
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
      'when start of financial year date is %s and issue date is %s, should return %s',
      (startOfFinancialYearDate, date, expected) => {
        const state = {
          refund: { date },
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      }
    );
  });
});
