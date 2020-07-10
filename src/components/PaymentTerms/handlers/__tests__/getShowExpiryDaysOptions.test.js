import getShowExpiryDaysOptions from '../getShowExpiryDaysOptions';

describe('getShowExpiryDaysOptions', () => {
  it.each([
    ['OnADayOfTheMonth', true],
    ['InAGivenNumberOfDays', true],
    ['DayOfMonthAfterEOM', true],
    ['NumberOfDaysAfterEOM', true],
    ['CashOnDelivery', false],
    ['Prepaid', false],
  ])(
    'returns true when the expiry days input should be displayed',
    (expirationTerm, expected) => {
      const actual = getShowExpiryDaysOptions(expirationTerm);
      expect(actual).toBe(expected);
    }
  );
});
