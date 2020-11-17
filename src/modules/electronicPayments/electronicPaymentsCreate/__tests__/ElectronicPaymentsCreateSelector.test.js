import {
  getIsBeforeStartOfFinancialYear,
  getTableEntries,
  getTotalPayment,
} from '../ElectronicPaymentsCreateSelector';

describe('ElectronicPaymentsCreateSelector', () => {
  describe('getTotalPayment', () => {
    const state = {
      transactions: [
        {
          id: 1,
          date: '02/12/2018',
          referenceNumber: '23',
          name: 'Leonard Dunn',
          paymentType: 'Pay employees',
          amount: 408.05,
          isSelected: true,
        },
        {
          id: 2,
          date: '05/12/2018',
          referenceNumber: '24',
          name: 'Eliza Fuller',
          paymentType: 'Pay employees',
          amount: 828.55,
          isSelected: true,
        },
      ],
    };

    it('calculates and formats payments', () => {
      const actual = getTotalPayment(state);

      expect(actual).toEqual('$1,236.60');
    });

    it('calculates and formats selected payments', () => {
      const modifiedState = {
        ...state,
        transactions: [
          ...state.transactions,
          {
            id: 3,
            date: '05/12/2018',
            referenceNumber: '24',
            name: 'Eliza Fuller',
            paymentType: 'Pay employees',
            amount: 828.55,
            isSelected: false,
          },
        ],
      };

      const actual = getTotalPayment(modifiedState);

      expect(actual).toEqual('$1,236.60');
    });

    it('returns zero when no payments are selected', () => {
      const modifiedState = {
        ...state,
        transactions: [],
      };

      const actual = getTotalPayment(modifiedState);

      expect(actual).toEqual('$0.00');
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
      'when start of financial year date is %s and date of payment is %s, should return %s',
      (startOfFinancialYearDate, dateOfPayment, expected) => {
        const state = {
          dateOfPayment,
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getTableEntries', () => {
    it('true when negative value is seletecd', () => {
      const state = { transactions: [{ isSelected: true, amount: -200 }] };

      const actual = getTableEntries(state);

      expect(actual[0].isNegativeSelected).toEqual(true);
    });

    it('false when positive value is seletecd', () => {
      const state = { transactions: [{ isSelected: true, amount: 200 }] };

      const actual = getTableEntries(state);

      expect(actual[0].isNegativeSelected).toEqual(false);
    });

    it('false when row is not seletecd', () => {
      const state = { transactions: [{ isSelected: false, amount: -200 }] };

      const actual = getTableEntries(state);

      expect(actual[0].isNegativeSelected).toEqual(false);
    });
  });
});
